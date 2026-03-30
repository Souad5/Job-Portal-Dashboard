# 🚀 Job Portal Dashboard

A full-stack role-based Job Portal Dashboard built during my internship.
This application allows Admins and Recruiters to manage job postings efficiently with proper access control.

## 📌 Overview

This system is designed with role-based access control (RBAC) where:

Admin manages recruiters and all job posts
Recruiters can create and manage their own job posts

The goal of this project was to simulate a real-world dashboard system with authentication, authorization, and scalable frontend architecture.

# 🎯 Features

## 👤 Admin

Create and manage recruiters
View all job posts
Access recruiter management page

## 👨‍💼 Recruiter

Create job posts
View only their own jobs

## 🌐 General

Dashboard page
Profile page
Role-based route protection
Conditional UI rendering

## 🛠️ Tech Stack

Frontend
React
TypeScript
Context API (global state)
TanStack Query (data fetching & caching)
TanStack Table (data tables)
React Hook Form + Zod (form handling & validation)
Radix UI (modals)
React Toastify (notifications)
Backend
Express.js
JWT Authentication
Cookie-parser

## 🧱 Project Structure

The frontend is structured for scalability:

Pages
Dashboard
Jobs
Recruiters
Profile
Components
Reusable UI elements (tables, modals, forms)
Hooks
Custom hooks for logic reuse
Context
Authentication & role management

## 🔐 Authentication & Authorization

Implemented JWT-based authentication
Tokens are stored in cookies for secure session handling
Role-based access:
Admin:
Access all jobs
Manage recruiters
Recruiter:
Access only their own jobs
Key Implementation:
Protected routes
Conditional rendering based on role

👉 Implemented role-based route protection and conditional rendering

## 🗄️ Backend Functionality

RESTful API built with Express
Role-based endpoints
Secure authentication using JWT
Example APIs:
Create recruiter (Admin only)
Create job (Recruiter only)
Get jobs (filtered by user role)

## ⚔️ Challenges & Solutions

### 💥 1. Role-based Job Visibility

Challenge:
Ensuring recruiters can only see their own jobs while admin can see all

Solution:

Passed user role and ID from backend
Filtered jobs by recruiter ID
Allowed full access for admin

### 💥 2. Form Validation

Challenge:
Handling complex forms with proper validation

Solution:

Used React Hook Form for performance
Used Zod for schema-based validation

### 💥 3. API State Management

Challenge:
Managing loading, error, and caching states

Solution:

Used TanStack Query for efficient API handling

### 💥 4. Reusable Components

Challenge:
Avoiding code duplication in tables and modals

Solution:

Built reusable components using props
Applied composition patterns

## 🚀 Good Practices Followed

Type-safe development using TypeScript
Clean and modular component structure
Separation of concerns (API, UI, logic)
Reusable components
Proper error handling
Scalable form validation

## 📚 What I Learned

Designing role-based systems
Full-stack development workflow
State management and API handling
Writing clean and maintainable code

## 🔮 Future Improvements

Improve UI/UX design
Notification system
Role-based analytics dashboard

## 🙌 Conclusion

This project significantly improved my understanding of:

Role-based access control
Full-stack architecture
Modern React ecosystem

I’m open to feedback and continuously working to improve.

## 🤝 Acknowledgement

Built as part of my internship experience.

### ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub!
