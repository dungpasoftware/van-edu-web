"use client"

import React, { useEffect, useState } from 'react';
import { RouteGuard } from '../../../components/auth/route-guard';
import { DashboardLayout } from '../../../components/layout/dashboard-layout';
import { useI18n } from '../../../components/providers/i18n-provider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { DashboardStats } from '../../../types';
import { Users, BookOpen, DollarSign, Clock } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const mockStats: DashboardStats = {
  totalUsers: 1250,
  totalCourses: 45,
  totalRevenue: 125000,
  pendingPayments: 12,
  monthlyUserGrowth: [
    { month: 'Jan', users: 100 },
    { month: 'Feb', users: 150 },
    { month: 'Mar', users: 200 },
    { month: 'Apr', users: 180 },
    { month: 'May', users: 250 },
    { month: 'Jun', users: 300 },
  ],
};

export default function DashboardPage() {
  const { t } = useI18n();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock API call
    const fetchStats = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStats(mockStats);
      setIsLoading(false);
    };

    fetchStats();
  }, []);

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    loading 
  }: { 
    title: string; 
    value: string | number; 
    icon: React.ElementType; 
    loading: boolean; 
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-24" />
        ) : (
          <div className="text-2xl font-bold">{value.toLocaleString()}</div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <RouteGuard>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('dashboard.title')}</h1>
            <p className="text-muted-foreground">
              Overview of your education platform
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title={t('dashboard.totalUsers')}
              value={stats?.totalUsers || 0}
              icon={Users}
              loading={isLoading}
            />
            <StatCard
              title={t('dashboard.totalCourses')}
              value={stats?.totalCourses || 0}
              icon={BookOpen}
              loading={isLoading}
            />
            <StatCard
              title={t('dashboard.totalRevenue')}
              value={`$${stats?.totalRevenue || 0}`}
              icon={DollarSign}
              loading={isLoading}
            />
            <StatCard
              title={t('dashboard.pendingPayments')}
              value={stats?.pendingPayments || 0}
              icon={Clock}
              loading={isLoading}
            />
          </div>

          {/* Chart */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>{t('dashboard.newUsersChart')}</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                {isLoading ? (
                  <div className="h-80 flex items-center justify-center">
                    <Skeleton className="h-full w-full" />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={stats?.monthlyUserGrowth}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="month"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                      />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="users"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ fill: "#3b82f6" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[200px]" />
                          <Skeleton className="h-4 w-[160px]" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">New user registered</p>
                        <p className="text-sm text-muted-foreground">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="h-2 w-2 bg-green-600 rounded-full"></div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Payment completed</p>
                        <p className="text-sm text-muted-foreground">5 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="h-2 w-2 bg-orange-600 rounded-full"></div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">New course published</p>
                        <p className="text-sm text-muted-foreground">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </RouteGuard>
  );
} 