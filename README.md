# 📚 AI Study Assistant

AI Study Assistant is a web application that generates study material using AI. Users can enter a topic and instantly receive:

- 📖 Topic Summary
- 📝 Flashcards
- 🎯 Multiple Choice Quiz

The application uses the Groq API to generate educational content and helps students learn topics quickly.

---

## 🚀 Features

- Generate AI-powered summaries
- Create interactive flashcards
- Generate multiple-choice quizzes
- Modern React frontend
- Express.js backend
- Groq LLM integration

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Axios
- CSS

### Backend
- Node.js
- Express.js
- Groq SDK
- dotenv
- cors

---

## 📂 Project Structure

```text
flam-study-assistant
│
├── client
│   ├── src
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── components
│   │       ├── Flashcard.jsx
│   │       └── Flashcard.css
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── server
│   ├── index.js
│   ├── package.json
│   └── .env.example
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone <repository-url>
cd flam-study-assistant
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

### Backend Setup

```bash
cd server
npm install
npm start
```

---

## 🔑 Environment Variables

Create a `.env` file inside the server folder:

```env
GROQ_API_KEY=your_groq_api_key
```

---

## 🎯 How It Works

1. Enter a study topic.
2. Click **Generate Study Material**.
3. AI generates:
   - Summary
   - Flashcards
   - Quiz Questions
4. Study using flashcards or test knowledge with the quiz.

---

## 📸 Sample Topics

- Arrays
- Linked Lists
- Machine Learning
- Operating Systems
- Database Management Systems
- Computer Networks

---

## 👩‍💻 Author

Vaishnavi Singh

B.Tech Computer Science Student

AI & Full Stack Development Enthusiast
