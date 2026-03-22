import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Mail, Lock, User, ArrowRight, Github, Chrome } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';

export const AuthPage = ({ type }: { type: 'login' | 'register' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (type === 'register') {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            }
          }
        });
        if (signUpError) throw signUpError;
        navigate('/dashboard');
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 space-y-8"
      >
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform">
              <BookOpen size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">EduFlow</span>
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900">
            {type === 'login' ? 'Chào mừng trở lại!' : 'Bắt đầu hành trình học tập'}
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            {type === 'login' ? 'Đăng nhập để tiếp tục học tập.' : 'Đăng ký tài khoản mới để khám phá hàng ngàn khóa học.'}
          </p>
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium mt-4">
              {error}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {type === 'register' && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Họ và tên</label>
              <div className="relative group">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nguyễn Văn A" 
                  className="w-full bg-slate-50 border-none rounded-2xl px-12 py-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  required
                />
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
            <div className="relative group">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com" 
                className="w-full bg-slate-50 border-none rounded-2xl px-12 py-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mật khẩu</label>
              {type === 'login' && (
                <Link to="/forgot-password" title="Quên mật khẩu?" className="text-xs font-bold text-emerald-600 hover:underline">Quên mật khẩu?</Link>
              )}
            </div>
            <div className="relative group">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-slate-50 border-none rounded-2xl px-12 py-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                required
              />
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Đang xử lý...' : (type === 'login' ? 'Đăng nhập' : 'Đăng ký tài khoản')} {!loading && <ArrowRight size={20} />}
          </button>
        </form>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
          <div className="relative flex justify-center text-xs font-bold text-slate-400 uppercase tracking-widest bg-white px-4">Hoặc tiếp tục với</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold hover:bg-slate-50 transition-all active:scale-95">
            <Chrome size={18} className="text-red-500" /> Google
          </button>
          <button className="flex items-center justify-center gap-2 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold hover:bg-slate-50 transition-all active:scale-95">
            <Github size={18} className="text-slate-900" /> GitHub
          </button>
        </div>

        <p className="text-center text-sm text-slate-500 font-medium">
          {type === 'login' ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'} {' '}
          <Link to={type === 'login' ? '/register' : '/login'} className="text-emerald-600 font-bold hover:underline">
            {type === 'login' ? 'Đăng ký ngay' : 'Đăng nhập ngay'}
          </Link>
        </p>
      </motion.div>
    </div>
  );
};
