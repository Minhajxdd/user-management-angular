import express from 'express';

import User from '../Models/user.model';
import { AuthRequest } from '../Middleware/auth.mode';
import verifyToken from '../Middleware/authMiddleWare';

const router = express.Router();

router.get('/', verifyToken, async (req: AuthRequest, res): Promise<any> => {
    const { userId } = req;

    try {
        const userData = await User.findById(userId).lean();

        if (!userData) {
            return res.status(404).json({ error: "User Not Found" });
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


export default router;