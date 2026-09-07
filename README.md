# 🎮 Arcade Stream Backend API - A Stream Database(MERN) Platform

A scalable and production-ready backend API built using **Node.js, Express.js, MongoDB, and Mongoose** for managing and analyzing the **Steam Games Dataset**.

The project provides powerful CRUD operations, authentication, filtering, searching, pagination, sorting, analytics, and aggregation features following a clean **MVC Architecture**.

---

# 📌 Project Information

**Project Name:** Arcade Stream Backend API  
**Repository:** *https://github.com/Anisha-Chhajer-Jain/a_steam_data_anisha_chhajer/tree/main*  
**Backend Stack:** Node.js, Express.js, MongoDB, Mongoose  
**Package Manager:** npm  
**Deployment Target:** Render  
**Architecture:** MVC (Model View Controller)

### Live Links

**Frontend Console:** [Arcade Stream Frontend](https://arcade-game-xi.vercel.app/dashboard)
<!-- **Backend :** *Your Deployment URL*   -->
**Postman Documentation:** [Arcade Stream Postman Docs](https://documenter.getpostman.com/view/50840681/2sBXwpMBLs)

**Dataset:** https://drive.google.com/file/d/1mNxlDr1ZGAohCsFxMtZowDZln4i-ZRmi/view

---


## 📌 Overview

**Arcade Stream** is a backend application inspired by digital game distribution platforms like **Steam**, designed to provide a seamless game discovery and management experience. Similar to how users browse movies and TV shows on Netflix, Arcade Stream offers a **Netflix-like browsing experience for games**, allowing users to search, filter, sort, and explore a large collection of Steam games through fast and secure RESTful APIs.

The API enables users to discover games based on genres, developers, publishers, release years, and price ranges while supporting efficient data retrieval through optimized database queries. It also leverages **MongoDB Aggregation Pipelines** to generate valuable insights, including genre distribution, average game prices, top developers, publisher statistics, and release year trends.

---

## 🌐 What is the Problem?

The gaming industry has grown tremendously over the past decade. Steam alone hosts tens of thousands of games. When datasets become this large, several challenges arise:
- How do users quickly find the game they're looking for?
- How can they filter games based on genre, release year, or price?
- How do developers retrieve only the required information without loading the entire dataset?
- How can businesses analyze trends like the most popular genres or top publishers?

Without an optimized backend, applications become slow, difficult to maintain, and challenging to scale. That is exactly the problem **Arcade Stream** aims to solve.

---

## ⚡ Our Solution & Core Features

Arcade Stream provides a complete backend infrastructure for managing Steam game data, transforming raw game information into meaningful insights.

- **Authentication**: JWT-based stateless authentication with secure bcrypt password hashing. Protected APIs require valid authentication.
- **CRUD Operations**: Secure endpoints for Admins to Create, Read, Update, and Delete games.
- **Search Functionality**: Efficiently search thousands of games by keyword (e.g., *Elden, Minecraft, Counter Strike*).
- **Advanced Filtering**: Filter by Genre, Price, Developer, Publisher, Release Year, and Free-to-play games (e.g., *Action games under ₹1000 released after 2020*).
- **Sorting**: Order results by Price, Release Date, Ratings, and Alphabetically to improve user experience.
- **Pagination**: Returns a bounded subset of records (e.g., 10 games per page) to reduce response size and improve performance.
- **Robust Analytics**: Complex MongoDB aggregation pipelines that compute genre distribution, developer stats, average game price, release year trends, and popular publishers.
- **Security**: JWT, password hashing, Helmet, Rate Limiting, Input Validation, Environment Variables, and Global Error Handling.



# 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| Express.js | Backend Framework |
| MongoDB | NoSQL Database |
| Mongoose | ODM for MongoDB |
| JWT | Authentication |
| bcryptjs | Password Hashing |
| dotenv | Environment Variables |
| cors | Cross-Origin Requests |
| morgan | Request Logging |
| helmet | Security Middleware |

---

# 📂 Project Structure

```text
arcade-stream-backend/
│
├── README.md
│
├── server/
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   │
│   └── src/
│       ├── app.js
│       ├── server.js
│       │
│       ├── config/
│       │   ├── db.js
│       │   └── env.js
│       │
│       ├── controllers/
│       │   ├── auth.controller.js
│       │   ├── game.controller.js
│       │   ├── analytics.controller.js
│       │   ├── stats.controller.js
│       │   ├── search.controller.js
│       │   └── system.controller.js
│       │
│       ├── services/
│       │   ├── auth.service.js
│       │   ├── game.service.js
│       │   ├── analytics.service.js
│       │   ├── stats.service.js
│       │   └── search.service.js
│       │
│       ├── models/
│       │   ├── Game.js
│       │   └── User.js
│       │
│       ├── routes/
│       │   ├── auth.routes.js
│       │   ├── game.routes.js
│       │   ├── analytics.routes.js
│       │   ├── stats.routes.js
│       │   ├── search.routes.js
│       │   └── protected.routes.js
│       │
│       ├── middlewares/
│       │   ├── auth.middleware.js
│       │   ├── error.middleware.js
│       │   ├── logger.middleware.js
│       │   ├── rateLimiter.middleware.js
│       │   └── validate.middleware.js
│       │
│       ├── scripts/
│       │   └── import-data.js
│       │
│       └── utils/
│           ├── apiResponse.js
│           ├── asyncHandler.js
│           ├── pagination.js
│           └── query.js
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone <https://github.com/Anisha-Chhajer-Jain/a_steam_data_anisha_chhajer/tree/main>
```

## 2️⃣ Navigate to Project Folder

```bash
cd arcade-stream-backend
```

## 3️⃣ Install Dependencies

```bash
npm install
```

## 4️⃣ Configure Environment Variables

Create a `.env` file inside the server folder.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key

JWT_REFRESH_SECRET=your_jwt_refresh_secret_key

NODE_ENV=development
```

If you are running MongoDB locally, you can set:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/steam_games
```

Make sure the MongoDB server is started before running the backend.

## 5️⃣ Run Development Server

```bash
npm run dev
```

---

# 🔐 Authentication System

The project uses JWT-based authentication.

## Authentication Features

- User Registration
- User Login
- Password Hashing
- JWT Token Generation
- Protected Routes
- Authorization Middleware

---

## 📊 Sample Game Document (Excerpt)

```json
{
  "appId": "1245620",
  "name": "Elden Ring",
  "releaseYear": 2022,
  "price": 3999,
  "genres": ["Action", "RPG"],
  "developers": ["FromSoftware Inc."],
  "publishers": ["Bandai Namco Entertainment", "FromSoftware Inc."],
  "ratings": {
    "positive": 450000,
    "negative": 50000
  },
  "platforms": ["windows"]
}
```

---

# 📡 API Features

## Game APIs

- Fetch all games
- Fetch single game
- Create game
- Update game
- Delete game
- Game analytics
- Genre filtering
- Price filtering

## Search APIs

- Search games
- Search by title
- Search by genre
- Fuzzy search
- Autocomplete

## Analytics APIs

- Genre distribution
- Price analysis
- Release year trends
- Developer analytics
- Publisher analytics

## Statistics APIs

- Total games count
- Average game price
- Most popular genres
- Top developers

---

# 🔍 Advanced Functionalities

## Filtering

Supports:

- Genre filtering
- Price range filtering
- Release year filtering
- Free-to-play games
- Developer filtering

### Example

```http
GET /api/v1/games?genre=Action
```

## Pagination

### Example

```http
GET /api/v1/games?page=1&limit=10
```

## Sorting

### Example

```http
GET /api/v1/games?sort=price
```

```http
GET /api/v1/games?sort=-release_year
```

## Search

### Example

```http
GET /api/v1/search/games?q=elden
```

---

# 🧩 Middleware System

## Implemented Middlewares

- Authentication Middleware
- Error Handling Middleware
- Logger Middleware
- Request Validation Middleware
- CORS Middleware
- Rate Limiter Middleware

---

## 🔬 MongoDB Aggregation Pipelines

Arcade Stream uses MongoDB Aggregation Pipelines to analyze data without loading it all into memory. These analytics are generated directly inside MongoDB, making them efficient and scalable.

Examples include:
- **Genre Distribution**: `How many games belong to each genre?` (`$unwind` genres, `$group` by genre, `$sum` count)
- **Developer Statistics**: `Which developers have released the most games?`
- **Average game price** and **Release year trends**.

---

## 🧪 Postman Testing Guide

Comprehensive Postman documentation is available:  
📖 **[Arcade Stream Postman Docs](https://documenter.getpostman.com/view/50840681/2sBXwpMBLs)**

### 📈 API Endpoint Overview
- **Authentication**: `POST /auth/register`, `POST /auth/login`
- **Games (CRUD)**: `GET /games`, `POST /games`, `PUT /games/:id`, `DELETE /games/:id`
- **Search**: `GET /search?q=elden`
- **Filters**: `GET /games?genre=Action`
- **Pagination**: `GET /games?page=2&limit=20`
- **Analytics**: `GET /analytics/genre`

---

# 🛡️ Security Features

- JWT Authentication
- Password Hashing
- Protected Routes
- Environment Variable Protection
- Input Validation
- Rate Limiting
- Secure Middleware Setup

---

# 🌐 Deployment

Backend deployment target:

**Render**

---

# 📖 Environment Variables

| Variable | Description |
|-----------|------------|
| PORT | Server Port |
| MONGODB_URI | MongoDB Connection String |
| JWT_SECRET | JWT Secret Key |
| JWT_REFRESH_SECRET | Refresh Token Secret |
| NODE_ENV | Environment Mode |

---

# 🧠 Learning Objectives

This project demonstrates understanding of:

- Backend Development
- REST API Design
- MongoDB Data Modeling
- Authentication & Authorization
- MVC Architecture
- Aggregation Pipelines
- Middleware Design
- Error Handling
- API Optimization
- Scalable Backend Structure

---

# 📌 Future Improvements

- Redis Caching
- Swagger Documentation
- Docker Support
- WebSocket Integration
- Advanced Recommendation Engine
- AI-based Game Analytics
- CI/CD Pipeline

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

### Steps

1. Fork the repository
2. Create a new branch
3. Commit changes
4. Push changes
5. Create a Pull Request

---

# 📄 License

This project is developed for educational and academic purposes.

---

# 👨‍💻 Author

**Anisha Chhajer**

GitHub: https://github.com/Anisha-Chhajer-Jain

---

# ⭐ Project Status

🚧 Backend Development In Progress | Steam Games Analytics & Management API 🎮
