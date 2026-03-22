import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, ChevronRight, ArrowLeft, Tag, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

const MOCK_CART = [
  {
    id: '1',
    title: 'Lập trình Fullstack Web với React & Node.js',
    instructor: 'Alex Tran',
    thumbnail: 'https://picsum.photos/seed/course1/600/400',
    price: 1200000,
    salePrice: 799000
  },
  {
    id: '2',
    title: 'Mastering UI/UX Design with Figma',
    instructor: 'Jane Doe',
    thumbnail: 'https://picsum.photos/seed/course2/600/400',
    price: 800000,
    salePrice: 599000
  }
];

export const CartPage = () => {
  const [cartItems, setCartItems] = useState(MOCK_CART);
  const [coupon, setCoupon] = useState('');

  const totalOriginal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const totalSale = cartItems.reduce((acc, item) => acc + (item.salePrice || item.price), 0);
  const discount = totalOriginal - totalSale;

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6">
          <ShoppingCart size={48} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Giỏ hàng trống</h1>
        <p className="text-slate-500 mb-8 max-w-md">Bạn chưa thêm khóa học nào vào giỏ hàng. Hãy khám phá các khóa học hấp dẫn của chúng tôi!</p>
        <Link to="/courses" className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-100 active:scale-95">
          Khám phá khóa học
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-12">
          <Link to="/courses" className="p-2 hover:bg-white rounded-lg transition-colors text-slate-500">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-4xl font-bold text-slate-900">Giỏ hàng</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-6 group"
              >
                <div className="w-full sm:w-48 h-32 rounded-2xl overflow-hidden shrink-0">
                  <img src={item.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors">{item.title}</h3>
                    <p className="text-sm text-slate-500">Giảng viên: {item.instructor}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-extrabold text-emerald-600">{(item.salePrice || item.price).toLocaleString('vi-VN')}đ</span>
                      {item.salePrice && (
                        <span className="text-sm text-slate-400 line-through">{item.price.toLocaleString('vi-VN')}đ</span>
                      )}
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <aside className="space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
              <h2 className="text-2xl font-bold text-slate-900">Tổng cộng</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Giá gốc</span>
                  <span className="line-through">{totalOriginal.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex justify-between text-sm text-emerald-600 font-bold">
                  <span>Tiết kiệm</span>
                  <span>-{discount.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="pt-4 border-t border-slate-100 flex justify-between items-end">
                  <span className="font-bold text-slate-900">Thành tiền</span>
                  <span className="text-3xl font-extrabold text-emerald-600">{totalSale.toLocaleString('vi-VN')}đ</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative group">
                  <Tag size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                  <input 
                    type="text" 
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Mã giảm giá" 
                    className="w-full bg-slate-50 border-none rounded-2xl px-12 py-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all">
                    Áp dụng
                  </button>
                </div>
                
                <Link 
                  to="/checkout" 
                  className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-100 active:scale-95 flex items-center justify-center gap-2"
                >
                  Thanh toán ngay <ChevronRight size={20} />
                </Link>
              </div>
            </div>

            <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 space-y-4">
              <div className="flex items-center gap-3 text-emerald-700">
                <CheckCircle2 size={24} />
                <span className="font-bold">Đảm bảo hài lòng</span>
              </div>
              <p className="text-xs text-emerald-600 leading-relaxed">Tất cả khóa học đều được bảo hành hoàn tiền trong 7 ngày nếu bạn không hài lòng với chất lượng nội dung.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
