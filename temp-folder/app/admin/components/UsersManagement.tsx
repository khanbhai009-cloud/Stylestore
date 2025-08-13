'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Search,
  Plus,
  Edit,
  Trash2,
  Mail,
  Calendar,
  Shield,
} from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive';
  lastLogin: string;
  totalOrders: number;
  totalSpent: number;
  joinedDate: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@email.com',
    name: 'John Doe',
    role: 'user',
    status: 'active',
    lastLogin: '2024-01-15',
    totalOrders: 12,
    totalSpent: 1299.99,
    joinedDate: '2023-06-15',
  },
  {
    id: '2',
    email: 'sarah.smith@email.com',
    name: 'Sarah Smith',
    role: 'user',
    status: 'active',
    lastLogin: '2024-01-14',
    totalOrders: 8,
    totalSpent: 899.5,
    joinedDate: '2023-08-22',
  },
  {
    id: '3',
    email: 'admin@gmail.com',
    name: 'Admin User',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-16',
    totalOrders: 0,
    totalSpent: 0,
    joinedDate: '2023-01-01',
  },
];

type UsersManagementProps = {};

export default function UsersManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'user' | 'admin'>('all');

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleAddUser = () => {
    // Add user logic
  };

  const handleEditUser = (userId: string) => {
    // Edit user logic
  };

  const handleDeleteUser = (userId: string) => {
    // Delete user logic
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter((u) => u.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Admin Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter((u) => u.role === 'admin').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">New This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    users.filter(
                      (u) =>
                        new Date(u.joinedDate) >
                        new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                    ).length
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Management */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Users Management</CardTitle>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={handleAddUser}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterRole}
              onChange={(e) =>
                setFilterRole(e.target.value as 'all' | 'user' | 'admin')
              }
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">All Roles</option>
              <option value="user">Users</option>
              <option value="admin">Admins</option>
            </select>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium text-gray-900">
                    User
                  </th>
                  <th className="text-left p-3 font-medium text-gray-900">
                    Role
                  </th>
                  <th className="text-left p-3 font-medium text-gray-900">
                    Status
                  </th>
                  <th className="text-left p-3 font-medium text-gray-900">
                    Orders
                  </th>
                  <th className="text-left p-3 font-medium text-gray-900">
                    Total Spent
                  </th>
                  <th className="text-left p-3 font-medium text-gray-900">
                    Last Login
                  </th>
                  <th className="text-left p-3 font-medium text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500">
                          Joined: {user.joinedDate}
                        </p>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge
                        variant={
                          user.role === 'admin' ? 'default' : 'secondary'
                        }
                        className={
                          user.role === 'admin' ? 'bg-red-100 text-red-800' : ''
                        }
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge
                        variant={
                          user.status === 'active' ? 'default' : 'secondary'
                        }
                        className={
                          user.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <span className="font-medium">{user.totalOrders}</span>
                    </td>
                    <td className="p-3">
                      <span className="font-medium text-green-600">
                        ${user.totalSpent.toFixed(2)}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="text-sm text-gray-600">
                        {user.lastLogin}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditUser(user.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700 bg-transparent"
                          onClick={() => handleDeleteUser(user.id)}
                          disabled={user.role === 'admin'}
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
        </CardContent>
      </Card>
    </div>
  );
}
