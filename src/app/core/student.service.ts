import { Injectable } from '@angular/core';
import { Student } from './student.model';

const SAMPLE_STUDENTS: Student[] = [
  { id: 'STU001', name: 'Anu Suresh', email: 'anu.suresh@example.com', phone: '9876543210', gender: 'Female', dateOfBirth: '2001-08-14', address: '12 Lake Road, Bengaluru', course: 'Java Full Stack', department: 'Computer Science', admissionDate: '2026-06-12', fee: 42000, marks: 86, attendance: 94, status: 'Active' },
  { id: 'STU002', name: 'Rahul Kumar', email: 'rahul.kumar@example.com', phone: '8765432109', gender: 'Male', dateOfBirth: '2000-11-02', address: '44 Green Avenue, Chennai', course: 'Data Science', department: 'Data Science', admissionDate: '2026-05-23', fee: 56000, marks: 78, attendance: 88, status: 'Admitted' },
  { id: 'STU003', name: 'Meera Nair', email: 'meera.nair@example.com', phone: '7654321098', gender: 'Female', dateOfBirth: '1999-02-21', address: '8 Palm Street, Kochi', course: 'MBA', department: 'Business Administration', admissionDate: '2026-04-18', fee: 68000, marks: 91, attendance: 97, status: 'Completed' },
  { id: 'STU004', name: 'Arjun Menon', email: 'arjun.menon@example.com', phone: '9988776655', gender: 'Male', dateOfBirth: '2002-05-30', address: '21 Hill View, Hyderabad', course: 'Python Full Stack', department: 'Computer Science', admissionDate: '2026-07-02', fee: 39000, marks: 72, attendance: 81, status: 'Applied' },
  { id: 'STU005', name: 'Priya Shah', email: 'priya.shah@example.com', phone: '8877665544', gender: 'Female', dateOfBirth: '2001-12-09', address: '5 Market Lane, Pune', course: 'Business Analytics', department: 'Business Administration', admissionDate: '2026-03-08', fee: 51000, marks: 0, attendance: 0, status: 'Cancelled' }
];

@Injectable({ providedIn: 'root' })
export class StudentService {
  students: Student[] = SAMPLE_STUDENTS.map(student => ({ ...student }));
  private sequence = 6;

  add(student: Omit<Student, 'id'>): void {
    this.students = [{ ...student, id: `STU${String(this.sequence++).padStart(3, '0')}` }, ...this.students];
  }

  update(student: Student): void {
    this.students = this.students.map(current => current.id === student.id ? student : current);
  }

  delete(id: string): void {
    this.students = this.students.filter(student => student.id !== id);
  }

  find(id: string): Student | undefined {
    return this.students.find(student => student.id === id);
  }

  reset(): void {
    this.students = SAMPLE_STUDENTS.map(student => ({ ...student }));
    this.sequence = 6;
  }
}