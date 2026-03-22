-- Cơ sở dữ liệu cho EduMaster

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

-- Bảng profiles cho user metadata
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
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

-- Auto create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Policies (RLS) bảo mật dữ liệu
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Mọi người đều có thể xem danh sách khóa học
CREATE POLICY "Public courses are viewable by everyone"
  ON courses FOR SELECT
  USING ( true );

-- Mọi người đều có thể xem profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING ( true );

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING ( auth.uid() = id );

-- Admin can manage all profiles
CREATE POLICY "Admins can manage all profiles"
  ON profiles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Học viên chỉ xem được tiến trình của chính mình
CREATE POLICY "Users can view own enrollments"
  ON enrollments FOR SELECT
  USING ( auth.uid() = user_id );

-- Học viên có thể tạo enrollment
CREATE POLICY "Users can create enrollments"
  ON enrollments FOR INSERT
  WITH CHECK ( auth.uid() = user_id );

-- Học viên có thể cập nhật tiến độ của mình
CREATE POLICY "Users can update own enrollments"
  ON enrollments FOR UPDATE
  USING ( auth.uid() = user_id );

-- Admin can manage all enrollments
CREATE POLICY "Admins can manage all enrollments"
  ON enrollments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admin can manage all courses
CREATE POLICY "Admins can manage all courses"
  ON courses FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Insert Data Mẫu
INSERT INTO courses (title, description, thumbnail, instructor_name, price, original_price, rating, total_lessons, total_hours)
VALUES 
('Lập trình Fullstack Web với React & Node.js', 'Khóa học toàn diện nhất về lập trình web hiện đại', 'https://picsum.photos/seed/course1/600/400', 'Alex Tran', 799000, 1200000, 4.9, 42, 24),
('Mastering UI/UX Design with Figma', 'Trở thành UI/UX Designer chuyên nghiệp', 'https://picsum.photos/seed/course2/600/400', 'Jane Doe', 599000, 900000, 4.8, 25, 12),
('Tiếng Anh giao tiếp cho IT', 'Phát triển kỹ năng tiếng Anh chuyên ngành', 'https://picsum.photos/seed/course3/600/400', 'David Smith', 499000, 700000, 4.7, 30, 15),
('Python cho Machine Learning', 'Từ cơ bản đến ứng dụng AI', 'https://picsum.photos/seed/course4/600/400', 'Maria Chen', 999000, 1500000, 4.8, 50, 30);
