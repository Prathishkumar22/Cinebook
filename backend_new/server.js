import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import User from './models/user.model.js';
import routes from './routes/auth.route.js';
import path from 'path';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

const __dirname = path.resolve();

// Serve static files
app.use(express.static(path.join(__dirname, '/Cinebook/dist')));

// Parse JSON
app.use(express.json());

// API routes
app.use('/api/users', routes);

// ✅ This must be last — handle React routing
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, "Cinebook", "dist", "index.html"));
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});
