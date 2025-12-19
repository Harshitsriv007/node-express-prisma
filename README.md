# Express-Prisma Backend API

A production‑ready **Node.js + Express** backend using **Prisma ORM with MongoDB (Replica Set)**. Includes clean architecture, service layer, logging middleware, global error handling, and Prisma best practices.

---

## ✨ Features

* Node.js + Express REST API
* Prisma ORM with MongoDB
* MongoDB Replica Set (required by Prisma)
* Clean MVC + Service architecture
* Centralized error handling middleware
* Custom `AppError` class
* Logging middleware
* Async/await with proper error propagation
* Ready for production & scaling

---

## 🧱 Tech Stack

* **Node.js**
* **Express.js**
* **Prisma ORM**
* **MongoDB (Replica Set)**
* **Mongoose NOT used** (Prisma only)

---

## 📁 Project Structure

```
src/
 ├── controllers/
 │    └── index.controller.js
 ├── services/
 │    └── index.service.js
 ├── routes/
 │    └── index.routes.js
 ├── middleware/
 │    ├── logger.middleware.js
 │    └── error.middleware.js
 ├── utils/
 │    └── AppError.js
 ├── config/
 │    └── db.js
 ├── app.js
 └── server.js

prisma/
 └── mongo/
      └── schema.prisma
```

---

## ⚙️ Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Harshitsriv007/node-express-prisma
cd todoapp
```

### 2️⃣ Install Dependencies

```bash
npm install
```

---

## 🗄 MongoDB Setup (IMPORTANT)

Prisma **requires MongoDB Replica Set**, even for local development.

### Option A: Homebrew (macOS)

```bash
brew tap mongodb/brew
brew install mongodb-community@7.0
```

Edit MongoDB config:

```bash
nano /opt/homebrew/etc/mongod.conf
```

Add:

```yaml
replication:
  replSetName: rs0
```

Start MongoDB:

```bash
brew services start mongodb-community@7.0
```

Initialize replica set:

```bash
mongosh
rs.initiate()
```

---

### Option B: Docker (Recommended)

```bash
docker run -d \
  -p 27017:27017 \
  --name mongo-rs \
  mongo --replSet rs0
```

```bash
docker exec -it mongo-rs mongosh
rs.initiate()
```

---

## 🔐 Environment Variables

Create `.env` file:

```env
DATABASE_URL="mongodb://localhost:27017/todoapp?replicaSet=rs0"
PORT=3000
```

---

## 🧬 Prisma Setup

### Generate Prisma Client

```bash
npx prisma generate --schema=prisma/mongo/schema.prisma
```

### Prisma Schema

```prisma
model User {
  id    String @id @default(auto()) @map("_id") @db.ObjectId
  email String @unique
  name  String
  posts Post[]
}

model Post {
  id        String  @id @default(auto()) @map("_id") @db.ObjectId
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  String  @db.ObjectId
}
```

---

## 🚀 Run Application

```bash
npm run dev
# or
node src/server.js
```

---

## 🔄 API Endpoints

### ➕ Create User

```http
POST /api/v1/users
```

```json
{
  "email": "john@example.com",
  "name": "John Doe"
}
```

---
### 📥 Protected Sign Users

```http
GET /api/v1/auth/signup
```
### 📥 Protected Login Users

```http
GET /api/v1/auth/login
```

### 📥 Get All Users

```http
GET /api/v1/users
Authorization: Bearer <JWT_TOKEN>
```

---

### ✏️ Update User

```http
PUT /api/v1/users/:id
Authorization: Bearer <JWT_TOKEN>
```

```json
{
  "name": "Updated Name"
}
```

---

### ❌ Delete User

```http
DELETE /api/v1/users/:id
Authorization: Bearer <JWT_TOKEN>
```

---

## 🧠 Error Handling Strategy

### Custom Error Class

```js
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
```

### Global Error Middleware

```js
const errorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
};
```

---

## 📝 Logging Middleware

```js
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
};
```

---

## 🛑 Common Errors & Fixes

| Error               | Fix                    |
| ------------------- | ---------------------- |
| ECONNREFUSED        | MongoDB not running    |
| ReplicaSetNoPrimary | Run `rs.initiate()`    |
| P2002               | Duplicate unique field |
| P2025               | Record not found       |

---

## 🏆 Best Practices Used

* Service layer abstraction
* Centralized error handling
* Clean controller logic
* Prisma relations via `connect`
* No business logic in routes

---

## 📌 Future Enhancements

* Role‑based authorization
* Pagination & filtering
* Swagger API docs
* Unit & integration tests

---

## 👨‍💻 Author

**Siddharth Roy Kapoor**
Backend Engineer | Node.js | Prisma | MongoDB

---

## ⭐ Support

If this project helped you, give it a ⭐ and feel free to contribute.

---

Happy Coding 🚀
