import { AuthService } from '../services/authService.js';
const verifyEmail = (req, res) => {
    const token = req.query.token;
    if (!token) {
        res.status(400).json({ message: 'Token não fornecido!' });
    }
    AuthService.verifyEmail(token);
};
export { verifyEmail };
