import { useEffect, useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { supabase } from '../../lib/supabase';
import {
  BookOpen,
  Users,
  GraduationCap,
  TrendingUp,
  DollarSign,
  Plus
} from 'lucide-react';

interface Stats {
  totalCourses: number;
  totalUsers: number;
  totalEnrollments: number;
  totalRevenue: number;
}

export const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalCourses: 0,
    totalUsers: 0,
    totalEnrollments: 0,
    totalRevenue: 0,
  });
  const [recentEnrollments, setRecentEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [coursesRes, profilesRes, enrollmentsRes] = await Promise.all([
        supabase.from('courses').select('*'),
        supabase.from('profiles').select('*'),
        supabase.from('enrollments').select('*'),
      ]);

      const courses = coursesRes.data || [];
      const enrollments = enrollmentsRes.data || [];

      setStats({
        totalCourses: courses.length,
        totalUsers: profilesRes.data?.length || 0,
        totalEnrollments: enrollments.length,
        totalRevenue: courses.reduce((acc, c) => acc + (c.price * c.students_count || 0), 0),
      });

      const { data: enrollmentsWithUsers } = await supabase
        .from('enrollments')
        .select(`
          *,
          courses (title),
          profiles (full_name, email)
        `)
        .order('enrolled_at', { ascending: false })
        .limit(5);

      setRecentEnrollments(enrollmentsWithUsers || []);
      setLoading(false);
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      label: 'Tổng khóa học',
      value: stats.totalCourses,
      icon: BookOpen,
      bg: 'bg-blue-500',
      change: '+2 tháng này'
    },
    {
      label: 'Học viên',
      value: stats.totalUsers,
      icon: Users,
      bg: 'bg-emerald-500',
      change: '+15%'
    },
    {
      label: 'Đăng ký',
      value: stats.totalEnrollments,
      icon: GraduationCap,
      bg: 'bg-purple-500',
      change: '+23%'
    },
    {
      label: 'Doanh thu',
      value: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(stats.totalRevenue),
      icon: DollarSign,
      bg: 'bg-amber-500',
      change: '+18%'
    },
  ];

  if (loading) {
    return (
      <AdminLayout currentPage="dashboard">
        <div className="flex items-center justify-center h-96">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout currentPage="dashboard">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Tổng quan</h1>
        <p className="text-slate-500 mt-1">Xem nhanh tình trạng website của bạn</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                <stat.icon size={22} className="text-white" />
              </div>
              <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                <TrendingUp size={12} />
                {stat.change}
              </span>
            </div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">Đăng ký gần đây</h2>
            <a href="/admin/enrollments" className="text-sm font-medium text-emerald-600 hover:underline">Xem tất cả</a>
          </div>
          {recentEnrollments.length === 0 ? (
            <p className="text-slate-400 text-sm text-center py-8">Chưa có đăng ký nào</p>
          ) : (
            <div className="space-y-4">
              {recentEnrollments.map((enrollment) => (
                <div key={enrollment.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                    {enrollment.profiles?.full_name?.charAt(0) || 'U'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {enrollment.profiles?.full_name || 'Người dùng'}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {enrollment.courses?.title || 'Khóa học'}
                    </p>
                  </div>
                  <span className="text-xs text-slate-400">
                    {new Date(enrollment.enrolled_at).toLocaleDateString('vi-VN')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">Thao tác nhanh</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <a href="/admin/courses" className="flex flex-col items-center gap-3 p-6 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center">
                <Plus size={22} className="text-white" />
              </div>
              <span className="text-sm font-medium text-slate-900">Thêm khóa học</span>
            </a>
            <a href="/admin/users" className="flex flex-col items-center gap-3 p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
                <Users size={22} className="text-white" />
              </div>
              <span className="text-sm font-medium text-slate-900">Xem học viên</span>
            </a>
            <a href="/admin/analytics" className="flex flex-col items-center gap-3 p-6 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center">
                <TrendingUp size={22} className="text-white" />
              </div>
              <span className="text-sm font-medium text-slate-900">Xem thống kê</span>
            </a>
            <a href="/" target="_blank" className="flex flex-col items-center gap-3 p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-slate-500 flex items-center justify-center">
                <BookOpen size={22} className="text-white" />
              </div>
              <span className="text-sm font-medium text-slate-900">Xem website</span>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};