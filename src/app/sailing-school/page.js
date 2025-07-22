'use client';

import { useEffect, useState } from "react";

import Link from "next/link";
import { FilledButton } from "@/devlink";

export default function SailingSchoolPage() {
  const [courses, setCourses] = useState([]);
  // TODO: Replace with Supabase session
  const session = null;

  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(setCourses);
  }, []);

  return (
    <main style={{ padding: '2rem', maxWidth: 700, margin: '0 auto' }}>
      <h1>Sailing School Courses</h1>
      {courses.length === 0 && <p>No courses available right now.</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {courses.map(course => (
          <li key={course._id} style={{marginBottom: 20, padding: 15, borderRadius: 8 }}>
            <h2>{course.title}</h2>
            <div>
              <b>Date:</b> {new Date(course.date).toLocaleString()}
            </div>
            <div>
              <b>Description:</b> {course.description}
            </div>
            <div>
              <b>Duration:</b> {course.duration}
            </div>
            <div>
              <b>Price:</b>{' '}
              {session?.user?.role === 'member'
                ? `£${course.memberPrice} (Member)`
                : `£${course.nonMemberPrice} (Non-member)`
              }
            </div>
            <div>
              <b>Slots available:</b> {course.slots - (course.booked || 0)}
            </div>
            <div 
            style={{display: 'flex'}}>
            <FilledButton
            link = {{ href: `/sailing-school/book?courseId=${course._id}`}}
              text= "Is this what it says"
            />
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
