import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

import connectDB from './db.js';
connectDB();

import authRoutes from './routes/auth.routes';
import { error } from 'console';
// const protectedRoute = require('./routes/protectedRoute');

app.use('/auth', authRoutes);
// app.use('/', protectedRoute);

app.get('', (req, res) => {
  res.json({
    data: 'testing the server'
  });
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});