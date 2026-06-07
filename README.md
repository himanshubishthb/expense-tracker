# Expense Tracker

A full-stack expense management application built for tracking personal spending with a modern dashboard, filtering, analytics, and CSV export.

## Project Overview

Expense Tracker helps users record daily expenses, visualize spending patterns by category, and manage their budget through an intuitive web interface. Data persists to a JSON file on the server, making it lightweight and easy to deploy without a database.

## Features

- **Expense CRUD** — Create, read, update, and delete expenses
- **Form Validation** — Client and server-side validation with helpful error messages
- **Dashboard Summary** — Total spent this month, highest expense, expense count, per-category totals
- **Bar Chart** — Category vs total spending visualization using Recharts
- **Filters** — Filter by category and date (This Month, Last Month, Custom Range)
- **CSV Export** — Export currently visible (filtered) expenses
- **LocalStorage Cache** — Filter preferences persist across sessions
- **Responsive UI** — Optimized for mobile, tablet, and desktop
- **Loading & Empty States** — Polished UX for all application states

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Axios
- Recharts
- React Hook Form

### Backend
- Node.js
- Express
- UUID
- CORS
- JSON File System persistence

## Folder Structure

```
expense-tracker/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── ExpenseTable.jsx
│   │   │   ├── Filters.jsx
│   │   │   ├── SummaryCards.jsx
│   │   │   ├── ExpenseChart.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── EmptyState.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── hooks/
│   │   │   └── useExpenses.js
│   │   ├── utils/
│   │   │   ├── currency.js
│   │   │   ├── csvExport.js
│   │   │   └── dateUtils.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── server/
│   ├── controllers/
│   │   └── expenseController.js
│   ├── routes/
│   │   └── expenseRoutes.js
│   ├── services/
│   │   └── expenseService.js
│   ├── middleware/
│   │   ├── validateExpense.js
│   │   └── errorHandler.js
│   ├── data/
│   │   └── expenses.json
│   ├── utils/
│   │   └── fileHandler.js
│   ├── server.js
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Installation

1. Clone or download the project and navigate to the root directory:

```bash
cd expense-tracker
```

2. Install all dependencies (root, server, and client):

```bash
npm run install:all
```

Alternatively, install separately:

```bash
npm install
cd server && npm install
cd ../client && npm install
```

3. Configure environment variables (see below).

4. Start both frontend and backend:

```bash
npm run dev
```

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000

### Run Individually

```bash
# Backend only
npm run dev:server

# Frontend only
npm run dev:client
```

## Environment Variables

### Server (`server/.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT`   | API server port | `5000` |

### Client (`client/.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api` |

Copy the example files to get started:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

## API Documentation

Base URL: `http://localhost:5000/api`

### Expense Model

```json
{
  "id": "uuid-string",
  "amount": 150.50,
  "category": "Food",
  "date": "2026-06-07",
  "note": "Lunch at cafe",
  "createdAt": "2026-06-07T10:30:00.000Z"
}
```

### Valid Categories

`Food`, `Transport`, `Bills`, `Entertainment`, `Other`

### Endpoints

#### `GET /api/expenses`

Returns all expenses sorted by newest first.

**Response:** `200 OK`

```json
{
  "success": true,
  "data": []
}
```

#### `POST /api/expenses`

Creates a new expense.

**Request Body:**

```json
{
  "amount": 250,
  "category": "Transport",
  "date": "2026-06-07",
  "note": "Cab fare"
}
```

**Validation Rules:**
- `amount` — required, must be > 0
- `category` — required, must be a valid category
- `date` — required, cannot be a future date

**Response:** `201 Created`

#### `PUT /api/expenses/:id`

Updates an existing expense.

**Response:** `200 OK` | `404 Not Found`

#### `DELETE /api/expenses/:id`

Deletes an expense.

**Response:** `200 OK` | `404 Not Found`

#### `GET /api/health`

Health check endpoint.

**Response:** `200 OK`

## Deployment Guide

### Backend

1. Deploy to a Node.js hosting platform (Railway, Render, Fly.io, etc.).
2. Set the `PORT` environment variable.
3. Ensure the `data/` directory is writable for JSON persistence.
4. Start with `npm start`.

### Frontend

1. Set `VITE_API_URL` to your deployed API URL before building:

```bash
VITE_API_URL=https://your-api.example.com/api npm run build
```

2. Deploy the `client/dist` folder to Vercel, Netlify, or any static host.

### Production Notes

- For production, consider replacing JSON file storage with a database (PostgreSQL, MongoDB).
- Enable HTTPS on both frontend and backend.
- Configure CORS to allow only your frontend domain.

## Future Improvements

- User authentication and multi-user support
- Recurring expenses and budget limits
- Monthly/yearly trend line charts
- Dark mode theme toggle
- Database migration (PostgreSQL/MongoDB)
- Pagination and search for large expense lists
- Receipt image uploads
- Email reports and notifications
- PWA support for offline access

Built with React 19, Express, and Tailwind CSS.
