# QueryBoard – Smart Feedback Tracker + AI Assistant

A full-stack web application that allows users to submit feedback and chat with an AI assistant powered by Google's Gemini API.

- 📝 Submit and manage feedback with categories
- 💬 Chat with an AI assistant powered by Google Gemini
- 🌓 Light and dark mode support
- 🎨 Modern, responsive UI with smooth animations
- 📱 Mobile-friendly design
- 🚀 Fast and efficient state management

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express
- **AI**: Google Gemini API
- **Styling**: Tailwind CSS with custom animations
- **State Management**: React Context API

## 📋 Prerequisites

- Node.js (v16 or later)
- npm (v8 or later) or yarn
- Google Gemini API key (free)

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/queryboard.git
cd queryboard
```

### 2. Set up the backend

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create and configure environment file
 .env
```

Edit the `.env` file and add your Google Gemini API key:

```env
PORT=5000
GEMINI_API_KEY=your_google_gemini_api_key_here
```

### 3. Set up the frontend

```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install
```

### 4. Start the development servers

#### Terminal 1 - Backend Server
```bash
# Navigate to server directory
cd server

# Start the backend server
node app.js
```

#### Terminal 2 - Frontend Development Server
```bash
# Navigate to client directory
cd client

# Start the frontend development server
npm start
```
Frontend server will start on
The application should now be running at [http://localhost:3000](http://localhost:3000).

Backend server will start on
- `PORT`: The port the server will run on (default: 5000)


## Project Structure

```
queryboard/
├── client/             # React Frontend
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── App.jsx     # Main App component
│   │   └── index.js    # Entry point
│   └── ...
├── server/             # Node.js + Express Backend
│   ├── controllers/    # Request handlers
│   ├── routes/         # API routes
│   ├── app.js          # Express app setup
│   └── .env            # Environment variables
└── README.md
```

## 🤖 AI Integration

This project uses Google's Gemini API to power the AI chat functionality. To set it up:

1. Get your free API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add it to your `.env` file as `GEMINI_API_KEY`
3. use gemini-flash model free
