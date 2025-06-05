import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Users, Building2, Package, Settings } from 'lucide-react';
import Button from '../components/ui/Button';

interface User {
  id: string;
  email: string;
  studio_name: string;
  role: string;
  created_at: string;
}

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setUsers(data || []);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const stats = {
    totalUsers: users.length,
    totalStudios: users.filter(u => u.studio_name).length,
    activeUsers: users.filter(u => new Date(u.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-surface-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary-50 rounded-lg">
              <Users className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="font-medium">Total Users</h3>
          </div>
          <p className="text-3xl font-bold">{stats.totalUsers}</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-surface-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-secondary-50 rounded-lg">
              <Building2 className="h-6 w-6 text-secondary-600" />
            </div>
            <h3 className="font-medium">Active Studios</h3>
          </div>
          <p className="text-3xl font-bold">{stats.totalStudios}</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-surface-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-terracotta-50 rounded-lg">
              <Package className="h-6 w-6 text-terracotta-600" />
            </div>
            <h3 className="font-medium">Active Users</h3>
          </div>
          <p className="text-3xl font-bold">{stats.activeUsers}</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-surface-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-accent-50 rounded-lg">
              <Settings className="h-6 w-6 text-accent-600" />
            </div>
            <h3 className="font-medium">System Status</h3>
          </div>
          <p className="text-sm font-medium text-green-600">All Systems Operational</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-surface-200">
        <div className="p-6 border-b border-surface-200">
          <h2 className="text-lg font-semibold">Users</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">
                  Studio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-surface-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-surface-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-surface-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-surface-700">{user.studio_name || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary-50 text-primary-700">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-700">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="link" className="text-primary-600 hover:text-primary-900">
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;