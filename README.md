# QueryBoard – Smart Feedback Tracker + AI Assistant

A full-stack web application that allows users to submit feedback and ask questions to an AI assistant powered by Hugging Face's language models.

![QueryBoard Screenshot](https://via.placeholder.com/1200x600/1a1a2e/e94560?text=QueryBoard+Screenshot)

## Features

- 📝 Submit and manage feedback with categories
- 💬 Chat with an AI assistant powered by Hugging Face
- 🌓 Light and dark mode
- 🎨 Modern, responsive UI with smooth animations
- 📱 Mobile-friendly design
- 🚀 Fast and efficient state management

## Tech Stack

- **Frontend**: React, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express
- **AI**: Hugging Face Inference API
- **Styling**: Tailwind CSS with custom animations

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Hugging Face API key (free)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/queryboard.git
cd queryboard
```

### 2. Set up the backend

```bash
cd server
npm install
cp .env.example .env
```

Edit the `.env` file and add your Hugging Face API key:

```env
PORT=5000
HF_API_KEY=your_huggingface_api_key_here
```

### 3. Set up the frontend

```bash
cd ../client
npm install
```

### 4. Start the development servers

In one terminal, start the backend:

```bash
cd server
npm start
```

In another terminal, start the frontend:

```bash
cd client
npm start
```

The application should now be running at [http://localhost:3000](http://localhost:3000).

## Environment Variables

### Backend (server/.env)

- `PORT`: The port the server will run on (default: 5000)
- `HF_API_KEY`: Your Hugging Face API key

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

## Available Scripts

### Frontend (client directory)

- `npm start`: Start the development server
- `npm test`: Run tests
- `npm run build`: Build for production

### Backend (server directory)

- `npm start`: Start the server
- `npm run dev`: Start the server with nodemon (development)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Hugging Face](https://huggingface.co/) for the amazing AI models
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for animations
