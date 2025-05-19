# 📚 Book Review API – Node.js + Express + MongoDB

A complete backend API for managing books and user reviews. This project covers RESTful design, JWT-based authentication, protected routes, and CRUD operations using MongoDB.

---

## 🔧 Tech Stack

- Node.js + Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- dotenv
- Postman (for testing)

---

## 📂 Project Structure

```
bookapi/
├── controllers/
│   ├── authController.js
│   ├── bookController.js
│   └── reviewController.js
├── models/
│   ├── User.js
│   ├── Book.js
│   └── Review.js
├── routes/
│   ├── authRoutes.js
│   ├── bookRoutes.js
│   └── reviewRoutes.js
├── middlewares/
│   └── auth.js
├── server.js
├── .env.example
└── README.md
```

---

## 🚀 Features

- 🔐 JWT-based user authentication
- 📚 Add, list, filter, search books
- 📝 Add one review per user per book
- ✏️ Update or delete your review
- ⭐ Average rating + paginated reviews per book

---

## 🌐 API Endpoints

### 📌 Auth Routes

| Method | Route        | Description                |
|--------|--------------|----------------------------|
| POST   | `/api/signup` | Register new user         |
| POST   | `/api/login`  | Login & get JWT token     |

> Add this header for protected routes:  
> `Authorization: Bearer <your_token>`

---

### 📌 Book Routes

| Method | Route                      | Description                               |
|--------|----------------------------|-------------------------------------------|
| GET    | `/api/books`               | Get all books (pagination, filter)        |
| GET    | `/api/books/:id`           | Get single book (avg rating + reviews)    |
| POST   | `/api/books`               | Add a book (auth required)                |
| GET    | `/api/books/search?query=` | Search books by title or author           |

---

### 📌 Review Routes

| Method | Route                             | Description                             |
|--------|-----------------------------------|-----------------------------------------|
| POST   | `/api/books/:id/reviews`          | Add a review (1 per user per book)      |
| PUT    | `/api/reviews/:id`                | Update your review                      |
| DELETE | `/api/reviews/:id`                | Delete your review                      |

---

## 🔐 Authentication

1. Register via `/api/signup`
2. Login via `/api/login` → copy the JWT
3. Add this header in Postman:
```
Authorization: Bearer <your_token>
```

---

## 📦 Setup Instructions

```bash
git clone https://github.com/yourusername/bookapi.git
cd bookapi
npm install
cp .env.example .env
# Fill your .env file
node server.js
```

---

## 🌐 Example Usage

### POST `/api/books`

```json
{
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "genre": "Fiction",
  "description": "A story about dreams and destiny."
}
```

### POST `/api/books/:id/reviews`

```json
{
  "rating": 5,
  "comment": "A must-read for dreamers!"
}
```

---

## 💼 Author

Built by **Akash Jadhav**  
For queries, connect via GitHub or LinkedIn.

---

## 📜 License

This project is open-source and free to use.
