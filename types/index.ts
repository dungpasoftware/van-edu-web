export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'instructor' | 'student';
  status: 'active' | 'inactive';
  createdAt: string;
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  courseCount: number;
  createdAt: string;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  category: string;
  instructor: string;
  price: number;
  students: number;
  status: 'published' | 'draft';
  thumbnail?: string;
  video?: string;
  createdAt: string;
}

export interface Media {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video';
  size: number;
  createdAt: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: number; // in months
  features: string[];
  description: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  planId: string;
  planName: string;
  amount: number;
  paymentDate: string;
  paymentMethod: 'bank_transfer' | 'credit_card' | 'paypal';
  status: 'pending' | 'completed' | 'rejected';
  transactionId?: string;
  notes?: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalCourses: number;
  totalRevenue: number;
  pendingPayments: number;
  monthlyUserGrowth: Array<{
    month: string;
    users: number;
  }>;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  meta?: PaginationMeta;
  message?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'admin';
  avatar?: string;
}

export interface Theme {
  mode: 'light' | 'dark';
}

export interface Language {
  code: 'en' | 'vi';
  name: string;
}

export interface Settings {
  theme: Theme;
  language: Language;
} 