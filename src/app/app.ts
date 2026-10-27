import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './core/auth.service';
import { StudentService } from './core/student.service';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, MatIconModule],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.css'
})
export class App {
  readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly students = inject(StudentService);

  logout(): void {
    this.auth.logout();
    this.students.reset();
    void this.router.navigate(['/login']);
  }
}
