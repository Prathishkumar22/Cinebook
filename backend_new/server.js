import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;
import connectDB from './config/db.js'; 
import dotenv from 'dotenv';
import User from './models/user.model.js';
import routes from './routes/auth.route.js';
import path from 'path';
dotenv.config();
import cors from 'cors';
app.use(cors({
  origin: "http://localhost:5173",  // your React app URL
  credentials: true
}));
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/Cinebook/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "Cinebook", "dist", "index.html"));
});

app.use(express.json());
app.use('/api/users', routes);
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});
