import express from 'express';
import path from 'path';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());


app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

import connectDB from './db.js';
connectDB();

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes.js';
import adminRoutes from './routes/admin.routes.js';

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});