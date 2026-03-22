import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CreditCard, 
  Wallet, 
  Building2, 
  CheckCircle2, 
  ShieldCheck,
  Lock
} from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'momo' | 'bank'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-12">
          <Link to="/cart" className="p-2 hover:bg-white rounded-lg transition-colors text-slate-500">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-4xl font-bold text-slate-900">Thanh toán</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            {/* Payment Methods */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
              <h2 className="text-2xl font-bold text-slate-900">Phương thức thanh toán</h2>
              
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { id: 'card', label: 'Thẻ Quốc tế', icon: <CreditCard size={24} /> },
                  { id: 'momo', label: 'Ví MoMo', icon: <Wallet size={24} /> },
                  { id: 'bank', label: 'Chuyển khoản', icon: <Building2 size={24} /> }
                ].map((method) => (
                  <button 
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={cn(
                      "flex flex-col items-center gap-4 p-6 rounded-2xl border-2 transition-all",
                      paymentMethod === method.id 
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700" 
                        : "border-slate-100 hover:border-slate-200 text-slate-500"
                    )}
                  >
                    {method.icon}
                    <span className="text-sm font-bold">{method.label}</span>
                    {paymentMethod === method.id && (
                      <CheckCircle2 size={16} className="absolute top-2 right-2" />
                    )}
                  </button>
                ))}
              </div>

              <form onSubmit={handlePayment} className="space-y-6 pt-4">
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Tên trên thẻ</label>
                      <input 
                        type="text" 
                        placeholder="NGUYEN VAN A" 
                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Số thẻ</label>
                      <div className="relative">
                        <CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          type="text" 
                          placeholder="0000 0000 0000 0000" 
                          className="w-full bg-slate-50 border-none rounded-2xl px-12 py-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Ngày hết hạn</label>
                        <input 
                          type="text" 
                          placeholder="MM/YY" 
                          className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">CVC/CVV</label>
                        <div className="relative">
                          <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input 
                            type="password" 
                            placeholder="•••" 
                            className="w-full bg-slate-50 border-none rounded-2xl px-12 py-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'momo' && (
                  <div className="bg-pink-50 p-8 rounded-3xl border border-pink-100 text-center space-y-4">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                      <Wallet size={32} className="text-pink-600" />
                    </div>
                    <p className="text-sm text-pink-700 font-medium">Bạn sẽ được chuyển hướng đến ứng dụng MoMo để hoàn tất thanh toán.</p>
                  </div>
                )}

                {paymentMethod === 'bank' && (
                  <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100 space-y-4">
                    <h4 className="font-bold text-blue-900">Thông tin chuyển khoản:</h4>
                    <div className="space-y-2 text-sm text-blue-800">
                      <p>Ngân hàng: <strong>Vietcombank</strong></p>
                      <p>Số tài khoản: <strong>1234567890</strong></p>
                      <p>Chủ tài khoản: <strong>EDUFLOW VIETNAM</strong></p>
                      <p>Nội dung: <strong>EDUFLOW [Mã đơn hàng]</strong></p>
                    </div>
                    <p className="text-xs text-blue-600 italic">* Khóa học sẽ được kích hoạt ngay sau khi chúng tôi nhận được thanh toán.</p>
                  </div>
                )}

                <button 
                  disabled={isProcessing}
                  className={cn(
                    "w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-slate-200 active:scale-95 flex items-center justify-center gap-3",
                    isProcessing ? "opacity-70 cursor-not-allowed" : "hover:bg-slate-800"
                  )}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={24} />
                      Xác nhận thanh toán
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="flex items-center justify-center gap-8 py-4 opacity-40 grayscale">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-8" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-6" />
            </div>
          </div>

          <aside className="space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-slate-900">Tóm tắt đơn hàng</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">2 Khóa học</span>
                  <span className="font-bold text-slate-900">1.398.000đ</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Giảm giá</span>
                  <span className="text-emerald-600 font-bold">-0đ</span>
                </div>
                <div className="pt-4 border-t border-slate-100 flex justify-between items-end">
                  <span className="font-bold text-slate-900">Tổng cộng</span>
                  <span className="text-2xl font-extrabold text-emerald-600">1.398.000đ</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Lock size={18} className="text-slate-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-500 leading-relaxed">Thông tin thanh toán của bạn được mã hóa và bảo mật tuyệt đối theo tiêu chuẩn quốc tế.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
