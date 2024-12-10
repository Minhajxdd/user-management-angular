import express from 'express';

import User from '../Models/user.model';
import { AuthRequest } from '../Middleware/auth.mode';

const router = express.Router();

router.post('/', async (req: AuthRequest, res): Promise<any> => {
    console.log(req.userId)
});