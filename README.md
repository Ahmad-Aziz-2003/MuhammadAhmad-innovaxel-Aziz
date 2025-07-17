# URL Shortening Service – Innovaxel Assignment

This project is a full-stack URL shortening service built as part of the Innovaxel take-home assignment. It enables users to shorten long URLs, retrieve the original ones, update or delete them, and view access statistics.

---

## 🚀 Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* dotenv

### Frontend

* React (Vite)
* Tailwind CSS
* Axios

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Ahmad-Aziz-2003/MuhammadAhmad-innovaxel-Aziz.git
cd MuhammadAhmad-innovaxel-Aziz
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

#### Create `.env` file inside `backend/`

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/urlshortener
```

Then start the backend:

```bash
npm start
```

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

#### Create `.env` file inside `frontend/`

```env
VITE_API_BASE_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

---

## 🌐 API Endpoints Overview

| Method | Endpoint                    | Description                              |
| ------ | --------------------------- | ---------------------------------------- |
| POST   | `/shorten`                  | Create a short URL                       |
| GET    | `/shorten/:shortCode`       | Retrieve original URL & increment access |
| PUT    | `/shorten/:shortCode`       | Update the original URL                  |
| DELETE | `/shorten/:shortCode`       | Delete a short URL                       |
| GET    | `/shorten/:shortCode/stats` | Get access statistics for a short URL    |
| GET    | `/shorten`                  | Retrieve all short URLs                  |

---

## Features

* Generate unique, random short codes for URLs
* Redirect functionality for short links
* Access count tracking
* Full CRUD operations on URLs
* Clean React frontend with Tailwind styling

---

## Screenshots

You can add relevant screenshots here:

* URL Form & Short Code Display
<img width="1075" height="766" alt="1" src="https://github.com/user-attachments/assets/cd328a76-1aa8-4d84-833d-747266fc5623" />

* Stats Panel
<img width="952" height="602" alt="4" src="https://github.com/user-attachments/assets/eff00eb6-8aa1-4a02-8da6-ab977ae9eaa8" />

* Update Pannel
<img width="1225" height="691" alt="3" src="https://github.com/user-attachments/assets/21bb73ce-e8be-47b1-94da-51dd19ea45ae" />

---

## 📝 Submission Notes

* All code is committed on the `dev` branch.
* `main` branch includes this README only.
* Reviewer Added: `Junaid Hussnain`
* Repository is public as per submission guidelines.

---

## 📩 Contact

**Muhammad Ahmad Aziz**  
[GitHub Profile](https://github.com/Ahmad-Aziz-2003)

---
