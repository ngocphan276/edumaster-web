import { Link, Navigate } from 'react-router-dom';
import { AdminLayout } from './AdminLayout';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, Database } from 'lucide-react';

export const AdminSettings = () => {
  const { user } = useAuth();

  const isAdmin = user?.user_metadata?.role === 'admin' || user?.email?.includes('admin');

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <AdminLayout currentPage="settings">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Cài đặt</h1>
        <p className="text-slate-500 mt-1">Quản lý cấu hình hệ thống</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Shield size={20} className="text-emerald-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Thông tin Admin</h2>
              <p className="text-sm text-slate-500">Tài khoản quản trị của bạn</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div>
                <p className="text-sm font-medium text-slate-900">Email</p>
                <p className="text-sm text-slate-500">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div>
                <p className="text-sm font-medium text-slate-900">Vai trò</p>
                <p className="text-sm text-slate-500">Quản trị viên</p>
              </div>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium">
                Administrator
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Database size={20} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Cấu hình Database</h2>
              <p className="text-sm text-slate-500">Kết nối Supabase</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div>
                <p className="text-sm font-medium text-slate-900">Supabase URL</p>
                <p className="text-sm text-slate-500 font-mono">hzmpjgmsfrssqzariklq.supabase.co</p>
              </div>
              <span className="w-3 h-3 bg-emerald-500 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};