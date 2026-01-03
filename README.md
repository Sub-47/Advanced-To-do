# Advanced Todo App

A full-stack todo application built with React, Node.js, Express, and PostgreSQL.

##  Live Demo

- **Frontend**: [https://sub-47.github.io/Advanced-To-do/](https://sub-47.github.io/Advanced-To-do/)
- **Backend API**: [https://todo-backend-fwik.onrender.com](https://todo-backend-fwik.onrender.com)

##  Features

- Add, edit, and delete todos
- Data persists across sessions
- Responsive design with Tailwind CSS
- Full CRUD operations with REST API

##  Tech Stack

**Frontend:**
- React
- Tailwind CSS
- Vite
- GitHub Pages (deployment)

**Backend:**
- Node.js
- Express.js
- PostgreSQL
- Render (deployment)

##  Project Structure
```
├── To-Do-List/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   └── App.jsx
│   └── package.json
│
└── server/              # Express backend
    ├── index.js
    ├── db.js
    └── package.json
```

##  Development Setup

### Prerequisites
- Node.js installed
- PostgreSQL installed locally (optional)

### Frontend Setup
```bash
cd To-Do-List
npm install
npm run dev
```

### Backend Setup
```bash
cd server
npm install
npm run dev
```

##  Deployment Process

### Frontend (GitHub Pages)
1. Build the app: `npm run build`
2. Deploy: `npm run deploy`

### Backend (Render)
1. Push code to GitHub
2. Render auto-deploys on push
3. Environment variables configured in Render dashboard

### Database (Render PostgreSQL)
- Hosted on Render's free tier
- Connection via internal database URL

##  API Endpoints

- `GET /todos` - Get all todos
- `POST /todos` - Create a new todo
- `GET /todos/:id` - Get a specific todo
- `PUT /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo

##  Challenges & Solutions

- **CORS Issues**: Configured CORS middleware to allow GitHub Pages origin
- **Database Connection**: Switched from Supabase to Render PostgreSQL for better reliability
- **Deployment**: Used Render for backend instead of Vercel due to routing compatibility

## 📄 License

MIT

##  Author

Sub-47
