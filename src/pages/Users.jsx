import React, { useState } from 'react';
import { Search, Filter, Plus, MoreHorizontal, Mail, Phone, Edit, Trash2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Users = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      role: 'Administrator',
      status: 'active',
      lastLogin: '2 hours ago',
      avatar: 'JD'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 (555) 987-6543',
      role: 'Manager',
      status: 'active',
      lastLogin: '1 day ago',
      avatar: 'JS'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      phone: '+1 (555) 456-7890',
      role: 'User',
      status: 'inactive',
      lastLogin: '1 week ago',
      avatar: 'MJ'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      phone: '+1 (555) 321-0987',
      role: 'Manager',
      status: 'active',
      lastLogin: '5 minutes ago',
      avatar: 'SW'
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.brown@example.com',
      phone: '+1 (555) 654-3210',
      role: 'User',
      status: 'pending',
      lastLogin: 'Never',
      avatar: 'DB'
    },
  ];

  const getRoleColor = (role) => {
    switch (role) {
      case 'Administrator':
        return theme.error;
      case 'Manager':
        return theme.warning;
      case 'User':
        return theme.primary;
      default:
        return theme.textSecondary;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return theme.success;
      case 'inactive':
        return theme.textSecondary;
      case 'pending':
        return theme.warning;
      default:
        return theme.textSecondary;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: theme.text }}>
            Users
          </h1>
          <p className="mt-2" style={{ color: theme.textSecondary }}>
            Manage your team members and their permissions
          </p>
        </div>
        <button
          className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white font-medium transition-colors hover:opacity-90"
          style={{ backgroundColor: theme.primary }}
        >
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div 
          className="p-6 rounded-xl"
          style={{ 
            backgroundColor: theme.surface,
            boxShadow: `0 1px 3px ${theme.shadow}`
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold" style={{ color: theme.text }}>
                {users.length}
              </p>
              <p className="text-sm" style={{ color: theme.textSecondary }}>
                Total Users
              </p>
            </div>
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: theme.primary + '20' }}
            >
              <Mail className="w-6 h-6" style={{ color: theme.primary }} />
            </div>
          </div>
        </div>

        <div 
          className="p-6 rounded-xl"
          style={{ 
            backgroundColor: theme.surface,
            boxShadow: `0 1px 3px ${theme.shadow}`
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold" style={{ color: theme.text }}>
                {users.filter(u => u.status === 'active').length}
              </p>
              <p className="text-sm" style={{ color: theme.textSecondary }}>
                Active Users
              </p>
            </div>
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: theme.success + '20' }}
            >
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.success }} />
            </div>
          </div>
        </div>

        <div 
          className="p-6 rounded-xl"
          style={{ 
            backgroundColor: theme.surface,
            boxShadow: `0 1px 3px ${theme.shadow}`
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold" style={{ color: theme.text }}>
                {users.filter(u => u.role === 'Administrator').length}
              </p>
              <p className="text-sm" style={{ color: theme.textSecondary }}>
                Administrators
              </p>
            </div>
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: theme.error + '20' }}
            >
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.error }} />
            </div>
          </div>
        </div>

        <div 
          className="p-6 rounded-xl"
          style={{ 
            backgroundColor: theme.surface,
            boxShadow: `0 1px 3px ${theme.shadow}`
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold" style={{ color: theme.text }}>
                {users.filter(u => u.status === 'pending').length}
              </p>
              <p className="text-sm" style={{ color: theme.textSecondary }}>
                Pending Approval
              </p>
            </div>
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: theme.warning + '20' }}
            >
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.warning }} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div 
        className="p-6 rounded-xl"
        style={{ 
          backgroundColor: theme.surface,
          boxShadow: `0 1px 3px ${theme.shadow}`
        }}
      >
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4">
            <div className="relative">
              <Search 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" 
                style={{ color: theme.textSecondary }}
              />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border w-64"
                style={{
                  backgroundColor: theme.background,
                  borderColor: theme.border,
                  color: theme.text
                }}
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border"
              style={{
                backgroundColor: theme.background,
                borderColor: theme.border,
                color: theme.text
              }}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          
          <button
            className="flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors hover:bg-opacity-80"
            style={{ 
              borderColor: theme.border,
              backgroundColor: theme.surfaceAlt,
              color: theme.text 
            }}
          >
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div 
        className="rounded-xl overflow-hidden"
        style={{ 
          backgroundColor: theme.surface,
          boxShadow: `0 1px 3px ${theme.shadow}`
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: theme.surfaceAlt }}>
              <tr>
                <th className="text-left p-4 font-medium" style={{ color: theme.textSecondary }}>
                  User
                </th>
                <th className="text-left p-4 font-medium" style={{ color: theme.textSecondary }}>
                  Contact
                </th>
                <th className="text-left p-4 font-medium" style={{ color: theme.textSecondary }}>
                  Role
                </th>
                <th className="text-left p-4 font-medium" style={{ color: theme.textSecondary }}>
                  Status
                </th>
                <th className="text-left p-4 font-medium" style={{ color: theme.textSecondary }}>
                  Last Login
                </th>
                <th className="text-left p-4 font-medium" style={{ color: theme.textSecondary }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr 
                  key={user.id}
                  className="hover:bg-opacity-50 transition-colors"
                  style={{ 
                    borderBottom: `1px solid ${theme.border}`,
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.surfaceAlt + '30'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                        style={{ backgroundColor: theme.primary }}
                      >
                        {user.avatar}
                      </div>
                      <div>
                        <p className="font-medium" style={{ color: theme.text }}>
                          {user.name}
                        </p>
                        <p className="text-sm" style={{ color: theme.textSecondary }}>
                          ID: {user.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" style={{ color: theme.textSecondary }} />
                        <span className="text-sm" style={{ color: theme.text }}>
                          {user.email}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" style={{ color: theme.textSecondary }} />
                        <span className="text-sm" style={{ color: theme.text }}>
                          {user.phone}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span 
                      className="px-3 py-1 rounded-full text-sm font-medium text-white"
                      style={{ backgroundColor: getRoleColor(user.role) }}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: getStatusColor(user.status) }}
                      />
                      <span 
                        className="text-sm font-medium capitalize"
                        style={{ color: getStatusColor(user.status) }}
                      >
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm" style={{ color: theme.textSecondary }}>
                      {user.lastLogin}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        className="p-2 rounded-lg transition-colors hover:bg-opacity-80"
                        style={{ backgroundColor: theme.surfaceAlt }}
                      >
                        <Edit className="w-4 h-4" style={{ color: theme.text }} />
                      </button>
                      <button 
                        className="p-2 rounded-lg transition-colors hover:bg-opacity-80"
                        style={{ backgroundColor: theme.error + '20' }}
                      >
                        <Trash2 className="w-4 h-4" style={{ color: theme.error }} />
                      </button>
                      <button 
                        className="p-2 rounded-lg transition-colors hover:bg-opacity-80"
                        style={{ backgroundColor: theme.surfaceAlt }}
                      >
                        <MoreHorizontal className="w-4 h-4" style={{ color: theme.text }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div 
          className="flex items-center justify-between p-4 border-t"
          style={{ borderColor: theme.border }}
        >
          <p className="text-sm" style={{ color: theme.textSecondary }}>
            Showing {filteredUsers.length} of {users.length} users
          </p>
          <div className="flex space-x-2">
            <button 
              className="px-3 py-1 rounded border"
              style={{ 
                borderColor: theme.border,
                color: theme.textSecondary 
              }}
            >
              Previous
            </button>
            <button 
              className="px-3 py-1 rounded text-white"
              style={{ backgroundColor: theme.primary }}
            >
              1
            </button>
            <button 
              className="px-3 py-1 rounded border"
              style={{ 
                borderColor: theme.border,
                color: theme.textSecondary 
              }}
            >
              2
            </button>
            <button 
              className="px-3 py-1 rounded border"
              style={{ 
                borderColor: theme.border,
                color: theme.textSecondary 
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;