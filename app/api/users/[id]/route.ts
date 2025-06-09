import { NextRequest, NextResponse } from 'next/server';
import { User, ApiResponse } from '../../../../types';

// This would be imported from a shared file in a real app
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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = mockUsers.find(u => u.id === params.id);

  if (!user) {
    return NextResponse.json(
      { message: 'User not found' },
      { status: 404 }
    );
  }

  const response: ApiResponse<User> = {
    data: user,
  };

  return NextResponse.json(response);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userData = await request.json();
    const userIndex = mockUsers.findIndex(u => u.id === params.id);

    if (userIndex === -1) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    const updatedUser: User = {
      ...mockUsers[userIndex],
      ...userData,
      id: params.id, // Ensure ID doesn't change
    };

    mockUsers[userIndex] = updatedUser;

    const response: ApiResponse<User> = {
      data: updatedUser,
      message: 'User updated successfully',
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { message: 'Failed to update user' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userIndex = mockUsers.findIndex(u => u.id === params.id);

  if (userIndex === -1) {
    return NextResponse.json(
      { message: 'User not found' },
      { status: 404 }
    );
  }

  const deletedUser = mockUsers[userIndex];
  mockUsers.splice(userIndex, 1);

  const response: ApiResponse<User> = {
    data: deletedUser,
    message: 'User deleted successfully',
  };

  return NextResponse.json(response);
} 