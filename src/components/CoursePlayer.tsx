import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  PlayCircle, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X, 
  FileText, 
  MessageSquare, 
  Bookmark,
  Settings,
  ArrowLeft,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mock Data for Player
const MOCK_COURSE = {
  id: '1',
  title: 'Lập trình Fullstack Web với React & Node.js',
  chapters: [
    {
      id: 'c1',
      title: 'Chương 1: Giới thiệu & Cài đặt',
      lessons: [
        { id: 'l1', title: 'Giới thiệu khóa học', duration: '05:00', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', completed: true },
        { id: 'l2', title: 'Cài đặt môi trường Node.js', duration: '12:00', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', completed: true },
        { id: 'l3', title: 'Cài đặt VS Code & Extensions', duration: '08:00', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', completed: false },
      ]
    },
    {
      id: 'c2',
      title: 'Chương 2: Cơ bản về React',
      lessons: [
        { id: 'l4', title: 'React là gì?', duration: '15:00', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', completed: false },
        { id: 'l5', title: 'JSX & Components', duration: '20:00', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', completed: false },
        { id: 'l6', title: 'Props & State', duration: '25:00', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', completed: false },
      ]
    }
  ]
};

export const CoursePlayer = () => {
  const { courseId, lessonId } = useParams();
  const [activeLesson, setActiveLesson] = useState(MOCK_COURSE.chapters[0].lessons[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'content' | 'qa' | 'notes'>('content');

  useEffect(() => {
    if (lessonId) {
      const lesson = MOCK_COURSE.chapters.flatMap(c => c.lessons).find(l => l.id === lessonId);
      if (lesson) setActiveLesson(lesson);
    }
  }, [lessonId]);

  return (
    <div className="flex h-screen bg-slate-900 text-white overflow-hidden">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-slate-800/50 backdrop-blur border-b border-slate-700 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="font-bold text-sm truncate max-w-md">{MOCK_COURSE.title}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-emerald-500" />
              </div>
              <span className="text-xs font-bold text-slate-400">33% Hoàn thành</span>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </header>

        {/* Video Player Section */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="aspect-video bg-black w-full max-w-5xl mx-auto shadow-2xl">
            <iframe 
              src={activeLesson.videoUrl}
              className="w-full h-full"
              allowFullScreen
              title={activeLesson.title}
            />
          </div>

          {/* Lesson Info & Tabs */}
          <div className="max-w-5xl mx-auto px-6 py-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">{activeLesson.title}</h2>
                <p className="text-slate-400 text-sm">Cập nhật ngày 20/03/2026</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold transition-all active:scale-95">
                  <CheckCircle2 size={20} />
                  Hoàn thành & Tiếp tục
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-700 flex gap-8 mb-8">
              {[
                { id: 'content', label: 'Nội dung', icon: <FileText size={18} /> },
                { id: 'qa', label: 'Hỏi đáp', icon: <MessageSquare size={18} /> },
                { id: 'notes', label: 'Ghi chú', icon: <Bookmark size={18} /> }
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "flex items-center gap-2 pb-4 text-sm font-bold transition-all relative",
                    activeTab === tab.id ? "text-emerald-500" : "text-slate-400 hover:text-white"
                  )}
                >
                  {tab.icon}
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="prose prose-invert max-w-none">
              {activeTab === 'content' && (
                <div className="space-y-6 text-slate-300 leading-relaxed">
                  <p>Trong bài học này, chúng ta sẽ tìm hiểu về các khái niệm cơ bản nhất của React và tại sao nó lại trở nên phổ biến như vậy.</p>
                  <h3>Mục tiêu bài học:</h3>
                  <ul>
                    <li>Hiểu về Virtual DOM</li>
                    <li>Cấu trúc của một React Component</li>
                    <li>Cách JSX hoạt động đằng sau hậu trường</li>
                  </ul>
                  <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                    <p className="text-sm font-bold text-emerald-400 mb-2">Tài liệu đính kèm:</p>
                    <a href="#" className="flex items-center gap-2 text-sm hover:underline">
                      <FileText size={16} /> slide-bai-hoc-01.pdf
                    </a>
                  </div>
                </div>
              )}
              {activeTab === 'qa' && (
                <div className="text-center py-10 space-y-4">
                  <MessageSquare size={48} className="mx-auto text-slate-600" />
                  <p className="text-slate-400">Chưa có câu hỏi nào cho bài học này. Hãy là người đầu tiên đặt câu hỏi!</p>
                  <button className="bg-slate-700 px-6 py-2 rounded-lg text-sm font-bold">Đặt câu hỏi</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Navigation (Mobile) */}
        <div className="h-16 bg-slate-800 border-t border-slate-700 flex items-center justify-between px-6 shrink-0 md:hidden">
          <button className="flex items-center gap-2 text-sm font-bold text-slate-400">
            <ChevronLeft size={20} /> Bài trước
          </button>
          <button className="flex items-center gap-2 text-sm font-bold text-emerald-500">
            Bài tiếp theo <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Sidebar - Curriculum */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside 
            initial={{ x: 350 }}
            animate={{ x: 0 }}
            exit={{ x: 350 }}
            className="w-[350px] bg-slate-800 border-l border-slate-700 flex flex-col shrink-0 fixed inset-y-0 right-0 z-50 lg:relative lg:inset-auto"
          >
            <div className="p-6 border-b border-slate-700 flex items-center justify-between">
              <h3 className="font-bold">Nội dung khóa học</h3>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors lg:hidden"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {MOCK_COURSE.chapters.map((chapter, cIndex) => (
                <div key={chapter.id} className="border-b border-slate-700/50">
                  <div className="p-4 bg-slate-800/50 flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Chương {cIndex + 1}</span>
                    <h4 className="text-sm font-bold text-slate-200">{chapter.title}</h4>
                  </div>
                  <div className="py-2">
                    {chapter.lessons.map((lesson, lIndex) => (
                      <button 
                        key={lesson.id}
                        onClick={() => setActiveLesson(lesson)}
                        className={cn(
                          "w-full flex items-start gap-4 px-6 py-4 transition-all hover:bg-slate-700/50 text-left",
                          activeLesson.id === lesson.id ? "bg-emerald-600/10 border-r-4 border-emerald-500" : ""
                        )}
                      >
                        <div className="mt-1 shrink-0">
                          {lesson.completed ? (
                            <CheckCircle2 size={18} className="text-emerald-500" />
                          ) : (
                            <PlayCircle size={18} className={activeLesson.id === lesson.id ? "text-emerald-500" : "text-slate-500"} />
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className={cn(
                            "text-sm font-medium leading-snug",
                            activeLesson.id === lesson.id ? "text-emerald-400" : "text-slate-300"
                          )}>
                            {lIndex + 1}. {lesson.title}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                            <Clock size={10} /> {lesson.duration}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};
