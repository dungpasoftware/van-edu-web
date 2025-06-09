"use client"

import React, { useEffect, useState } from 'react';
import { RouteGuard } from '../../../components/auth/route-guard';
import { DashboardLayout } from '../../../components/layout/dashboard-layout';
import { useI18n } from '../../../components/providers/i18n-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Payment, SubscriptionPlan, ApiResponse } from '../../../types';
import { 
  DollarSign, 
  Check, 
  X, 
  Eye, 
  Plus,
  Clock
} from 'lucide-react';

export default function PaymentsPage() {
  const { t } = useI18n();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [paymentsLoading, setPaymentsLoading] = useState(true);
  const [plansLoading, setPlansLoading] = useState(true);

  const fetchPayments = async () => {
    setPaymentsLoading(true);
    try {
      const response = await fetch('/api/payments?status=pending');
      const data: ApiResponse<Payment[]> = await response.json();
      setPayments(data.data);
    } catch {
      toast.error(t('common.error'));
    } finally {
      setPaymentsLoading(false);
    }
  };

  const fetchPlans = async () => {
    setPlansLoading(true);
    try {
      const response = await fetch('/api/subscriptions');
      const data: ApiResponse<SubscriptionPlan[]> = await response.json();
      setPlans(data.data);
    } catch {
      toast.error(t('common.error'));
    } finally {
      setPlansLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
    fetchPlans();
  }, []);

  const handlePaymentAction = async (paymentId: string, action: 'accept' | 'reject') => {
    try {
      const response = await fetch(`/api/payments/${paymentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status: action === 'accept' ? 'completed' : 'rejected' 
        }),
      });

      if (response.ok) {
        toast.success(t(action === 'accept' ? 'payments.paymentAccepted' : 'payments.paymentRejected'));
        fetchPayments();
      } else {
        toast.error(t('common.error'));
      }
    } catch {
      toast.error(t('common.error'));
    }
  };

  return (
    <RouteGuard>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('payments.title')}</h1>
            <p className="text-muted-foreground">
              Manage subscription plans and pending payments
            </p>
          </div>

          <Tabs defaultValue="plans" className="space-y-6">
            <TabsList>
              <TabsTrigger value="plans">{t('payments.subscriptionPlans')}</TabsTrigger>
              <TabsTrigger value="pending">{t('payments.pendingPayments')}</TabsTrigger>
            </TabsList>

            {/* Subscription Plans Tab */}
            <TabsContent value="plans" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{t('payments.subscriptionPlans')}</h2>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  {t('payments.addPlan')}
                </Button>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {plansLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i}>
                      <CardHeader>
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-8 w-20" />
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-3/4" />
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  plans.map((plan) => (
                    <Card key={plan.id} className="relative">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {plan.name}
                          {plan.duration === 12 && (
                            <Badge variant="secondary">Popular</Badge>
                          )}
                        </CardTitle>
                        <div className="text-3xl font-bold">
                          ${plan.price}
                          <span className="text-sm font-normal text-muted-foreground">
                            /{plan.duration === 1 ? 'month' : 'year'}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          {plan.description}
                        </p>
                        <ul className="space-y-2 text-sm">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6 flex space-x-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            {t('common.edit')}
                          </Button>
                          <Button variant="destructive" size="sm">
                            {t('common.delete')}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Pending Payments Tab */}
            <TabsContent value="pending" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{t('payments.pendingPayments')}</h2>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{payments.length} pending payments</span>
                </div>
              </div>

              <Card>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t('payments.userName')}</TableHead>
                        <TableHead>{t('payments.planName')}</TableHead>
                        <TableHead>{t('payments.amount')}</TableHead>
                        <TableHead>{t('payments.paymentDate')}</TableHead>
                        <TableHead>{t('payments.paymentMethod')}</TableHead>
                        <TableHead className="text-right">{t('users.actions')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentsLoading ? (
                        Array.from({ length: 3 }).map((_, i) => (
                          <TableRow key={i}>
                            <TableCell><Skeleton className="h-4 w-[120px]" /></TableCell>
                            <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                            <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                            <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                            <TableCell><Skeleton className="h-4 w-[120px]" /></TableCell>
                            <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                          </TableRow>
                        ))
                      ) : payments.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8">
                            No pending payments
                          </TableCell>
                        </TableRow>
                      ) : (
                        payments.map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">{payment.userName}</div>
                                <div className="text-sm text-muted-foreground">
                                  {payment.userEmail}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{payment.planName}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <DollarSign className="mr-1 h-4 w-4" />
                                {payment.amount}
                              </div>
                            </TableCell>
                            <TableCell>
                              {new Date(payment.paymentDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {payment.paymentMethod.replace('_', ' ')}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handlePaymentAction(payment.id, 'accept')}
                                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handlePaymentAction(payment.id, 'reject')}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </RouteGuard>
  );
} 