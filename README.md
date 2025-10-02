# Basic CRM Backend with JWT Authentication

## Overview

This project is a backend implementation of a basic CRM system using NestJS, Prisma, and JWT for authentication.\  
It supports user management and CRUD operations for Companies, Contacts, and Deals with relationship mapping, pagination, and sorting.

## Features

- User registration and login (JWT)
- Secured CRUD for Companies, Contacts, Deals
- Pagination & sorting (query params: `page`, `limit`, `sortField`, `sortOrder`)
- Full entity relationship support
- Authenticated access for all endpoints (except `/auth/register` and `/auth/login`)

## Getting Started

### 1. Clone the project
```
git clone <REPO_URL>
cd <project-directory>
```

### 2. Install dependencies
```
npm install
```

### 3. Prepare your environment variables
Copy `.env.example` to `.env` and set:
```
DATABASE_URL=your_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Prepare the database
```
npx prisma migrate dev
npx prisma generate
```

### 5. Start the server
```
npm run start:dev
```

## API Usage

### Register
```
POST /auth/register
{
  "email": "user@example.com",
  "password": "mypassword"
}
```

### Login
```
POST /auth/login
{
  "email": "user@example.com",
  "password": "mypassword"
}
```
Copy `access_token` from the response and include in headers of all further requests:
```
Authorization: Bearer <access_token>
```

### Example: List Companies
```
GET /company?page=1&limit=10&sortField=name&sortOrder=asc
```
*Similar pattern applies to `/contact` and `/deal` endpoints.*

## Technologies

- NestJS
- Prisma ORM
- JWT Auth
- PostgreSQL/MySQL/SQLite

## Notes

- All endpoints except `/auth/register` and `/auth/login` require a JWT.
- Test endpoints with Postman or your preferred API tool using the JWT token.
