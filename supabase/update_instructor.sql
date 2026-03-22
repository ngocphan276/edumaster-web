-- Cập nhật giảng viên Trade Marketing thành Trần Bá Tâm
UPDATE courses 
SET instructor_name = 'Trần Bá Tám'
WHERE title IN (
  'Trade Marketing Tổng Quan',
  'Chiến Lược Phân Phối Hiệu Quả', 
  'Quản Lý Kênh Bán Lẻ',
  'Visual Merchandising Chuyên Nghiệp',
  'Trade Promotion & Khuyến Mãi'
);

-- Kiểm tra kết quả
SELECT id, title, instructor_name FROM courses 
WHERE instructor_name = 'Trần Bá Tám';
