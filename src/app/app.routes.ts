import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { AboutPage } from './features/about/about-page';
import { AuthPage } from './features/auth/auth-page';
import { DashboardPage } from './features/dashboard/dashboard-page';
import { StudentFormPage, unsavedChangesGuard } from './features/students/student-form-page';
import { StudentListPage } from './features/students/student-list-page';

export const routes: Routes = [
	{ path: 'login', component: AuthPage },
	{ path: 'dashboard', component: DashboardPage, canActivate: [authGuard] },
	{ path: 'students', component: StudentListPage, canActivate: [authGuard] },
	{ path: 'students/new', component: StudentFormPage, canActivate: [authGuard], canDeactivate: [unsavedChangesGuard] },
	{ path: 'students/:id/edit', component: StudentFormPage, canActivate: [authGuard], canDeactivate: [unsavedChangesGuard] },
	{ path: 'about', component: AboutPage, canActivate: [authGuard] },
	{ path: '', pathMatch: 'full', redirectTo: 'dashboard' },
	{ path: '**', redirectTo: 'dashboard' }
];
