# StudentManagementSystem

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.32.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

# Student Management System

A responsive, frontend-only student management dashboard built with Angular 20, Angular Material, and Bootstrap 5. Student records and authentication are held in memory; no API, database, or browser storage is used.

This is the initial working implementation of the larger project brief. The primary login, dashboard, student CRUD, filtering, and form workflows are available; the scope notes below call out features that remain simplified or planned.

## Requirements

- Node.js 20.19 or later and npm
- Angular CLI 20 (optional; npm scripts use the local CLI)

## Run locally

```bash
npm install
npm start
```

Open `http://localhost:4200/`. Demo sign-in: `admin` / `admin123`.

Create an optimized build with `npm run build`. Build output is written to `dist/student-management-system/`.

## Current features

- In-memory sign-in and registration, protected routes, logout, and a demo administrator account
- Dashboard totals and student status counts with links to filtered student lists
- Five sample student profiles, with add, view, edit, and delete actions
- Student search by name or email; status and course filters; name/admission-date sorting; pagination
- Student details drawer with personal, academic, and contact information
- Three-step student form with validation, course-to-department mapping, and unsaved-change confirmation
- About page and responsive navigation/layout
- Angular Material theme/icons and Bootstrap styles

## Data and authentication

This is a demonstration frontend, not a secure authentication system. Accounts, passwords, and student records exist only in memory. A browser refresh resets the session and student changes; logging out also resets student data. Do not use real personal information or credentials.

## Scope notes

The initial version implements the primary dashboard and student-management flow, not every item in the full project specification. Add and edit currently both use Reactive Forms. Registration does not yet include email/password confirmation. Search, filters, sorting, pagination, and confirmations are client-side; department filtering, fee sorting, mobile-specific student cards, snackbar/dialog components, and automated tests are not implemented. Student data is not persisted between sessions.
