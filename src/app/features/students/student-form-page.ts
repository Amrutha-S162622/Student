import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, CanDeactivateFn, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { COURSES, departmentFor, STATUSES, Student, StudentStatus } from '../../core/student.model';
import { StudentService } from '../../core/student.service';

@Component({
  selector: 'app-student-form-page', standalone: true, imports: [ReactiveFormsModule, RouterLink, MatIconModule, CurrencyPipe],
  template: `
    <div class="form-head"><a routerLink="/students" class="back"><mat-icon>arrow_back</mat-icon> Students</a><p class="eyebrow">{{ editing ? 'UPDATE RECORD' : 'NEW ENROLLMENT' }}</p><h1>{{ editing ? 'Edit student' : 'Add a student' }}</h1><p class="sub">A few details are all it takes to get started.</p></div>
    <section class="form-panel"><div class="steps"><div [class.current]="step===1" [class.done]="step>1"><i>1</i><span>Personal</span></div><b></b><div [class.current]="step===2" [class.done]="step>2"><i>2</i><span>Academic</span></div><b></b><div [class.current]="step===3"><i>3</i><span>Review</span></div></div>
      <form [formGroup]="form" (ngSubmit)="save()">
        @if (step === 1) { <div class="fields"><label>Full name<input formControlName="name" placeholder="e.g. Anu Suresh">@if (showError('name')) {<small>Enter a name with at least 3 characters.</small>}</label><label>Email address<input type="email" formControlName="email" placeholder="student@example.com">@if (showError('email')) {<small>Enter a valid email address.</small>}</label><label>Phone number<input formControlName="phone" inputmode="numeric" placeholder="10-digit mobile number">@if (showError('phone')) {<small>Enter a valid 10-digit Indian mobile number.</small>}</label><label>Gender<select formControlName="gender"><option value="">Select gender</option><option>Male</option><option>Female</option><option>Other</option><option>Prefer not to say</option></select></label><label>Date of birth<input type="date" formControlName="dob">@if (showError('dob')) {<small>Student must be at least 18 years old.</small>}</label><label class="full">Address<textarea formControlName="address" rows="3" placeholder="Street, city, state"></textarea></label></div> }
        @if (step === 2) { <div class="fields"><label>Course<select formControlName="course" (change)="setDepartment()"><option value="">Choose a course</option>@for (course of courses; track course) {<option [value]="course">{{ course }}</option>}</select></label><label>Department<input formControlName="department" readonly></label><label>Admission date<input type="date" formControlName="admissionDate" [max]="today"></label><label>Fee (INR)<input type="number" formControlName="fee" min="1" step="0.01"></label><label>Marks (%)<input type="number" formControlName="marks" min="0" max="100" step="0.1"></label><label>Attendance (%)<input type="number" formControlName="attendance" min="0" max="100" step="0.1"></label><label>Status<select formControlName="status">@for (status of statuses; track status) {<option [value]="status">{{ status }}</option>}</select></label></div> }
        @if (step === 3) { <div class="review"><p class="eyebrow">READY TO SAVE</p><h2>{{ form.controls.name.value }}</h2><p>{{ form.controls.email.value }} · {{ form.controls.phone.value }}</p><div><span>Course</span><strong>{{ form.controls.course.value || 'Not selected' }}</strong><span>Department</span><strong>{{ form.controls.department.value || 'Not selected' }}</strong><span>Admission date</span><strong>{{ form.controls.admissionDate.value || 'Not selected' }}</strong><span>Fee</span><strong>{{ form.controls.fee.value | currency:'INR':'symbol':'1.0-0' }}</strong><span>Status</span><strong>{{ form.controls.status.value }}</strong></div></div> }
        <footer><button class="cancel" type="button" (click)="cancel()">Cancel</button><span class="spacer"></span><button class="outline" type="button" [disabled]="step===1" (click)="step=step-1">Back</button>@if (step < 3) {<button class="primary" type="button" (click)="next()">Continue <mat-icon>arrow_forward</mat-icon></button>} @else {<button class="primary" type="submit">{{ editing ? 'Save changes' : 'Add student' }} <mat-icon>check</mat-icon></button>}</footer>
      </form>
    </section>
  `,
  styles: [`
    :host{display:block;color:#20332e;max-width:850px;margin:auto}.form-head{margin-bottom:23px}.back{display:inline-flex;align-items:center;gap:5px;color:#527769;text-decoration:none;font-size:11px;margin-bottom:24px}.back mat-icon{font-size:16px;width:16px;height:16px}.eyebrow{font-size:9px;font-weight:700;letter-spacing:1.5px;color:#81928b;margin:0 0 8px}.form-head h1{font-family:Georgia,serif;font-size:36px;font-weight:400;letter-spacing:0;margin:0}.sub{margin:8px 0 0;color:#819088;font-size:12px}.form-panel{background:#fff;border:1px solid #e7ede9;border-radius:6px;padding:26px 30px 0}.steps{display:flex;align-items:center;max-width:470px;margin:0 auto 29px}.steps>div{display:flex;align-items:center;gap:8px;white-space:nowrap;color:#98a39d;font-size:11px}.steps i{width:27px;height:27px;border:1px solid #d9e2dc;border-radius:50%;display:grid;place-items:center;font-style:normal;font-size:10px}.steps .current,.steps .done{color:#315d4c}.steps .current i,.steps .done i{background:#173d39;border-color:#173d39;color:white}.steps b{height:1px;background:#e3e9e5;flex:1;margin:0 12px}.fields{display:grid;grid-template-columns:1fr 1fr;gap:18px 16px;min-height:242px}.fields label{display:grid;align-content:start;gap:7px;font-size:11px;font-weight:700;color:#52635b}.fields input,.fields select,.fields textarea{width:100%;min-height:40px;border:1px solid #dce5df;border-radius:4px;padding:9px 10px;background:white;color:#30413b;font:12px inherit;outline:0}.fields input:focus,.fields select:focus,.fields textarea:focus{border-color:#6c9784;box-shadow:0 0 0 3px #477d6c16}.fields input[readonly]{background:#f2f5f2;color:#718078}.fields .full{grid-column:1/-1}.fields small{color:#b4433b;font-size:10px;font-weight:400}.review{min-height:242px;padding:12px 4px}.review h2{font:400 29px Georgia,serif;margin:0 0 5px}.review>p:not(.eyebrow){font-size:12px;color:#7f8d85;margin:0 0 22px}.review div{max-width:520px;display:grid;grid-template-columns:150px 1fr;gap:13px;font-size:11px}.review div span{color:#839088}.review div strong{font-weight:600}.form-panel footer{height:72px;border-top:1px solid #edf1ee;margin-top:20px;display:flex;align-items:center;gap:9px}.spacer{flex:1}.cancel,.outline,.primary{height:36px;border-radius:4px;padding:0 13px;font-size:11px}.cancel{border:0;background:transparent;color:#7d8983}.outline{border:1px solid #d7e0da;background:#fff;color:#4e675b}.outline:disabled{opacity:.4}.primary{border:0;background:#173d39;color:#fff;display:flex;align-items:center;gap:8px;font-weight:700}.primary mat-icon{font-size:16px;width:16px;height:16px}@media(max-width:600px){.form-panel{padding:20px 15px 0}.fields{grid-template-columns:1fr;gap:14px}.fields .full{grid-column:auto}.steps{max-width:100%;justify-content:space-between}.steps b{margin:0 5px}.steps>div{gap:5px;font-size:10px}.steps i{width:23px;height:23px}.form-head h1{font-size:31px}}
  `]
})
export class StudentFormPage {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly service = inject(StudentService);
  readonly courses = COURSES;
  readonly statuses = STATUSES;
  readonly today = new Date().toISOString().slice(0, 10);
  readonly id = this.route.snapshot.paramMap.get('id');
  readonly editing = !!this.id;
  readonly original = this.id ? this.service.find(this.id) : undefined;
  step = 1;
  form = this.fb.nonNullable.group({ name: [this.original?.name ?? '', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[\p{L} ]+$/u)]], email: [this.original?.email ?? '', [Validators.required, Validators.email]], phone: [this.original?.phone ?? '', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]], gender: [this.original?.gender ?? '', Validators.required], dob: [this.original?.dateOfBirth ?? '', [Validators.required, (control: AbstractControl): ValidationErrors | null => { const date = new Date(control.value); const adultDate = new Date(); adultDate.setFullYear(adultDate.getFullYear() - 18); return date <= adultDate && date <= new Date() ? null : { underage: true }; }]], address: [this.original?.address ?? '', Validators.required], course: [this.original?.course ?? '', Validators.required], department: [this.original?.department ?? ''], admissionDate: [this.original?.admissionDate ?? this.today, Validators.required], fee: [this.original?.fee ?? 1, [Validators.required, Validators.min(0.01)]], marks: [this.original?.marks ?? 0, [Validators.min(0), Validators.max(100)]], attendance: [this.original?.attendance ?? 0, [Validators.min(0), Validators.max(100)]], status: [(this.original?.status ?? 'Applied') as StudentStatus, Validators.required] });

  constructor() { if (!this.original && this.editing) void this.router.navigate(['/students']); }
  showError(field: string): boolean { const control = this.form.get(field); return !!control && control.touched && control.invalid; }
  setDepartment(): void { this.form.controls.department.setValue(departmentFor(this.form.controls.course.value)); }
  next(): void {
    const controls = this.step === 1 ? ['name', 'email', 'phone', 'gender', 'dob', 'address'] : ['course', 'admissionDate', 'fee', 'marks', 'attendance', 'status'];
    controls.forEach(field => this.form.get(field)?.markAsTouched());
    if (controls.some(field => this.form.get(field)?.invalid)) return;
    this.step = Math.min(3, this.step + 1);
  }
  cancel(): void { if (this.form.dirty && !window.confirm('You have unsaved changes. Leave this form?')) return; this.form.markAsPristine(); void this.router.navigate(['/students']); }
  canLeave(): boolean { return !this.form.dirty || window.confirm('You have unsaved changes. Leave this form?'); }
  save(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const values = this.form.getRawValue();
    const studentData = { name: values.name, email: values.email, phone: values.phone, gender: values.gender, dateOfBirth: values.dob, address: values.address, course: values.course, department: values.department, admissionDate: values.admissionDate, fee: Number(values.fee), marks: Number(values.marks), attendance: Number(values.attendance), status: values.status };
    if (this.original) this.service.update({ ...this.original, ...studentData }); else this.service.add(studentData);
    this.form.markAsPristine();
    void this.router.navigate(['/students'], { queryParams: { notice: this.editing ? 'updated' : 'added' } });
  }
}

export const unsavedChangesGuard: CanDeactivateFn<StudentFormPage> = component => component.canLeave();