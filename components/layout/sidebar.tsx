"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useI18n } from '../providers/i18n-provider';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FolderOpen,
  Images,
  CreditCard,
  Settings,
} from 'lucide-react';

const sidebarItems = [
  {
    href: '/dashboard',
    icon: LayoutDashboard,
    labelKey: 'navigation.dashboard',
  },
  {
    href: '/users',
    icon: Users,
    labelKey: 'navigation.users',
  },
  {
    href: '/categories',
    icon: FolderOpen,
    labelKey: 'navigation.categories',
  },
  {
    href: '/courses',
    icon: BookOpen,
    labelKey: 'navigation.courses',
  },
  {
    href: '/media',
    icon: Images,
    labelKey: 'navigation.media',
  },
  {
    href: '/payments',
    icon: CreditCard,
    labelKey: 'navigation.payments',
  },
  {
    href: '/settings',
    icon: Settings,
    labelKey: 'navigation.settings',
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-30 w-64 transform bg-white dark:bg-gray-900 transition-transform duration-200 ease-in-out lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-center border-b border-gray-200 dark:border-gray-700">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">VE</span>
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                VanEdu Admin
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                  )}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      onClose();
                    }
                  }}
                >
                  <Icon className="h-5 w-5" />
                  <span>{t(item.labelKey)}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
} 