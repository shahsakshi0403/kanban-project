import { body, validationResult } from 'express-validator';

// Validator for new tasks
export const newTaskValidator = () => {
    return [
        body('title').isString().isLength({ min: 1 }),
        body('description').isString(),
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
