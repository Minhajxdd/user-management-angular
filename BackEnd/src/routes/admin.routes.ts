import express, { Request, Response } from 'express';

import User from '../Models/user.model';
import verifyToken from '../Middleware/authMiddleWare';
import { BlobOptions } from 'buffer';


const router = express.Router();

router.get('/userData', verifyToken, verifyToken, async (req, res): Promise<any> => {
    try{

        const data = await User.find({}, {__v: 0, password: 0}).lean();

        res.json({data});

    }catch(err: any) {
        res.status(500).json({ error: err.message })
    }
});


router.patch('/userblock', verifyToken, verifyToken, async (req, res): Promise<any> => {
    try{

        const { userId } = req.body;

        if(!userId) {
            res.status(402).json({ error: 'No input value provided'});
            return;
        }

        const { isBlocked } = await User.findById(userId, { isBlocked: 1 }).lean() as {isBlocked: boolean}; 

        await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    isBlocked: !isBlocked
                }
            }
        )

        res.json({message: 'successfully updated'});

    }catch(err: any) {
        res.status(500).json({ error: err.message })
        console.log(err)
    }
});


export default router;