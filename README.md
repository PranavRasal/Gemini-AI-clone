# 🤖 Gemini AI Clone

A full-stack **AI Chat Application** inspired by **Google Gemini**, built using **React.js**, **Node.js**, **Express.js**, and the **Google Gemini API**. The application enables users to interact with an AI assistant through a modern, responsive interface while delivering real-time AI-generated responses using a dedicated backend server. :contentReference[oaicite:0]{index=0}

---

## 🚀 Features

- 🤖 AI-powered chatbot using the Google Gemini API
- 💬 Real-time conversational responses
- ⚡ Full-stack architecture with React frontend and Express backend
- 📩 REST API for handling AI requests
- 🔄 Loading animations for better user experience
- 📱 Fully responsive UI
- 🔐 Secure API key management using environment variables
- ⚛️ Component-based frontend architecture
- 🌐 CORS-enabled backend for seamless frontend communication
- ❌ Error handling for API requests

---

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript (ES6+)
- CSS3
- Vite

### Backend
- Node.js
- Express.js
- Google Gemini API
- dotenv
- CORS

---

## 📂 Project Structure

```text
Gemini-AI-clone/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── .env
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/PranavRasal/Gemini-AI-clone.git
```

### 2. Navigate to the Project

```bash
cd Gemini-AI-clone
```

---

## 📦 Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## 📦 Install Backend Dependencies

```bash
cd ../backend
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the **backend** folder.

```env
PORT=5000
GEMINI_API_KEY=your_google_gemini_api_key
```

Replace `your_google_gemini_api_key` with your actual API key.

---

## ▶️ Run the Backend

```bash
npm run dev
```

Server starts at:

```
http://localhost:5000
```

---

## ▶️ Run the Frontend

Open another terminal.

```bash
cd frontend
npm run dev
```

Frontend starts at:

```
http://localhost:5173
```

---

## 📡 API Endpoint

### Generate AI Response

**POST** `/api/chat`

### Request Body

```json
{
  "prompt": "Explain JavaScript Closures."
}
```

### Response

```json
{
  "success": true,
  "response": "JavaScript closures allow a function to access variables from its outer lexical scope even after the outer function has returned."
}
```

---

## 📸 Screenshots

### 🏠 Home Page

_Add Screenshot_

### 💬 Chat Interface

_Add Screenshot_

### 🤖 AI Response

_Add Screenshot_

### ⚙️ Backend API (Postman)

_Add Screenshot_

---

## 🎯 Future Improvements

- 🌙 Dark/Light Mode
- 💾 Save Chat History
- 🔐 User Authentication (JWT)
- 📎 File Upload Support
- 🎤 Voice Input
- 📄 Markdown Response Rendering
- 🗑️ Clear Chat Feature
- 🌍 Multi-language Support

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new feature branch.

```bash
git checkout -b feature-name
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push to GitHub.

```bash
git push origin feature-name
```

5. Open a Pull Request.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Pranav Rasal**

- GitHub: https://github.com/PranavRasal

---

⭐ **If you found this project useful, don't forget to star the repository!**
