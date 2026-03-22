import { Link } from 'react-router-dom';
import { Star, Clock, ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    instructorName: string;
    thumbnail: string;
    price: number;
    salePrice?: number;
    rating: number;
    reviewsCount: number;
    duration: string;
    category: string;
  };
}

export const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all"
    >
      <Link to={`/course/${course.id}`} className="block relative h-48 overflow-hidden">
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-slate-900 uppercase tracking-wider">
          {course.category}
        </div>
      </Link>
      
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span className="flex items-center gap-1"><Clock size={12} /> {course.duration}</span>
          <span className="flex items-center gap-1 text-amber-500"><Star size={12} fill="currentColor" /> {course.rating} ({course.reviewsCount})</span>
        </div>
        
        <Link to={`/course/${course.id}`}>
          <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors line-clamp-2 min-h-[3.5rem]">
            {course.title}
          </h3>
        </Link>
        
        <div className="flex items-center gap-3">
          <img 
            src={`https://picsum.photos/seed/${course.instructorName}/40/40`} 
            className="w-8 h-8 rounded-full border border-slate-100" 
            referrerPolicy="no-referrer" 
          />
          <span className="text-sm font-medium text-slate-600">{course.instructorName}</span>
        </div>
        
        <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
          <div className="flex flex-col">
            {course.salePrice && (
              <span className="text-xs text-slate-400 line-through">{course.price.toLocaleString('vi-VN')}đ</span>
            )}
            <span className="text-xl font-extrabold text-emerald-600">
              {(course.salePrice || course.price).toLocaleString('vi-VN')}đ
            </span>
          </div>
          <button className="bg-slate-900 text-white p-3 rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-slate-100 active:scale-95">
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
