import { Request, Response, NextFunction } from 'express';
import gpt from '../utils/gpt'


export class Assist {
    answer = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.prompt) {
            return next({
                status: 400,
                message: "prompt can't be empty",
            });
        }
        try {
            const answer = await gpt(req.body.prompt, [], 'question');
            return res.status(200).json({
                answer
            });
            
        } catch (error) {
            return next({
                status: 400,
                message: "something went wrong, please try again later",
            });
        }
    }
}