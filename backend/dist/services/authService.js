import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as Model from '../models/userModel.js';
import { EmailService } from './emailService.js';
import { getErrorMessage } from '../utils/error.js';
dotenv.config();
export class AuthService {
    static async register(userID, email) {
        if (!process.env.JWT_LOGIN_SECRET) {
            throw new Error('JWT_LOGIN_SECRET não definido!');
        }
        const token = jwt.sign({ userID }, process.env.JWT_EMAIL_SECRET, { expiresIn: '1h' });
        try {
            EmailService.sendVerificationEmail(email, token);
        }
        catch {
            throw new Error('Erro ao enviar e-mail de verificação');
        }
        return token;
    }
    static async verifyEmail(token) {
        if (!process.env.JWT_EMAIL_SECRET)
            throw new Error('JWT_EMAIL_SECRET não definido!');
        try {
            const payload = jwt.verify(token, process.env.JWT_EMAIL_SECRET);
            const verifiedUser = await Model.verifyUser(payload.userID);
            return verifiedUser;
        }
        catch (err) {
            console.log(getErrorMessage(err));
            return;
        }
    }
}
