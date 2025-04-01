import type { NextFunction,Request,Response } from "express";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "./config/jwt";

export function authmiddleware(req:Request,res:Response,next:NextFunction) {
    
    const token = req.headers['authorization'];

    if (!token) {
        res.status(401).send("Unauthorized");
        return;
    }
    
    const decoded = jwt.verify(token, JWT_SECRET as string);
    if (!decoded || !decoded.sub) {
        res.status(401).send("Unauthorized");
        return;
    }

    req.userId = decoded.sub as string;
   
    next();
}