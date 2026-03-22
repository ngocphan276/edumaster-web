import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { 
  ChevronRight, 
  Star, 
  PlayCircle, 
  CheckCircle2, 
  Clock, 
  Award, 
  ShoppingCart,
  Search,
  User,
  Settings
} from 'lucide-react';

// Re-exporting the page components that were previously in App.tsx
// This helps keep App.tsx clean.

export const HomePage = () => {
  const [featuredCourses, setFeaturedCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await supabase.from('courses').select('*').limit(3);
      if (data) setFeaturedCourses(data);
      setLoading(false);
    };
    fetchCourses();
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 py-20 lg:py-32">
        <div className="absolute top-0 left-0 w-full h-full opacity-50 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-200 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200 rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-bold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Hơn 10,000+ học viên đã tham gia
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                Nâng tầm sự nghiệp với <span className="text-emerald-600">EduFlow</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                Hệ thống học tập thực chiến từ các chuyên gia hàng đầu. Chúng tôi không chỉ dạy kiến thức, chúng tôi đồng hành cùng sự thành công của bạn.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/courses" className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95 flex items-center gap-2">
                  Khám phá khóa học <ChevronRight size={20} />
                </Link>
                <button className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all active:scale-95">
                  Học thử miễn phí
                </button>
              </div>
              <div className="flex items-center gap-6 pt-8">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <img 
                      key={i}
                      src={`https://picsum.photos/seed/user${i}/100/100`} 
                      className="w-12 h-12 rounded-full border-4 border-white shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex text-amber-400 mb-1">
                    {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-sm font-semibold text-slate-900">4.9/5 từ học viên</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-300 border-8 border-white">
                <img 
                  src="https://picsum.photos/seed/learning/800/600" 
                  alt="Learning" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-emerald-600 shadow-xl hover:scale-110 transition-transform">
                  <PlayCircle size={48} fill="currentColor" className="text-emerald-600" />
                </button>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl z-20 max-w-[200px] border border-slate-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="text-sm font-bold text-slate-900">Thực chiến</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">Học qua dự án thực tế, áp dụng được ngay.</p>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white p-6 rounded-3xl shadow-xl z-20 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                    <Award size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Chứng chỉ</p>
                    <p className="text-[10px] text-slate-500">Có giá trị toàn quốc</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Khóa học nổi bật</h2>
              <p className="text-slate-500 max-w-lg">Những khóa học được học viên đánh giá cao nhất và có tỷ lệ việc làm tốt nhất.</p>
            </div>
            <Link to="/courses" className="text-emerald-600 font-bold flex items-center gap-1 hover:gap-2 transition-all">
              Xem tất cả <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full py-12 text-center text-slate-500 font-medium">Đang tải dữ liệu khóa học...</div>
            ) : featuredCourses.map((course) => (
              <motion.div 
                key={course.id}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-900">
                    Bán chạy
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                    <span className="flex items-center gap-1"><Clock size={14} /> {course.total_hours} giờ học</span>
                    <span className="flex items-center gap-1 text-amber-500"><Star size={14} fill="currentColor" /> {course.rating} ({course.students_count || 0})</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                      {course.instructor_name?.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-slate-600">Giảng viên: {course.instructor_name}</span>
                  </div>
                  <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex flex-col">
                      {course.original_price > course.price && (
                        <span className="text-xs text-slate-400 line-through">{course.original_price.toLocaleString('vi-VN')}đ</span>
                      )}
                      <span className="text-xl font-bold text-emerald-600">{course.price.toLocaleString('vi-VN')}đ</span>
                    </div>
                    <Link to={`/course/${course.id}`} className="bg-slate-900 text-white p-3 rounded-xl hover:bg-emerald-600 transition-colors">
                      <ShoppingCart size={20} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Tại sao chọn EduFlow?</h2>
            <p className="text-slate-600">Chúng tôi xây dựng hệ thống dựa trên trải nghiệm thực tế của hàng ngàn học viên.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: 'Học thực chiến', desc: 'Nội dung bám sát thực tế, học xong làm được việc ngay.', icon: <PlayCircle className="text-emerald-600" /> },
              { title: 'Hỗ trợ 24/7', desc: 'Đội ngũ trợ giảng luôn sẵn sàng giải đáp mọi thắc mắc của bạn.', icon: <CheckCircle2 className="text-indigo-600" /> },
              { title: 'Cộng đồng lớn', desc: 'Tham gia cộng đồng học viên năng động, cùng nhau phát triển.', icon: <User className="text-amber-600" /> }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow text-center space-y-6">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export const CoursesPage = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await supabase.from('courses').select('*');
      if (data) setCourses(data);
      setLoading(false);
    };
    fetchCourses();
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <h1 className="text-4xl font-bold text-slate-900">Tất cả khóa học</h1>
          <div className="flex flex-wrap gap-3">
            <button className="bg-white px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium hover:border-emerald-500 transition-colors">Mới nhất</button>
            <button className="bg-white px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium hover:border-emerald-500 transition-colors">Phổ biến</button>
            <button className="bg-white px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium hover:border-emerald-500 transition-colors">Giá thấp</button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block space-y-8">
            <div>
              <h3 className="font-bold text-slate-900 mb-4">Danh mục</h3>
              <div className="space-y-3">
                {['Lập trình', 'Thiết kế', 'Marketing', 'Kinh doanh', 'Ngoại ngữ'].map(cat => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                    <span className="text-sm text-slate-600 group-hover:text-emerald-600 transition-colors">{cat}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-slate-900 mb-4">Cấp độ</h3>
              <div className="space-y-3">
                {['Cơ bản', 'Trung cấp', 'Nâng cao'].map(lvl => (
                  <label key={lvl} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                    <span className="text-sm text-slate-600 group-hover:text-emerald-600 transition-colors">{lvl}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Course Grid */}
          <div className="lg:col-span-3 grid md:grid-cols-2 gap-8">
            {loading ? (
              <div className="col-span-full py-12 text-center text-slate-500 font-medium">Đang tải dữ liệu khóa học...</div>
            ) : courses.map((course) => (
              <div key={course.id} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="relative h-48">
                  <img src={course.thumbnail} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt={course.title} />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2 py-1 rounded uppercase">Lập trình</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">{course.title}</h3>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{course.total_lessons} bài học</span>
                    <span className="flex items-center gap-1 text-amber-500"><Star size={12} fill="currentColor" /> {course.rating} ({course.students_count || 0})</span>
                  </div>
                  <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-lg font-bold text-emerald-600">{course.price.toLocaleString('vi-VN')}đ</span>
                    <Link to={`/course/${course.id}`} className="text-sm font-bold text-slate-900 hover:text-emerald-600 transition-colors">Chi tiết</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const CourseDetailPage = () => {
  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full uppercase">Bán chạy nhất</span>
                <span className="text-slate-400 text-sm">Cập nhật 20/03/2026</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                Lập trình Fullstack Web với React & Node.js: Từ Zero đến Hero
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Khóa học toàn diện nhất giúp bạn trở thành lập trình viên Fullstack chuyên nghiệp. Học từ cơ bản đến nâng cao với các dự án thực tế.
              </p>
              <div className="flex flex-wrap items-center gap-8 pt-4">
                <div className="flex items-center gap-3">
                  <img src="https://picsum.photos/seed/instructor/100/100" className="w-12 h-12 rounded-full" referrerPolicy="no-referrer" />
                  <div>
                    <p className="text-xs text-slate-500">Giảng viên</p>
                    <p className="text-sm font-bold text-slate-900">Alex Tran</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <span className="text-sm font-bold text-slate-900">4.9</span>
                  <span className="text-sm text-slate-500">(1,240 đánh giá)</span>
                </div>
                <div className="text-sm text-slate-500">
                  <span className="font-bold text-slate-900">12,450</span> học viên
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-[2rem] space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Bạn sẽ học được gì?</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Xây dựng ứng dụng Web hoàn chỉnh',
                  'Làm chủ React Hooks & Context API',
                  'Thiết kế database với MongoDB',
                  'Triển khai ứng dụng lên Cloud',
                  'Kỹ năng debug và tối ưu code',
                  'Tư duy giải quyết vấn đề'
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Nội dung khóa học</h2>
              <div className="space-y-4">
                {[
                  { title: 'Chương 1: Giới thiệu & Cài đặt môi trường', lessons: 5, time: '45 phút' },
                  { title: 'Chương 2: Cơ bản về HTML, CSS & JS hiện đại', lessons: 12, time: '3 giờ' },
                  { title: 'Chương 3: Làm quen với React & Component', lessons: 15, time: '5 giờ' },
                  { title: 'Chương 4: Xây dựng Backend với Node.js & Express', lessons: 10, time: '4 giờ' }
                ].map((chapter, i) => (
                  <div key={i} className="border border-slate-100 rounded-2xl overflow-hidden">
                    <button className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 text-sm font-bold">
                          {i + 1}
                        </div>
                        <span className="font-bold text-slate-900 text-left">{chapter.title}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span>{chapter.lessons} bài học</span>
                        <span>{chapter.time}</span>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-8">
            <div className="sticky top-32 bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl shadow-slate-200 overflow-hidden">
              <div className="relative h-56">
                <img src="https://picsum.photos/seed/course-preview/800/600" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-emerald-600 shadow-xl">
                  <PlayCircle size={40} fill="currentColor" />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-extrabold text-slate-900">799.000đ</span>
                  <span className="text-lg text-slate-400 line-through">1.200.000đ</span>
                  <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">-35%</span>
                </div>
                <div className="space-y-3">
                  <button className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-100 active:scale-95">
                    Đăng ký ngay
                  </button>
                  <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all active:scale-95">
                    Thêm vào giỏ hàng
                  </button>
                </div>
                <p className="text-center text-xs text-slate-400">Cam kết hoàn tiền trong 7 ngày nếu không hài lòng</p>
                
                <div className="pt-6 border-t border-slate-100 space-y-4">
                  <p className="font-bold text-sm text-slate-900">Khóa học bao gồm:</p>
                  <ul className="space-y-3">
                    {[
                      { icon: <PlayCircle size={18} />, text: '24 giờ video bài giảng' },
                      { icon: <Clock size={18} />, text: 'Truy cập trọn đời' },
                      { icon: <Award size={18} />, text: 'Chứng chỉ hoàn thành' },
                      { icon: <Settings size={18} />, text: 'Hỗ trợ trực tiếp 1:1' }
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                        <span className="text-emerald-600">{item.icon}</span>
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
