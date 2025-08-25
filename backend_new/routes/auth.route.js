import express from 'express';
import { RegisterUser,LoginUser } from '../controller/RegisterUser.controller.js';

const router = express.Router();
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();        
// Register a new user
router.post('/register', RegisterUser);
router.post('/login',LoginUser);
// Login a user
export default router;
