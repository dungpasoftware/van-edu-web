import { NextRequest, NextResponse } from 'next/server';
import { Payment, ApiResponse, PaginationMeta } from '../../../types';

// Mock data
const mockPayments: Payment[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    planId: '1',
    planName: 'Premium Monthly',
    amount: 29.99,
    paymentDate: '2024-02-15T10:30:00Z',
    paymentMethod: 'bank_transfer',
    status: 'pending',
    transactionId: 'TXN-001-2024',
    notes: 'Bank transfer confirmation pending',
  },
  {
    id: '2',
    userId: '2',
    userName: 'Jane Smith',
    userEmail: 'jane@example.com',
    planId: '2',
    planName: 'Premium Annual',
    amount: 299.99,
    paymentDate: '2024-02-14T14:15:00Z',
    paymentMethod: 'bank_transfer',
    status: 'pending',
    transactionId: 'TXN-002-2024',
  },
  {
    id: '3',
    userId: '3',
    userName: 'Mike Johnson',
    userEmail: 'mike@example.com',
    planId: '1',
    planName: 'Premium Monthly',
    amount: 29.99,
    paymentDate: '2024-02-13T09:45:00Z',
    paymentMethod: 'bank_transfer',
    status: 'completed',
    transactionId: 'TXN-003-2024',
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const status = searchParams.get('status') || '';

  let filteredPayments = mockPayments;

  if (status) {
    filteredPayments = filteredPayments.filter(payment => payment.status === status);
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPayments = filteredPayments.slice(startIndex, endIndex);

  const meta: PaginationMeta = {
    page,
    limit,
    total: filteredPayments.length,
    totalPages: Math.ceil(filteredPayments.length / limit),
  };

  const response: ApiResponse<Payment[]> = {
    data: paginatedPayments,
    meta,
  };

  return NextResponse.json(response);
} 