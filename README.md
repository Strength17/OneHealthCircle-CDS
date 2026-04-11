# OHC-CDS: Multi-Platform Content Distribution System

A professional backend API for managing and distributing social media posts across multiple platforms (Facebook, LinkedIn, and Website) with centralized Supabase storage.

---

## 📋 Table of Contents

- [Architecture](#architecture)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Publishing Workflow](#publishing-workflow)
- [Setup & Installation](#setup--installation)
- [Environment Configuration](#environment-configuration)
- [Usage Examples](#usage-examples)
- [Technologies](#technologies)

---

## 🏗️ Architecture

The system follows a **3-layer MVC (Model-View-Controller) architecture**:

```
┌─────────────────────────────────────┐
│         Client Applications         │
│     (Frontend, Mobile, Scripts)     │
└────────────────┬────────────────────┘
                 │
         ┌───────▼────────┐
         │  Express API   │  (server.js)
         │   Port 5000    │
         └───────┬────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
┌───▼────┐ ┌────▼────┐ ┌────▼────┐
│ Routes │ │ CORS    │ │ JSON    │
│        │ │ Support │ │ Parser  │
└───┬────┘ └─────────┘ └─────────┘
    │
┌───▼──────────────────────┐
│  Controllers (posts.js)  │  Business Logic
│  - createPost()          │
│  - getPosts()            │
│  - publishPost()         │
└───┬──────────────────────┘
    │
┌───▼───────────────────┐
│  Services             │  Data Layer
│  (supabase.js)        │
│  - Database Access    │
└───┬───────────────────┘
    │
┌───▼──────────────────────┐
│   Supabase Platform      │
│   - PostgreSQL Database  │
│   - Storage & Auth       │
└──────────────────────────┘
    │
┌───▴──────────────────────────────────────┐
│   Distribution Integrations              │
│   - Facebook API                         │
│   - LinkedIn API                         │
│   - Internal Website Publisher           │
└──────────────────────────────────────────┘
```

---

## 📁 Folder Structure

```
OHC-CDS/
├── server.js                 # Main Express server entry point
├── package.json              # Project dependencies & scripts
├── .env                      # Environment variables (not in git)
├── .gitignore                # Git ignore rules
├── README.md                 # This file
│
├── routes/
│   └── posts.js              # API route definitions
│
├── controllers/
│   └── posts.js              # Business logic for posts
│
├── services/
│   └── supabase.js           # Supabase client initialization
│
└── [TO BE CREATED]
    ├── models/               # Database schema definitions
    ├── middleware/           # Authentication, validation, etc.
    └── utils/                # Helper functions
```

### File Responsibilities

| File | Purpose |
|------|---------|
| `server.js` | Initialize Express app, register routes, start server |
| `routes/posts.js` | Define REST endpoints (POST, GET, etc.) |
| `controllers/posts.js` | Handle request logic, call services |
| `services/supabase.js` | Manage Supabase client connection |

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000
```

### Endpoints

#### 1. **Health Check**
```http
GET /
```
**Response:**
```
API running...
```

---

#### 2. **Create Post (Draft)**
```http
POST /posts
Content-Type: application/json

{
  "title": "My Awesome Post",
  "content": "This is the content of my post",
  "platforms": ["facebook", "linkedin", "website"]
}
```

**Response (201 Created):**
```json
[
  {
    "id": 1,
    "title": "My Awesome Post",
    "content": "This is the content of my post",
    "platforms": ["facebook", "linkedin", "website"],
    "status": "draft",
    "created_at": "2026-04-10T12:34:56Z"
  }
]
```

---

#### 3. **Get All Posts**
```http
GET /posts
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Post Title",
    "content": "Post content...",
    "platforms": ["facebook", "linkedin"],
    "status": "draft",
    "created_at": "2026-04-10T12:34:56Z"
  },
  {
    "id": 2,
    "title": "Published Post",
    "content": "Already published content...",
    "platforms": ["website"],
    "status": "published",
    "created_at": "2026-04-09T10:20:30Z"
  }
]
```

---

#### 4. **Publish Post to Platforms**
```http
POST /posts/publish/:id
```

**Example:**
```http
POST /posts/publish/1
```

**Response (200 OK):**
```json
{
  "message": "Post published everywhere 🚀"
}
```

---

## 📤 Publishing Workflow

### Step-by-Step Publishing Process

```
1. User Creates Draft Post
   │
   ├─ POST /posts
   ├─ Stored in Supabase with status: "draft"
   └─ Returns post data with ID
        │
        ▼
2. User Requests Publication
   │
   ├─ POST /posts/publish/:id
   │
   ▼
3. System Retrieves Post Data
   │
   ├─ Fetch post from Supabase by ID
   ├─ Check target platforms
   │
   ▼
4. Distribute to Platforms
   │
   ├─ IF "facebook" → Send to Facebook API
   ├─ IF "linkedin" → Send to LinkedIn API
   ├─ IF "website" → Publish to internal website
   │
   ▼
5. Update Post Status
   │
   ├─ Set status: "published" in Supabase
   └─ Return success response
```

### Supported Platforms

- **Facebook**: Posts shared to Facebook pages/groups
- **LinkedIn**: Posts shared to LinkedIn feed
- **Website**: Posts published to internal website

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Supabase account with project created

### Installation Steps

1. **Clone and Navigate to Project**
```bash
cd OHC-CDS
```

2. **Install Dependencies**
```bash
npm install
```

3. **Install Development Tools**
```bash
npm install --save-dev nodemon
```

4. **Create Environment File**
```bash
# Create .env file in root directory
cp .env.example .env
```

5. **Configure Environment Variables** (see next section)

6. **Start Development Server**
```bash
npm run dev
```

Server will start on `http://localhost:5000` (or custom PORT in .env)

---

## ⚙️ Environment Configuration

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000

# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your-supabase-anon-key

# Optional Platform API Keys (for future integration)
# FACEBOOK_TOKEN=your_facebook_token
# LINKEDIN_TOKEN=your_linkedin_token
```

### Getting Supabase Credentials

1. Log in to [Supabase](https://supabase.com)
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → `SUPABASE_URL`
   - **Anon Key** → `SUPABASE_KEY`

---

## 📝 Usage Examples

### Example 1: Create and Publish a Post

```bash
# 1. Create a draft post
curl -X POST http://localhost:5000/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Product Launch",
    "content": "Excited to announce our new product!",
    "platforms": ["facebook", "linkedin", "website"]
  }'

# Response: { "id": 1, "status": "draft", ... }

# 2. Publish the post
curl -X POST http://localhost:5000/posts/publish/1

# Response: { "message": "Post published everywhere 🚀" }
```

### Example 2: Retrieve All Posts

```bash
curl -X GET http://localhost:5000/posts
```

### Example 3: Multi-Platform Post

```bash
curl -X POST http://localhost:5000/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "LinkedIn Professional Insight",
    "content": "Best practices for team collaboration...",
    "platforms": ["linkedin"]
  }'
```

---

## 🛠️ Technologies

| Technology | Purpose |
|-----------|---------|
| **Express.js** | Web framework for REST API |
| **Supabase** | PostgreSQL database + auth backend |
| **Cors** | Handle cross-origin requests |
| **dotenv** | Environment variable management |
| **Nodemon** | Development server auto-reload |
| **Node.js** | JavaScript runtime |

---

## 📦 Dependencies

### Production
- `express` - Web server framework
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment configuration
- `@supabase/supabase-js` - Supabase client library

### Development
- `nodemon` - Auto-restart server on file changes

---

## 🔄 Future Enhancements

- [ ] Implement actual Facebook/LinkedIn API integrations
- [ ] Add authentication & authorization middleware
- [ ] Create request validation schema
- [ ] Add error handling & logging
- [ ] Implement scheduled posting
- [ ] Add media upload support
- [ ] Create admin dashboard
- [ ] Add webhook support for platform callbacks
- [ ] Implement post analytics tracking

---

## 📧 Support

For issues or questions, contact your development team or check the project documentation.

---

## 📄 License

ISC
