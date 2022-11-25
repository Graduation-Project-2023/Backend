import express, { Request, Response } from "express";
import server from './api/auth';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('API router is working');
});

router.use('/', server);

export default router;