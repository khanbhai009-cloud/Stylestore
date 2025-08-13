'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  Package,
  Users,
  Settings,
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Target,
  Home,
  LogOut,
  Mail,
} from 'lucide-react';
import Link from 'next/link';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

const menuItems = [
  {
    id: 'overview',
    label: 'Dashboard',
    icon: BarChart3,
    description: 'Analytics overview',
  },
  {
    id: 'products',
    label: 'Products',
    icon: Package,
    description: 'Manage inventory',
  },
  {
    id: 'newsletter',
    label: 'Newsletter',
    icon: Mail,
    description: 'Email subscribers',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: TrendingUp,
    description: 'Detailed reports',
  },
  {
    id: 'users',
    label: 'Users',
    icon: Users,
    description: 'Customer management',
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: ShoppingBag,
    description: 'Order tracking',
  },
  {
    id: 'marketing',
    label: 'Marketing',
    icon: Target,
    description: 'Campaigns & promotions',
  },
  {
    id: 'finance',
    label: 'Finance',
    icon: DollarSign,
    description: 'Revenue & payments',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    description: 'System configuration',
  },
];

export default function AdminSidebar({
  activeTab,
  onTabChange,
  onLogout,
}: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`bg-white shadow-lg border-r transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} min-h-screen`}
    >
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-8 w-8 text-red-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">StyleStore</h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="p-1"
          >
            <BarChart3 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-2">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? 'default' : 'ghost'}
              className={`w-full justify-start ${collapsed ? 'px-2' : 'px-3'} py-2 h-auto`}
              onClick={() => onTabChange(item.id)}
            >
              <item.icon className={`h-5 w-5 ${collapsed ? '' : 'mr-3'}`} />
              {!collapsed && (
                <div className="text-left">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-gray-500">
                    {item.description}
                  </div>
                </div>
              )}
            </Button>
          ))}
        </div>
      </nav>

      {/* Quick Actions */}
      {!collapsed && (
        <div className="p-4 border-t mt-auto">
          <div className="space-y-2">
            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start bg-transparent"
              >
                <Home className="h-4 w-4 mr-2" />
                View Store
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent"
              onClick={onLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
