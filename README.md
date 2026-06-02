# Arcade Stream Backend API

A production-ready backend API built using Node.js, Express.js, and MongoDB for managing the Steam Games dataset.

This project provides:

- RESTful APIs
- CRUD Operations
- Authentication using JWT
- Filtering, Searching, Pagination & Sorting
- Aggregation & Analytics APIs
- Middleware-based architecture
- Scalable MVC folder structure

## 🚀 Tech Stack

| Technology | Usage |
| :--- | :--- |
| Node.js | Backend Runtime |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcrypt | Password Hashing |
| dotenv | Environment Variables |
| cors | Cross-Origin Requests |

## 📁 Project Structure

```text
project-root/
│
├── config/
│   └── db.js
│
├── controllers/
│
├── services/
│
├── models/
│
├── routes/
│
├── middlewares/
│
├── utils/
│
├── .env
├── server.js
├── package.json
└── README.md
```

## 📌 Features

### ✅ Core Backend Features
- RESTful API architecture
- MongoDB integration using Mongoose
- MVC architecture
- Modular and scalable backend structure
- Environment variable configuration

### ✅ CRUD Operations

| Feature | Status |
| :--- | :--- |
| Create Game | ✅ |
| Fetch All Games | ✅ |
| Fetch Game By ID | ✅ |
| Update Game | ✅ |
| Delete Game | ✅ |

### ✅ Advanced Query Features
- Filtering
- Searching
- Pagination
- Sorting
- Dynamic query building

### ✅ Authentication Features
- User Registration
- User Login
- JWT Token Generation
- Protected Routes
- Password Hashing using bcrypt

### ✅ Middleware Features
- Authentication Middleware
- Logger Middleware
- Error Handling Middleware
- Rate Limiting Middleware

### ✅ Analytics & Aggregation
- Game Statistics
- Genre Analysis
- Developer/Publisher Analysis
- Aggregation Pipelines

## 🗄️ Dataset Structure 

```json
{
  "appid": "3057270",
  "name": "Seafarer's Gambit",
  "release_year": 2024,
  "price": 3.99
}
```

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone <your-repository-url>
```

### 2️⃣ Navigate to Project Directory
```bash
cd project-name
```

### 3️⃣ Install Dependencies
```bash
npm install
```

### 4️⃣ Configure Environment Variables
Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

If you are running MongoDB locally, you can set:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/steam_games
```

Make sure the MongoDB server is started before running the backend.

### 5️⃣ Start Development Server
**Development Mode**
```bash
npm run dev
```

**Production Mode**
```bash
npm start
```

## 🔗 API Endpoints

### 📂 Core Game Routes
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/api/v1/games` | Fetch all Steam games (supports pagination, filtering, sorting) |
| GET | `/api/v1/games/:appid` | Fetch details of a specific game |
| POST | `/api/v1/games` | Create a new game |
| PATCH | `/api/v1/games/:appid` | Update game details |
| DELETE | `/api/v1/games/:appid` | Delete a game |

### 🔍 Search & Filtering Examples
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/api/v1/games?genre=action` | Filter by genre |
| GET | `/api/v1/search/games?q=elden` | Search games by title |
| GET | `/api/v1/games?page=1&limit=10` | Fetch paginated results |
| GET | `/api/v1/games?sort=price` | Sort by price |

### 📊 Analytics & Stats
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/api/v1/analytics/games/genre-distribution` | Analyze genre distribution |
| GET | `/api/v1/stats/games/count` | Total game count |

### 🔐 Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/api/v1/auth/register` | Register new user |
| POST | `/api/v1/auth/login` | Login existing user |

## 🛡️ Security Features
- JWT Authentication
- Password Hashing
- Protected Routes
- Input Validation
- Global Error Handling
- Rate Limiting

## ⚡ Middleware Used

| Middleware | Purpose |
| :--- | :--- |
| Authentication Middleware | Protect private routes |
| Logger Middleware | Log incoming requests |
| Error Handling Middleware | Handle application errors |
| Rate Limiting Middleware | Prevent API abuse |

## 📦 MongoDB Features Used
- Schema Validation
- Indexing
- Aggregation Pipeline
- Dynamic Querying
- Pagination
- Projection
- Sorting

## 🧪 API Testing
API testing was performed using:
- **Postman** (Postman collection is included in the project.)

## 🧠 Learning Outcomes
This project demonstrates understanding of:
- REST API Development
- MongoDB & Mongoose
- MVC Architecture
- Authentication & Authorization
- Middleware System
- Aggregation Framework
- Backend Scalability Concepts
- Error Handling
- API Optimization

## 🚀 Future Improvements
- Swagger Documentation
- Redis Caching
- Docker Deployment
- Unit Testing
- CI/CD Integration

## 👨‍💻 Author & Contributor
- **Anisha Chhajer**

Developed as part of the Full Stack Backend Project Assignment – 2026