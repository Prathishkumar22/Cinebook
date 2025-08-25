import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;
import connectDB from './config/db.js'; 
import dotenv from 'dotenv';
import User from './models/user.model.js';
import routes from './routes/auth.route.js';
dotenv.config();
import cors from 'cors';
app.use(cors({
  origin: "http://localhost:5173",  // your React app URL
  credentials: true
}));

app.use(express.json());
app.use('/api/users', routes);
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});