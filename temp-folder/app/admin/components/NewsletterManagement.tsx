'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Mail,
  Search,
  Download,
  Trash2,
  UserX,
  Users,
  TrendingUp,
  Calendar,
  Filter,
  Copy,
} from 'lucide-react';
import {
  newsletterService,
  type NewsletterSubscriber,
} from '@/lib/newsletterService';

export default function NewsletterManagement() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState<
    NewsletterSubscriber[]
  >([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<
    'all' | 'active' | 'unsubscribed'
  >('all');
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    unsubscribed: 0,
    todaySubscribers: 0,
    conversionRate: '0',
  });

  useEffect(() => {
    loadSubscribers();

    // Subscribe to real-time updates
    const unsubscribe = newsletterService.subscribe((updatedSubscribers) => {
      setSubscribers(updatedSubscribers);
      setStats(newsletterService.getStats());
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let filtered = subscribers;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((subscriber) =>
        subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(
        (subscriber) => subscriber.status === filterStatus
      );
    }

    setFilteredSubscribers(filtered);
  }, [subscribers, searchTerm, filterStatus]);

  const loadSubscribers = () => {
    const allSubscribers = newsletterService.getSubscribers();
    setSubscribers(allSubscribers);
    setStats(newsletterService.getStats());
  };

  const handleUnsubscribe = (id: string) => {
    if (confirm('Are you sure you want to unsubscribe this user?')) {
      newsletterService.unsubscribeUser(id);
    }
  };

  const handleDelete = (id: string) => {
    if (
      confirm('Are you sure you want to permanently delete this subscriber?')
    ) {
      newsletterService.deleteSubscriber(id);
    }
  };

  const handleExportCSV = () => {
    const csvContent = newsletterService.exportToCSV();
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const copyEmailList = () => {
    const activeEmails = subscribers
      .filter((s) => s.status === 'active')
      .map((s) => s.email)
      .join(', ');

    navigator.clipboard.writeText(activeEmails).then(() => {
      alert('Email list copied to clipboard!');
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-orange-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Subscribers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Subscribers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.active}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Today's Signups</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.todaySubscribers}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Retention Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.conversionRate}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Newsletter Management */}
      <Card className="border-orange-200">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>Newsletter Subscribers</span>
            </CardTitle>
            <div className="flex space-x-2">
              <Button
                onClick={copyEmailList}
                variant="outline"
                size="sm"
                className="bg-transparent"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Emails
              </Button>
              <Button
                onClick={handleExportCSV}
                variant="outline"
                size="sm"
                className="bg-transparent"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-orange-200 focus:border-orange-400 focus:ring-orange-400"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(
                    e.target.value as 'all' | 'active' | 'unsubscribed'
                  )
                }
                className="px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="unsubscribed">Unsubscribed</option>
              </select>
            </div>
          </div>

          {/* Subscribers Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-orange-200">
                  <th className="text-left p-3 font-medium text-gray-900">
                    Email Address
                  </th>
                  <th className="text-left p-3 font-medium text-gray-900">
                    Status
                  </th>
                  <th className="text-left p-3 font-medium text-gray-900">
                    Subscribed Date
                  </th>
                  <th className="text-left p-3 font-medium text-gray-900">
                    Source
                  </th>
                  <th className="text-left p-3 font-medium text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscribers.map((subscriber) => (
                  <tr
                    key={subscriber.id}
                    className="border-b border-gray-100 hover:bg-orange-50/50 transition-colors"
                  >
                    <td className="p-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
                          <Mail className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {subscriber.email}
                          </p>
                          <p className="text-xs text-gray-500">
                            ID: {subscriber.id.slice(-8)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge
                        variant={
                          subscriber.status === 'active'
                            ? 'default'
                            : 'secondary'
                        }
                        className={
                          subscriber.status === 'active'
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }
                      >
                        {subscriber.status === 'active'
                          ? 'Active'
                          : 'Unsubscribed'}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {formatDate(subscriber.subscribed_at)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {Math.floor(
                            (Date.now() -
                              new Date(subscriber.subscribed_at).getTime()) /
                              (1000 * 60 * 60 * 24)
                          )}{' '}
                          days ago
                        </p>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline" className="capitalize">
                        {subscriber.source}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        {subscriber.status === 'active' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUnsubscribe(subscriber.id)}
                            className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 bg-transparent"
                          >
                            <UserX className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(subscriber.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredSubscribers.length === 0 && (
            <div className="text-center py-12">
              <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No subscribers found
              </h3>
              <p className="text-gray-600">
                {searchTerm || filterStatus !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Newsletter subscribers will appear here once users start signing up.'}
              </p>
            </div>
          )}

          {/* Results Summary */}
          {filteredSubscribers.length > 0 && (
            <div className="mt-4 pt-4 border-t border-orange-200">
              <p className="text-sm text-gray-600">
                Showing {filteredSubscribers.length} of {subscribers.length}{' '}
                subscribers
                {searchTerm && ` matching "${searchTerm}"`}
                {filterStatus !== 'all' && ` with status "${filterStatus}"`}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">
                Email Campaign
              </h4>
              <p className="text-sm text-blue-700 mb-3">
                Send newsletter to all active subscribers
              </p>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Mail className="h-4 w-4 mr-2" />
                Create Campaign
              </Button>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">Bulk Import</h4>
              <p className="text-sm text-green-700 mb-3">
                Import subscribers from CSV file
              </p>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Download className="h-4 w-4 mr-2" />
                Import CSV
              </Button>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">Analytics</h4>
              <p className="text-sm text-purple-700 mb-3">
                View detailed subscriber analytics
              </p>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
