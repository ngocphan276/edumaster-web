import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { 
  BookOpen, 
  Clock, 
  Award, 
  PlayCircle, 
  CheckCircle2, 
  ChevronRight, 
  Search, 
  Bell,
  User,
  LayoutDashboard,
  Settings,
  LogOut,
  Shield
} from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const StudentDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>('student');

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      
      if (profile) {
        setUserRole(profile.role || 'student');
      }

      const { data } = await supabase
        .from('enrollments')
        .select(`
          *,
          courses (*)
        `)
        .eq('user_id', user.id);
      
      if (data) {
        setEnrolledCourses(data.map(e => ({
          ...e.courses,
          progress: e.progress,
        })));
      }
      setLoading(false);
    };

    fetchData();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const isAdmin = userRole === 'admin';

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-slate-200 flex-col fixed inset-y-0 left-0 z-50">
        <div className="p-8 border-b border-slate-100">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center p-1.5 shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform">
              <img src="/logo.png" alt="EduMaster" className="w-full h-full object-contain filter brightness-0 invert" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">EduMaster</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-6 space-y-2">
          {[
            { name: 'Tổng quan', icon: <LayoutDashboard size={20} />, path: '/dashboard', active: true },
            { name: 'Khóa học của tôi', icon: <BookOpen size={20} />, path: '/my-courses' },
            { name: 'Chứng chỉ', icon: <Award size={20} />, path: '/certificates' },
            { name: 'Cài đặt', icon: <Settings size={20} />, path: '/settings' },
            ...(isAdmin ? [{ name: 'Admin Panel', icon: <Shield size={20} />, path: '/admin', active: false, isAdmin: true }] : []),
          ].map(item => (
            <Link 
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                item.active ? "bg-emerald-600 text-white shadow-lg shadow-emerald-100" : 
                item.isAdmin ? "bg-purple-100 text-purple-700 hover:bg-purple-200" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-100">
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut size={20} />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 p-6 lg:p-12">
        {/* Top Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold text-slate-900">Chào mừng trở lại, {user?.user_metadata?.full_name?.split(' ')[0] || 'bạn'}! 👋</h1>
            <p className="text-slate-500 text-sm font-medium">Hôm nay bạn muốn học gì?</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-emerald-600 transition-colors">
                <Bell size={20} />
              </button>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </div>
            <div className="flex items-center gap-3 bg-white border border-slate-200 p-2 pr-4 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                {user?.user_metadata?.full_name?.charAt(0) || <User size={20} />}
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-bold text-slate-900">{user?.user_metadata?.full_name || 'Học viên'}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{user?.email}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { label: 'Khóa học đang học', value: enrolledCourses.length.toString(), icon: <BookOpen className="text-emerald-600" />, bg: 'bg-emerald-50' },
            { label: 'Bài học hoàn thành', value: '0', icon: <CheckCircle2 className="text-indigo-600" />, bg: 'bg-indigo-50' },
            { label: 'Chứng chỉ nhận được', value: '0', icon: <Award className="text-amber-600" />, bg: 'bg-amber-50' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6">
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", stat.bg)}>
                {stat.icon}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-3xl font-extrabold text-slate-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Enrolled Courses */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Khóa học của tôi</h2>
            <Link to="/my-courses" className="text-sm font-bold text-emerald-600 hover:underline">Xem tất cả</Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {loading ? (
              <div className="col-span-full py-12 text-center text-slate-500 font-medium">Đang tải dữ liệu khóa học...</div>
            ) : enrolledCourses.length === 0 ? (
              <div className="col-span-full py-12 text-center text-slate-500 font-medium">Bạn chưa đăng ký khóa học nào.</div>
            ) : enrolledCourses.map((course) => (
              <motion.div 
                key={course.id}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-full sm:w-40 h-28 rounded-2xl overflow-hidden shrink-0">
                    <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" alt={course.title} />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-bold text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors">{course.title}</h3>
                      <p className="text-xs text-slate-500 font-medium">Giảng viên: {course.instructor_name}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <span>Tiến độ</span>
                        <span>{course.progress || 0}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${course.progress || 0}%` }} />
                      </div>
                    </div>
                    <Link 
                      to={`/player/${course.id}`} 
                      className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors"
                    >
                      Tiếp tục học <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recommended for you */}
        <div className="mt-16 space-y-8">
          <h2 className="text-2xl font-bold text-slate-900">Gợi ý cho bạn</h2>
          <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
            <div className="relative z-10 max-w-lg space-y-6">
              <h3 className="text-3xl font-extrabold leading-tight">Khám phá lộ trình trở thành Chuyên gia UI/UX</h3>
              <p className="text-indigo-100 leading-relaxed">Lộ trình học tập được thiết kế riêng để giúp bạn làm chủ các công cụ và tư duy thiết kế hiện đại.</p>
              <button className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold hover:bg-indigo-50 transition-all shadow-xl shadow-indigo-900/20 active:scale-95">
                Xem lộ trình ngay
              </button>
            </div>
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
              <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-white rounded-full blur-[100px]" />
            </div>
            <Award size={120} className="absolute bottom-[-20px] right-[-20px] text-white/10 rotate-12" />
          </div>
        </div>
      </main>
    </div>
  );
};
