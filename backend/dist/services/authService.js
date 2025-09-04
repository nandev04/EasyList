import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as Model from '../models/userModel.js';
dotenv.config();
export class AuthService {
    static async register(userID) {
        if (!process.env.JWT_LOGIN_SECRET) {
            throw new Error('JWT_LOGIN_SECRET não definido!');
        }
        const token = jwt.sign({ userID }, process.env.JWT_LOGIN_SECRET, { expiresIn: '1h' });
        // Enviar email com token
        return token;
    }
    static async verifyEmail(token) {
        if (!process.env.JWT_EMAIL_SECRET) {
            throw new Error('JWT_EMAIL_SECRET não definido!');
        }
        const payload = jwt.verify(token, process.env.JWT_EMAIL_SECRET);
        const verifiedUser = Model.verifyUser(payload.userId);
        return verifiedUser;
    }
}
