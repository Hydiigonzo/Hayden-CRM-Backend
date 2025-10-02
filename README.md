# Basic CRM Backend with JWT Authentication

## Overview

This project is a backend implementation of a basic CRM system using NestJS, Prisma, and JWT for authentication.  
It supports user management and CRUD operations for Companies, Contacts, and Deals with relationship mapping, pagination, and sorting.

## Features

- User registration and login (JWT)
- Secured CRUD for Companies, Contacts, Deals
- Pagination & sorting (query params: `page`, `limit`, `sortField`, `sortOrder`)
- Full entity relationship support
- Authenticated access for all endpoints (except `/auth/register` and `/auth/login`)

## Getting Started

### 1. Clone the project

```bash
git clone <REPO_URL>
cd <project-directory>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Prepare your environment variables

Copy `.env.example` to `.env` and set:

```
DATABASE_URL=your_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Prepare the database

```bash
npx prisma migrate dev
npx prisma generate
```

### 5. Start the server

```bash
npm run start:dev
```

## Prisma Schema

This project uses [Prisma ORM](https://www.prisma.io/) to manage database access and schema migrations.

The Prisma schema file (`prisma/schema.prisma`) defines your database connection and data models, describing the shape of your data and relationships.

### Key Points

- **Datasource:** Defines the type of database and connection URL (here, using SQLite with the `DATABASE_URL` environment variable).

- **Generator:** Configures Prisma Client generation for type-safe database querying.

- **Models:** Represent tables with fields and relations.  
  For example:
  - `User`: Stores user credentials and timestamps.
  - `Company`, `Contact`, `Deal`: Business entities with relationships.
  - Join tables like `ContactCompany` and `DealContact` implement many-to-many relationships.

### Example Snippet from `schema.prisma`

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Company {
  id       Int              @id @default(autoincrement())
  name     String
  contacts ContactCompany[]
  deals    Deal[]
}

// ... additional models for Contact, Deal, ContactCompany, DealContact
```

### Learn More

- Full Prisma Schema documentation: [https://pris.ly/d/prisma-schema](https://pris.ly/d/prisma-schema)

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
 -Swagger UI is available at http://localhost:3000/api for easy API exploration and testing, including JWT-authenticated routes.

