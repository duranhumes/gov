import { Request, Response, NextFunction } from 'express'
import { body, param, validationResult } from 'express-validator/check'

import { code422 } from '../../../utils/httpMessages'
import PersonSchema from '../../../../infrastructure/database/schemas/PersonSchema'
import { Genders } from '../../../../domain/Person'

export const validationRules = {
    createPerson: [
        ...PersonSchema.map((field: string) =>
            body(field)
                .escape()
                .trim()
        ),
        body('firstName')
            .not()
            .isEmpty()
            .withMessage('is required')
            .trim()
            .escape(),
        body('lastName')
            .not()
            .isEmpty()
            .withMessage('is required')
            .trim()
            .escape(),
        body('address')
            .not()
            .isEmpty()
            .withMessage('is required')
            .trim()
            .escape(),
        body('DOB')
            .not()
            .isEmpty()
            .withMessage('is required')
            .trim()
            .escape(),
        body('sex')
            .not()
            .isEmpty()
            .withMessage('is required')
            .isIn(Genders)
            .withMessage('invalid gender')
            .trim()
            .escape(),
    ],
    getPerson: [
        param('id')
            .not()
            .isEmpty()
            .trim()
            .escape()
            .withMessage('is required for this endpoint'),
    ],
    updatePerson: [
        ...PersonSchema.map((field: string) =>
            body(field)
                .escape()
                .trim()
        ),
        param('id')
            .not()
            .isEmpty()
            .trim()
            .escape()
            .withMessage('is required for this endpoint'),
    ],
}

export function validationFunc(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const errString = errors
            .array()
            .map((err: any) => `${err.param}: ${err.msg}`)
            .join(', ')

        const fields: string[] = [
            ...new Set(errors.array().map((err: any) => err.param)),
        ]

        return res.status(422).json(code422(undefined, errString, fields))
    }

    return next()
}
