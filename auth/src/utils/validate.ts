import { body, validationResult } from 'express-validator';
import { Request, Response } from "express";

// https://express-validator.github.io/docs/
const userValidationRules = () => {
    return [
        body('username').isString().isLength({ min: 4 }),
        // email must be an email
        body('email').isString().isEmail(),
        // password must be at least 8 chars long
        body('password').isString().isLength({ min: 8 }),
    ]
}

const validate = (req: Request, res: Response, next: Function) => {

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next()
}

export {validate, userValidationRules} 