import { NextRequest, NextResponse } from 'next/server';
import { Category, ApiResponse, PaginationMeta } from '../../../types';

// Mock data
const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Web Development',
    description: 'Learn modern web development technologies',
    courseCount: 15,
    createdAt: '2024-01-10T08:00:00Z',
  },
  {
    id: '2',
    name: 'Data Science',
    description: 'Master data analysis and machine learning',
    courseCount: 8,
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '3',
    name: 'Mobile Development',
    description: 'Build native and cross-platform mobile apps',
    courseCount: 12,
    createdAt: '2024-01-20T14:15:00Z',
  },
  {
    id: '4',
    name: 'Design',
    description: 'UI/UX design and graphic design fundamentals',
    courseCount: 6,
    createdAt: '2024-01-25T09:45:00Z',
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const search = searchParams.get('search') || '';

  let filteredCategories = mockCategories;

  if (search) {
    filteredCategories = filteredCategories.filter(
      category =>
        category.name.toLowerCase().includes(search.toLowerCase()) ||
        category.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedCategories = filteredCategories.slice(startIndex, endIndex);

  const meta: PaginationMeta = {
    page,
    limit,
    total: filteredCategories.length,
    totalPages: Math.ceil(filteredCategories.length / limit),
  };

  const response: ApiResponse<Category[]> = {
    data: paginatedCategories,
    meta,
  };

  return NextResponse.json(response);
}

export async function POST(request: NextRequest) {
  try {
    const categoryData = await request.json();
    
    const newCategory: Category = {
      id: (mockCategories.length + 1).toString(),
      name: categoryData.name,
      description: categoryData.description,
      courseCount: 0,
      createdAt: new Date().toISOString(),
    };

    mockCategories.push(newCategory);

    const response: ApiResponse<Category> = {
      data: newCategory,
      message: 'Category created successfully',
    };

    return NextResponse.json(response, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: 'Failed to create category' },
      { status: 500 }
    );
  }
} 