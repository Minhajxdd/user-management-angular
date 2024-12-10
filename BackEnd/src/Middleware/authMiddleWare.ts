import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AuthRequest } from './auth.mode';



const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    let token = req.header('Authorization');
    if (!token) {
        res.status(401).json({ error: 'Access denied. No token provided.' });
        return;
    }
    token = token.split(' ')[1];

    try {
        const secretKey = process.env.JWT_SECRET || 'your-secret-key';
        
        const decoded = jwt.verify(token, secretKey) as JwtPayload;
        
        if (!decoded.userId) {
            res.status(401).json({ error: 'Invalid token.' });
            return;
        }

        req.userId = decoded.userId;
        req.role = decoded.role;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token.' });
        return;
    }
};

export default verifyToken;


