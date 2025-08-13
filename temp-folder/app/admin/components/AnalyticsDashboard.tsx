'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Eye, DollarSign } from 'lucide-react';

interface Analytics {
  totalUsers: number;
  totalClicks: number;
  totalProducts: number;
  topProducts: any[];
  productAnalytics: any[];
}

interface AnalyticsDashboardProps {
  analytics: Analytics;
  demoMode: boolean;
}

export default function AnalyticsDashboard({
  analytics,
  demoMode,
}: AnalyticsDashboardProps) {
  const categoryStats = analytics.productAnalytics.reduce(
    (acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = { clicks: 0, products: 0, revenue: 0 };
      }
      acc[product.category].clicks += product.total_clicks;
      acc[product.category].products += 1;
      acc[product.category].revenue +=
        product.price * product.total_clicks * 0.1; // Assuming 10% conversion
      return acc;
    },
    {} as Record<string, { clicks: number; products: number; revenue: number }>
  );

  return (
    <div className="space-y-6">
      {/* Category Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Category Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(categoryStats).map(([category, stats]) => (
              <div key={category} className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 capitalize mb-2">
                  {category.replace('-', ' & ')}
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Products:</span>
                    <span className="font-medium">{stats.products}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Clicks:</span>
                    <span className="font-medium">{stats.clicks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Est. Revenue:</span>
                    <span className="font-medium text-green-600">
                      ${stats.revenue.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Product Analytics Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Product Click Analytics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium text-gray-900">
                    Product
                  </th>
                  <th className="text-left p-3 font-medium text-gray-900">
                    Category
                  </th>
                  <th className="text-left p-3 font-medium text-gray-900">
                    Price
                  </th>
                  <th className="text-left p-3 font-medium text-gray-900">
                    Clicks
                  </th>
                  <th className="text-left p-3 font-medium text-gray-900">
                    Performance
                  </th>
                </tr>
              </thead>
              <tbody>
                {analytics.productAnalytics
                  .sort((a, b) => b.total_clicks - a.total_clicks)
                  .map((product, index) => (
                    <tr
                      key={product.product_id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="text-xs">
                            #{index + 1}
                          </Badge>
                          <span className="font-medium">
                            {product.product_name}
                          </span>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="capitalize text-gray-600">
                          {product.category.replace('-', ' & ')}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="font-medium">${product.price}</span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <Eye className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">
                            {product.total_clicks}
                          </span>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge
                          variant={
                            product.total_clicks > 100
                              ? 'default'
                              : product.total_clicks > 50
                                ? 'secondary'
                                : 'outline'
                          }
                          className={
                            product.total_clicks > 100
                              ? 'bg-green-100 text-green-800'
                              : product.total_clicks > 50
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                          }
                        >
                          {product.total_clicks > 100
                            ? 'High'
                            : product.total_clicks > 50
                              ? 'Medium'
                              : 'Low'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Est. Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  $
                  {Object.values(categoryStats)
                    .reduce((sum, cat) => sum + cat.revenue, 0)
                    .toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Best Category</p>
                <p className="text-2xl font-bold text-gray-900 capitalize">
                  {Object.entries(categoryStats)
                    .sort(([, a], [, b]) => b.clicks - a.clicks)[0]?.[0]
                    ?.replace('-', ' & ') || 'N/A'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg. Clicks/Product</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics.productAnalytics.length > 0
                    ? Math.round(
                        analytics.productAnalytics.reduce(
                          (sum, p) => sum + p.total_clicks,
                          0
                        ) / analytics.productAnalytics.length
                      )
                    : 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
