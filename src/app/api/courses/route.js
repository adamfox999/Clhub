import { connectToDB } from '@/lib/mongodb';
import Course from '@/models/Course';

export async function GET() {
  await connectToDB();
  const courses = await Course.find();
  return Response.json(courses);
}

export async function POST(request) {
  await connectToDB();
  const body = await request.json();
  const newCourse = await Course.create(body);
  return Response.json(newCourse);
}
