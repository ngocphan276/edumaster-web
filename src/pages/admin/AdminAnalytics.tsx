import { useEffect, useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { supabase } from '../../lib/supabase';
import { Users, BookOpen, DollarSign } from 'lucide-react';

export const AdminAnalytics = () => {
  const [courseStats, setCourseStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    const { data: courses } = await supabase.from('courses').select('*');
    if (courses) {
      setCourseStats(courses.map(c => ({
        name: c.title.substring(0, 20) + '...',
        students: c.students_count || 0,
        revenue: (c.price * c.students_count) || 0
      })));
    }
    setLoading(false);
  };

  const totalStudents = courseStats.reduce((acc, c) => acc + c.students, 0);
  const totalRevenue = courseStats.reduce((acc, c) => acc + c.revenue, 0);

  return (
    <AdminLayout currentPage="analytics">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Thống kê</h1>
        <p className="text-slate-500 mt-1">Phân tích dữ liệu học tập</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Users size={22} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Tổng học viên</p>
              <p className="text-2xl font-bold text-slate-900">{totalStudents}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <BookOpen size={22} className="text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Khóa học</p>
              <p className="text-2xl font-bold text-slate-900">{courseStats.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <DollarSign size={22} className="text-amber-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Tổng doanh thu</p>
              <p className="text-2xl font-bold text-slate-900">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalRevenue)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h2 className="text-lg font-bold text-slate-900 mb-6">Danh sách khóa học & Học viên</h2>
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {courseStats.map((course, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <p className="font-medium text-slate-900">{course.name}</p>
                  <p className="text-sm text-slate-500">{course.students} học viên</p>
                </div>
                <p className="font-bold text-emerald-600">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.revenue)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};