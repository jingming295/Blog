// src/routes/Register/index.ts
import express, { Request, Response } from 'express';
import { RegisterRequest as RR } from './interface';
import { Register } from './performRegister';
const router = express.Router();

router.post('/register', async (req: Request, res: Response) =>
{
    const register = new Register;
    const body: RR = req.body as { username: string, email: string, password: string; };
    const userResult = await register.performRegister(body);
    res.json(userResult);
});
export default router;