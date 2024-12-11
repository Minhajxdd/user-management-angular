import express from 'express';

import { upload } from './multer';

import { AuthRequest } from '../Middleware/auth.mode';
import verifyToken from '../Middleware/authMiddleWare';

import User from '../Models/user.model';
import { fileModel } from './file.model';

const router = express.Router();

router.get('/', verifyToken, async (req: AuthRequest, res): Promise<any> => {
    const { userId } = req;

    try {
        const userData = await User.findById(userId).lean();

        if (!userData) {
            return res.status(404).json({ error: "User Not Found" });
        }

        if(!userData.profileimage) {
            
        }

        res.json({
            fullname: userData.fullname,
            email: userData.email,
            profileimage: userData.profileimage,
            role: userData.role
        })

    } catch (err) {
        console.error(`Error while fetching data: ${err}`);
    }

});

router.post('/profile', verifyToken, upload.single('profile'), async (req: AuthRequest, res) => {
    const { filename } = req.file as fileModel;

    const imageUrl = `http://localhost:3000/uploads/${filename}`;

    try {
        if (!imageUrl) {
            res.status(400).json({ error: 'Something went wrong' });
        }

        const userId = req.userId;

        await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    profileimage: imageUrl
                }
            }
        )

        res.json({ imageUrl: imageUrl });

    } catch (err) {
        console.log(err);
    }

})


export default router;