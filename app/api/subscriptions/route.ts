import { NextRequest, NextResponse } from 'next/server';
import { SubscriptionPlan, ApiResponse } from '../../../types';

// Mock data
const mockPlans: SubscriptionPlan[] = [
  {
    id: '1',
    name: 'Premium Monthly',
    price: 29.99,
    duration: 1,
    features: ['Access to all courses', 'Download materials', 'Community access', 'Email support'],
    description: 'Perfect for getting started with premium features',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Premium Annual',
    price: 299.99,
    duration: 12,
    features: ['All Premium Monthly features', 'Priority support', 'Exclusive webinars', '2 months free'],
    description: 'Best value for committed learners',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Basic',
    price: 9.99,
    duration: 1,
    features: ['Access to basic courses', 'Community access'],
    description: 'Great for exploring our platform',
    createdAt: '2024-01-01T00:00:00Z',
  },
];

export async function GET() {
  const response: ApiResponse<SubscriptionPlan[]> = {
    data: mockPlans,
  };

  return NextResponse.json(response);
}

export async function POST(request: NextRequest) {
  try {
    const planData = await request.json();
    
    const newPlan: SubscriptionPlan = {
      id: (mockPlans.length + 1).toString(),
      name: planData.name,
      price: planData.price,
      duration: planData.duration,
      features: planData.features || [],
      description: planData.description,
      createdAt: new Date().toISOString(),
    };

    mockPlans.push(newPlan);

    const response: ApiResponse<SubscriptionPlan> = {
      data: newPlan,
      message: 'Subscription plan created successfully',
    };

    return NextResponse.json(response, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: 'Failed to create subscription plan' },
      { status: 500 }
    );
  }
} 