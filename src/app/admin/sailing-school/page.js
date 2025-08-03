'use client';

import { useEffect, useState } from "react";

export default function AdminSailingSchool() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    duration: '',
    memberPrice: '',
    nonMemberPrice: '',
    slots: '',
  });
  const [loading, setLoading] = useState(false);

  // Fetch all courses
  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(setCourses);
  }, []);

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle course submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        memberPrice: parseFloat(form.memberPrice),
        nonMemberPrice: parseFloat(form.nonMemberPrice),
        slots: parseInt(form.slots),
        date: new Date(form.date),
      }),
    });

    if (res.ok) {
      const newCourse = await res.json();
      setCourses(prev => [...prev, newCourse]);
      setForm({
        title: '',
        description: '',
        date: '',
        duration: '',
        memberPrice: '',
        nonMemberPrice: '',
        slots: '',
      });
      alert('Course added!');
    } else {
      alert('Failed to add course');
    }
    setLoading(false);
  };

  return (
    <main style={{ padding: '2rem', maxWidth: 600, margin: '0 auto' }}>
      <h1>Sailing School Admin Dashboard</h1>
      <h2>Add a New Course</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <label>
          Title
          <input name="title" value={form.title} onChange={handleChange} required />
        </label>
        <label>
          Description
          <textarea name="description" value={form.description} onChange={handleChange} required />
        </label>
        <label>
          Date & Time
          <input type="datetime-local" name="date" value={form.date} onChange={handleChange} required />
        </label>
        <label>
          Duration (e.g. &quot;2 days&quot;)
          <input name="duration" value={form.duration} onChange={handleChange} required />
        </label>
        <label>
          Member Price (£)
          <input name="memberPrice" type="number" step="0.01" value={form.memberPrice} onChange={handleChange} required />
        </label>
        <label>
          Non-Member Price (£)
          <input name="nonMemberPrice" type="number" step="0.01" value={form.nonMemberPrice} onChange={handleChange} required />
        </label>
        <label>
          Slots Available
          <input name="slots" type="number" value={form.slots} onChange={handleChange} required />
        </label>
        <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Course'}</button>
      </form>
      <h2>Current Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course._id}>
            <strong>{course.title}</strong> – {new Date(course.date).toLocaleString()}<br />
            {course.description}<br />
            Member £{course.memberPrice} / Non-Member £{course.nonMemberPrice} / Slots: {course.slots}
          </li>
        ))}
      </ul>
    </main>
  );
}
