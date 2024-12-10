import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../Models/user.model';

const router = express.Router();

router.post('/register', async (req, res): Promise<any> => {
    try {
        
        const { fullname, email, password } = req.body;

        const data = await User.findOne({ email });

        if (data) {
            return res.status(401).json({ error: 'Email Already Exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            fullname: fullname,
            email: email,
            password: hashedPassword,
            role: 'user'
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
        console.log(error);
    }
});

router.post('/login', async (req: Request, res: Response): Promise<any> => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email }).lean();

        if (!user) {
            return res.status(401).json({ error: 'NO USER Found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect Password' });
        }

        const payload = {
            userId: user._id,
            role: user.role
        }

        const token = jwt.sign(payload, 'your-secret-key', {
            expiresIn: '1h',
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});


export default router;