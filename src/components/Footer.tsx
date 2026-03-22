import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
                <BookOpen size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">EduFlow</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Nền tảng học trực tuyến hàng đầu Việt Nam, giúp bạn làm chủ kỹ năng thực chiến từ các chuyên gia.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6">Khám phá</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/courses" className="hover:text-emerald-400 transition-colors">Tất cả khóa học</Link></li>
              <li><Link to="/roadmap" className="hover:text-emerald-400 transition-colors">Lộ trình học tập</Link></li>
              <li><Link to="/instructors" className="hover:text-emerald-400 transition-colors">Đội ngũ giảng viên</Link></li>
              <li><Link to="/blog" className="hover:text-emerald-400 transition-colors">Kiến thức chia sẻ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Hỗ trợ</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/faq" className="hover:text-emerald-400 transition-colors">Câu hỏi thường gặp</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Liên hệ tư vấn</Link></li>
              <li><Link to="/terms" className="hover:text-emerald-400 transition-colors">Điều khoản sử dụng</Link></li>
              <li><Link to="/privacy" className="hover:text-emerald-400 transition-colors">Chính sách bảo mật</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Bản tin</h4>
            <p className="text-sm text-slate-400 mb-4">Nhận thông tin ưu đãi và bài viết mới nhất.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email của bạn" 
                className="bg-slate-800 border-none rounded-lg px-4 py-2 text-sm w-full focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-500 transition-colors">
                Gửi
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 EduFlow. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
            <a href="#" className="hover:text-white transition-colors">YouTube</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
