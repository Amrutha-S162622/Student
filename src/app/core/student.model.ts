export type StudentStatus = 'Applied' | 'Admitted' | 'Active' | 'Completed' | 'Cancelled';

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  course: string;
  department: string;
  admissionDate: string;
  fee: number;
  marks: number;
  attendance: number;
  status: StudentStatus;
}

export const COURSES = ['Java Full Stack', 'Python Full Stack', 'Data Science', 'Business Analytics', 'Computer Science', 'MBA'];
export const STATUSES: StudentStatus[] = ['Applied', 'Admitted', 'Active', 'Completed', 'Cancelled'];

export function departmentFor(course: string): string {
  return ['Business Analytics', 'MBA'].includes(course) ? 'Business Administration' : course === 'Data Science' ? 'Data Science' : 'Computer Science';
}