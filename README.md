# 🎮 Arcade Stream Backend API

A scalable and production-ready backend API built using **Node.js, Express.js, MongoDB, and Mongoose** for managing and analyzing the **Steam Games Dataset**.

The project provides powerful CRUD operations, authentication, filtering, searching, pagination, sorting, analytics, and aggregation features following a clean **MVC Architecture**.

---

# 📌 Project Information

**Project Name:** Arcade Stream Backend API  
**Repository:** *Your GitHub Repository URL*  
**Backend Stack:** Node.js, Express.js, MongoDB, Mongoose  
**Package Manager:** npm  
**Deployment Target:** Render  
**Architecture:** MVC (Model View Controller)

### Live Links

**Backend Health Check:** *Your Deployment URL*  
**Postman Documentation:** *Your Postman Collection URL*  
**Dataset:** https://drive.google.com/file/d/1mNxlDr1ZGAohCsFxMtZowDZln4i-ZRmi/view

---

# 🚀 Features

## Core Features

- RESTful API Architecture
- MongoDB Database Integration
- Mongoose Schema Modeling
- CRUD Operations
- Pagination
- Filtering
- Sorting
- Search Functionality
- JWT Authentication
- Protected Routes
- Global Error Handling
- Middleware Architecture
- Aggregation Pipelines
- Scalable Folder Structure
- Environment Variable Configuration
- API Testing with Postman

---

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
git clone <your-repository-url>
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

# 📊 Database Design

## Main Collections

### Games Collection

Stores:

- App ID
- Game Name
- Release Year
- Price
- Genres
- Developers
- Publishers
- Ratings
- Reviews
- Supported Platforms

### Users Collection

Stores:

- Authentication Data
- User Roles
- Profile Information
- Saved Games
- Preferences

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

# 📈 Aggregation Pipelines

MongoDB Aggregation Framework is used for:

- Genre Distribution Analysis
- Price Distribution
- Developer Statistics
- Publisher Statistics
- Release Year Trends
- Popular Games Analytics

---

# 🧪 API Testing

API testing is done using **Postman**.

## Postman Collection Includes

- Authentication APIs
- Game APIs
- Search APIs
- Analytics APIs
- Statistics APIs

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

GitHub: https://github.com/your-github-username

---

# ⭐ Project Status

🚧 Backend Development In Progress | Steam Games Analytics & Management API 🎮
