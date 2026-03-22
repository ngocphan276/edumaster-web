-- Cơ sở dữ liệu cho EduFlow (Ví dụ mẫu)

-- Bảng khóa học
CREATE TABLE courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  thumbnail TEXT NOT NULL,
  instructor_name TEXT NOT NULL,
  price NUMERIC NOT NULL DEFAULT 0,
  original_price NUMERIC,
  rating NUMERIC(3, 2) DEFAULT 0,
  total_lessons INTEGER DEFAULT 0,
  total_hours INTEGER DEFAULT 0,
  students_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bảng tiến trình học viên (enrollments)
CREATE TABLE enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  progress INTEGER DEFAULT 0,
  last_lesson TEXT,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, course_id)
);

-- Policies (RLS) bảo mật dữ liệu
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Mọi người đều có thể xem danh sách khóa học
CREATE POLICY "Public profiles are viewable by everyone."
  ON courses FOR SELECT
  USING ( true );

-- Học viên chỉ xem được tiến trình của chính mình
CREATE POLICY "Users can view their own enrollments."
  ON enrollments FOR SELECT
  USING ( auth.uid() = user_id );

-- Insert Data Mẫu
INSERT INTO courses (title, description, thumbnail, instructor_name, price, original_price, rating, total_lessons, total_hours)
VALUES 
('Lập trình Fullstack Web với React & Node.js', 'Khóa học toàn diện nhất', 'https://picsum.photos/seed/course1/600/400', 'Alex Tran', 799000, 1200000, 4.9, 42, 24),
('Mastering UI/UX Design with Figma', 'Trở thành UI/UX Designer', 'https://picsum.photos/seed/course2/600/400', 'Jane Doe', 599000, 900000, 4.8, 25, 12),
('Tiếng Anh giao tiếp cho IT', 'Phát triển kỹ năng mềm', 'https://picsum.photos/seed/course3/600/400', 'David Smith', 499000, 700000, 4.7, 30, 15);
