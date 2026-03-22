import { useEffect, useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { supabase } from '../../lib/supabase';
import { Search, Trash2, CheckCircle2 } from 'lucide-react';

interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  progress: number;
  enrolled_at: string;
  profiles: { full_name: string; email: string };
  courses: { title: string; thumbnail: string };
}

export const AdminEnrollments = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    const { data } = await supabase
      .from('enrollments')
      .select('*, profiles (full_name, email), courses (title, thumbnail)')
      .order('enrolled_at', { ascending: false });
    setEnrollments(data || []);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Hủy đăng ký này?')) {
      await supabase.from('enrollments').delete().eq('id', id);
      fetchEnrollments();
    }
  };

  const filteredEnrollments = enrollments.filter(e =>
    e.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.courses?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout currentPage="enrollments">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Quản lý đăng ký</h1>
          <p className="text-slate-500 mt-1">Tổng cộng {enrollments.length} đăng ký</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
        <div className="p-6 border-b border-slate-100">
          <div className="relative max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Tìm kiếm đăng ký..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  <th className="px-6 py-4">Học viên</th>
                  <th className="px-6 py-4">Khóa học</th>
                  <th className="px-6 py-4">Tiến độ</th>
                  <th className="px-6 py-4">Ngày đăng ký</th>
                  <th className="px-6 py-4">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEnrollments.map((enrollment) => (
                  <tr key={enrollment.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                          {enrollment.profiles?.full_name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{enrollment.profiles?.full_name || 'N/A'}</p>
                          <p className="text-xs text-slate-500">{enrollment.profiles?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={enrollment.courses?.thumbnail} className="w-10 h-10 rounded-lg object-cover" referrerPolicy="no-referrer" alt="" />
                        <span className="text-sm font-medium text-slate-900">{enrollment.courses?.title || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${enrollment.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${enrollment.progress || 0}%` }} />
                        </div>
                        <span className="text-sm font-medium text-slate-600">{enrollment.progress || 0}%</span>
                        {enrollment.progress === 100 && <CheckCircle2 size={16} className="text-emerald-500" />}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {enrollment.enrolled_at ? new Date(enrollment.enrolled_at).toLocaleDateString('vi-VN') : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => handleDelete(enrollment.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};