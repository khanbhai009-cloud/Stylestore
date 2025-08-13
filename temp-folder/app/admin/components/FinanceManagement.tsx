'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  PieChart,
  Calendar,
  Target,
  Activity,
} from 'lucide-react';

interface FinanceData {
  totalRevenue: number;
  monthlyRevenue: number;
  revenueGrowth: number;
  totalOrders: number;
  averageOrderValue: number;
  topProducts: Array<{
    name: string;
    revenue: number;
    orders: number;
  }>;
  monthlyData: Array<{
    month: string;
    revenue: number;
    orders: number;
  }>;
}

const mockFinanceData: FinanceData = {
  totalRevenue: 15847.92,
  monthlyRevenue: 3247.85,
  revenueGrowth: 12.5,
  totalOrders: 156,
  averageOrderValue: 101.59,
  topProducts: [
    { name: 'Premium Smart Watch', revenue: 4679.84, orders: 16 },
    { name: 'Yoga Mat Premium', revenue: 2399.2, orders: 60 },
    { name: 'Luxury Face Cream', revenue: 2249.85, orders: 15 },
    { name: 'Protein Powder', revenue: 1799.75, orders: 30 },
    { name: 'Classic Denim Jeans', revenue: 1599.2, orders: 20 },
  ],
  monthlyData: [
    { month: 'Aug', revenue: 2847.5, orders: 28 },
    { month: 'Sep', revenue: 3156.75, orders: 31 },
    { month: 'Oct', revenue: 2934.25, orders: 29 },
    { month: 'Nov', revenue: 3662.57, orders: 36 },
    { month: 'Dec', revenue: 3246.85, orders: 32 },
  ],
};

type FinanceManagementProps = {};

export default function FinanceManagement({}: FinanceManagementProps) {
  const [financeData] = useState<FinanceData>(mockFinanceData);
  const [selectedPeriod, setSelectedPeriod] = useState<
    'week' | 'month' | 'year'
  >('month');

  return (
    <div className="space-y-6">
      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${financeData.totalRevenue.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${financeData.monthlyRevenue.toFixed(2)}
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">
                    +{financeData.revenueGrowth}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Order Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${financeData.averageOrderValue.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Target className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">
                  {financeData.totalOrders}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Revenue Trends</span>
            </CardTitle>
            <div className="flex space-x-2">
              {['week', 'month', 'year'].map((period) => (
                <button
                  key={period}
                  onClick={() =>
                    setSelectedPeriod(period as 'week' | 'month' | 'year')
                  }
                  className={`px-3 py-1 text-sm rounded-md capitalize ${
                    selectedPeriod === period
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between space-x-2">
            {financeData.monthlyData.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className="bg-red-600 rounded-t-md w-full transition-all duration-300 hover:bg-red-700"
                  style={{
                    height: `${(data.revenue / Math.max(...financeData.monthlyData.map((d) => d.revenue))) * 200}px`,
                    minHeight: '20px',
                  }}
                ></div>
                <div className="mt-2 text-center">
                  <p className="text-xs font-medium text-gray-900">
                    {data.month}
                  </p>
                  <p className="text-xs text-gray-600">
                    ${data.revenue.toFixed(0)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Products by Revenue */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PieChart className="h-5 w-5" />
            <span>Top Products by Revenue</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {financeData.topProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary" className="text-xs">
                    #{index + 1}
                  </Badge>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {product.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {product.orders} orders
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-green-600">
                    ${product.revenue.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">
                    ${(product.revenue / product.orders).toFixed(2)} avg
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Product Sales</span>
                <span className="font-semibold">
                  ${(financeData.totalRevenue * 0.85).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Shipping Fees</span>
                <span className="font-semibold">
                  ${(financeData.totalRevenue * 0.1).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tax Collected</span>
                <span className="font-semibold">
                  ${(financeData.totalRevenue * 0.05).toFixed(2)}
                </span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between items-center font-bold">
                  <span>Total Revenue</span>
                  <span className="text-green-600">
                    ${financeData.totalRevenue.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Conversion Rate</span>
                <Badge className="bg-green-100 text-green-800">3.2%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Customer Lifetime Value</span>
                <span className="font-semibold">$245.80</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Return Rate</span>
                <Badge className="bg-yellow-100 text-yellow-800">2.1%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Profit Margin</span>
                <Badge className="bg-blue-100 text-blue-800">28.5%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
