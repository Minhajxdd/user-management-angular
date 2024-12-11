import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AuthRequest } from './auth.mode';



export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {

    if (req.role !== `admin`) {
        res.status(401).json({ error: 'Not a admin' });
        return 
    }

    next();
};

export default verifyToken;


