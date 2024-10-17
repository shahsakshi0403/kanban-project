import { body, validationResult } from 'express-validator';

// Validator for new users
export const newUserValidator = () => {
    return [
        body('name').isString().isLength({ min: 1 }),
        body('email').isEmail(),
    ];
};

export const loginValidator = () => {
    return [
        body('email').isEmail(),
        body('password')
    ];
};


// Validation middleware
export const Validation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
