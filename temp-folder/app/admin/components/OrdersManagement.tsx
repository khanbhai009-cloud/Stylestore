'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  ShoppingBag,
  Search,
  Eye,
  Package,
  Truck,
  CheckCircle,
  Clock,
  DollarSign,
} from 'lucide-react';

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  products: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  shippingAddress: string;
}

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'John Doe',
    customerEmail: 'john.doe@email.com',
    products: [
      { name: 'Premium Smart Watch', quantity: 1, price: 299.99 },
      { name: 'Yoga Mat Premium', quantity: 2, price: 39.99 },
    ],
    total: 379.97,
    status: 'delivered',
    orderDate: '2024-01-10',
    shippingAddress: '123 Main St, New York, NY 10001',
  },
  {
    id: 'ORD-002',
    customerName: 'Sarah Smith',
    customerEmail: 'sarah.smith@email.com',
    products: [
      { name: 'Classic Denim Jeans', quantity: 1, price: 79.99 },
      { name: 'Luxury Face Cream', quantity: 1, price: 149.99 },
    ],
    total: 229.98,
    status: 'shipped',
    orderDate: '2024-01-12',
    shippingAddress: '456 Oak Ave, Los Angeles, CA 90210',
  },
  {
    id: 'ORD-003',
    customerName: 'Mike Johnson',
    customerEmail: 'mike.johnson@email.com',
    products: [{ name: 'Protein Powder', quantity: 1, price: 59.99 }],
    total: 59.99,
    status: 'processing',
    orderDate: '2024-01-14',
    shippingAddress: '789 Pine St, Chicago, IL 60601',
  },
];

interface OrdersManagementProps {
  demoMode: boolean;
}

export default function OrdersManagement({ demoMode }: OrdersManagementProps) {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | Order['status']>(
    'all'
  );

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'processing':
        return <Package className="h-4 w-4" />;
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue =
    orders.length > 0 ? totalRevenue / orders.length : 0;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ShoppingBag className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">
                  {orders.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totalRevenue.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Order Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${averageOrderValue.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Truck className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    orders.filter(
                      (o) => o.status === 'pending' || o.status === 'processing'
                    ).length
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Management */}
      <Card>
        <CardHeader>
          <CardTitle>Orders Management</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value as 'all' | Order['status'])
              }
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium text-gray-900">
                    Order ID
                  </th>
                  <th className="text-left p-3 font-medium text-gray-900">
                    Customer
                  </th>
                  <th className="text-left p-3 font-medium text-gray-900">
                    Products
                  </th>
                  <th className="text-left p-3 font-medium text-gray-900">
                    Total
                  </th>
                  <th className="text-left p-3 font-medium text-gray-900">
                    Status
                  </th>
                  <th className="text-left p-3 font-medium text-gray-900">
                    Date
                  </th>
                  <th className="text-left p-3 font-medium text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <span className="font-semibold text-blue-600">
                        {order.id}
                      </span>
                    </td>
                    <td className="p-3">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {order.customerName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {order.customerEmail}
                        </p>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        {order.products.map((product, index) => (
                          <div key={index} className="text-sm">
                            <span className="font-medium">{product.name}</span>
                            <span className="text-gray-500">
                              {' '}
                              x{product.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="font-bold text-green-600">
                        ${order.total.toFixed(2)}
                      </span>
                    </td>
                    <td className="p-3">
                      <Badge
                        className={`${getStatusColor(order.status)} flex items-center space-x-1 w-fit`}
                      >
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </Badge>
                    </td>
                    <td className="p-3">
                      <span className="text-sm text-gray-600">
                        {order.orderDate}
                      </span>
                    </td>
                    <td className="p-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          alert(
                            'Order details view is not available. Configure Supabase to enable this feature.'
                          );
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
