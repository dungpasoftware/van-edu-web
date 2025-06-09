import { NextRequest, NextResponse } from 'next/server';
import { User, ApiResponse, PaginationMeta } from '../../../types';

// Mock data - in a real app, this would be a database
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'student',
    status: 'active',
    createdAt: '2024-01-15T08:30:00Z',
    avatar: '/avatars/01.png',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'instructor',
    status: 'active',
    createdAt: '2024-01-20T10:15:00Z',
    avatar: '/avatars/02.png',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'student',
    status: 'inactive',
    createdAt: '2024-02-01T14:45:00Z',
    avatar: '/avatars/03.png',
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: 'instructor',
    status: 'active',
    createdAt: '2024-02-05T09:20:00Z',
    avatar: '/avatars/04.png',
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david@example.com',
    role: 'student',
    status: 'active',
    createdAt: '2024-02-10T16:30:00Z',
    avatar: '/avatars/05.png',
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const search = searchParams.get('search') || '';
  const role = searchParams.get('role') || '';
  const status = searchParams.get('status') || '';

  // Filter users
  let filteredUsers = mockUsers;

  if (search) {
    filteredUsers = filteredUsers.filter(
      user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (role) {
    filteredUsers = filteredUsers.filter(user => user.role === role);
  }

  if (status) {
    filteredUsers = filteredUsers.filter(user => user.status === status);
  }

  // Paginate
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  const meta: PaginationMeta = {
    page,
    limit,
    total: filteredUsers.length,
    totalPages: Math.ceil(filteredUsers.length / limit),
  };

  const response: ApiResponse<User[]> = {
    data: paginatedUsers,
    meta,
  };

  return NextResponse.json(response);
}

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json();
    
    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      status: userData.status || 'active',
      createdAt: new Date().toISOString(),
      avatar: userData.avatar,
    };

    mockUsers.push(newUser);

    const response: ApiResponse<User> = {
      data: newUser,
      message: 'User created successfully',
    };

    return NextResponse.json(response, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: 'Failed to create user' },
      { status: 500 }
    );
  }
} 