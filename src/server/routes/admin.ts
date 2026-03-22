import { Router } from 'express';
import { supabaseAdmin } from '../supabase-admin';

const router = Router();

router.get('/stats', async (req, res) => {
  try {
    const [coursesRes, usersRes, enrollmentsRes] = await Promise.all([
      supabaseAdmin.from('courses').select('*'),
      supabaseAdmin.from('profiles').select('*'),
      supabaseAdmin.from('enrollments').select('*'),
    ]);

    const courses = coursesRes.data || [];
    const enrollments = enrollmentsRes.data || [];

    res.json({
      totalCourses: courses.length,
      totalUsers: usersRes.data?.length || 0,
      totalEnrollments: enrollments.length,
      totalRevenue: courses.reduce((acc, c) => acc + (c.price * c.students_count || 0), 0),
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

router.get('/courses', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

router.post('/courses', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('courses')
      .insert([req.body])
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create course' });
  }
});

router.put('/courses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabaseAdmin
      .from('courses')
      .update(req.body)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update course' });
  }
});

router.delete('/courses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabaseAdmin.from('courses').delete().eq('id', id);
    if (error) throw error;
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete course' });
  }
});

router.get('/users', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.put('/users/:id/role', async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update({ role })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user role' });
  }
});

router.post('/users/:id/make-admin', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update({ role: 'admin' })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, user: data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to make user admin' });
  }
});

router.get('/enrollments', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('enrollments')
      .select(`
        *,
        profiles (full_name, email),
        courses (title, thumbnail)
      `)
      .order('enrolled_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch enrollments' });
  }
});

router.delete('/enrollments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabaseAdmin.from('enrollments').delete().eq('id', id);
    if (error) throw error;
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete enrollment' });
  }
});

export default router;
