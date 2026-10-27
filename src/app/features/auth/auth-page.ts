import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <main class="auth-page">
      <section class="auth-art"><div class="auth-mark">C<span>/</span>D</div><p class="eyebrow">CAMPUS OPERATIONS</p><h1>Every student,<br>in good hands.</h1><p class="auth-copy">A clearer view of your campus, from first application to graduation.</p><div class="auth-note">STUDENT MANAGEMENT SYSTEM <span>•</span> 2026</div></section>
      <section class="auth-panel"><div class="auth-form-wrap"><p class="eyebrow">WELCOME TO CAMPUS DESK</p><h2>{{ registering ? 'Create your account' : 'Sign in to continue' }}</h2><p class="auth-sub">{{ registering ? 'Set up your administrator profile.' : 'Your student workspace is ready.' }}</p>
        <div class="auth-tabs"><button type="button" [class.selected]="!registering" (click)="setMode(false)">Sign in</button><button type="button" [class.selected]="registering" (click)="setMode(true)">Register</button></div>
        <form [formGroup]="form" (ngSubmit)="submit()">
          @if (registering) { <label>Full name<input formControlName="name" placeholder="Your name"></label> }
          <label>Username<input formControlName="username" placeholder="Enter your username" autocomplete="username"></label>
          <label>Password<input type="password" formControlName="password" placeholder="At least 6 characters" autocomplete="current-password"></label>
          @if (error) { <p class="auth-error" role="alert">{{ error }}</p> }
          <button class="auth-submit" type="submit">{{ registering ? 'Create account' : 'Sign in' }} <span>→</span></button>
        </form>
        @if (!registering) { <p class="demo-hint">Demo access: <strong>admin</strong> / <strong>admin123</strong></p> }
      </div></section>
    </main>`,
  styles: [`
    :host{display:block;min-height:100vh}.auth-page{min-height:100vh;display:grid;grid-template-columns:1.03fr .97fr;background:#fff}.auth-art{position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:center;padding:9vw;color:#f5f5ec;background:#173d39}.auth-art:after{content:"";position:absolute;width:480px;height:480px;border:1px solid #ffffff20;border-radius:50%;right:-180px;bottom:-180px;box-shadow:0 0 0 42px #ffffff09,0 0 0 90px #ffffff06}.auth-mark{position:absolute;top:42px;left:48px;font-size:20px;font-weight:800;letter-spacing:1px}.auth-mark span{color:#d5e96b}.eyebrow{margin:0 0 20px;font-size:10px;letter-spacing:1.8px;font-weight:700;color:#94b5aa}.auth-art h1{margin:0;font-family:Georgia,serif;font-size:clamp(44px,5.2vw,76px);line-height:1.02;font-weight:400;letter-spacing:0}.auth-copy{max-width:350px;margin-top:24px;color:#b6cbc3;font-size:15px;line-height:1.7}.auth-note{position:absolute;bottom:34px;font-size:9px;letter-spacing:1.4px;color:#91aaa2}.auth-note span{color:#d5e96b;margin:0 8px}.auth-panel{display:grid;place-items:center;padding:40px}.auth-form-wrap{width:min(100%,390px)}.auth-form-wrap h2{font-family:Georgia,serif;font-size:34px;font-weight:400;letter-spacing:0;margin:0;color:#1d302b}.auth-sub{color:#7d8984;font-size:13px;margin:10px 0 30px}.auth-tabs{height:42px;display:flex;border-bottom:1px solid #e4eae6;margin-bottom:24px}.auth-tabs button{width:50%;background:none;border:0;border-bottom:2px solid transparent;color:#89958f;font-size:13px}.auth-tabs button.selected{border-color:#173d39;color:#173d39;font-weight:700}.auth-form-wrap form{display:grid;gap:17px}.auth-form-wrap label{display:grid;gap:7px;font-size:11px;font-weight:700;color:#50615b}.auth-form-wrap input{height:44px;border:1px solid #dce4df;border-radius:4px;padding:0 12px;font:13px inherit;color:#23332e;outline:none}.auth-form-wrap input:focus{border-color:#477d6c;box-shadow:0 0 0 3px #477d6c18}.auth-submit{height:46px;margin-top:5px;border:0;border-radius:4px;background:#173d39;color:white;font-size:13px;font-weight:700;text-align:left;padding:0 16px}.auth-submit span{float:right;color:#d5e96b;font-size:18px}.auth-error{margin:0;color:#b4433b;font-size:12px}.demo-hint{margin-top:20px;color:#84918a;font-size:11px}.demo-hint strong{color:#345e52}@media(max-width:720px){.auth-page{grid-template-columns:1fr}.auth-art{min-height:270px;padding:36px}.auth-mark{top:24px;left:28px}.auth-art h1{font-size:44px}.auth-copy{margin-top:14px;font-size:13px}.auth-note{display:none}.auth-panel{padding:42px 26px}}
  `]
})
export class AuthPage {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  registering = false;
  error = '';
  form = this.fb.nonNullable.group({ name: [''], username: ['', [Validators.required, Validators.minLength(3)]], password: ['', [Validators.required, Validators.minLength(6)]] });

  setMode(registering: boolean): void { this.registering = registering; this.error = ''; }

  submit(): void {
    if (this.form.controls.username.invalid || this.form.controls.password.invalid || (this.registering && !this.form.controls.name.value.trim())) {
      this.form.markAllAsTouched();
      this.error = this.registering && !this.form.controls.name.value.trim() ? 'Enter your full name to register.' : 'Enter a valid username and password.';
      return;
    }
    const { name, username, password } = this.form.getRawValue();
    const success = this.registering ? this.auth.register(name, username, password) : this.auth.login(username, password);
    if (!success) { this.error = this.registering ? 'That username is already in use.' : 'Username or password is incorrect.'; return; }
    void this.router.navigate(['/dashboard']);
  }
}