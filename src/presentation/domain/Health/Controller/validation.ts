import { Request, Response, NextFunction } from 'express'
import { body, param, validationResult } from 'express-validator/check'

import { code422 } from '../../../utils/httpMessages'
import MedicalRecordSchema from '../../../../infrastructure/database/schemas/MedicalRecordSchema'
import { BloodTypes } from '../../../../domain/Health/entities/MedicalRecord'

export const validationRules = {
    createMedicalRecord: [
        ...MedicalRecordSchema.map((field: string) =>
            body(field)
                .not()
                .isEmpty()
                .withMessage('is required')
                .escape()
                .trim()
        ),
        body('bloodType')
            .not()
            .isEmpty()
            .withMessage('is required')
            .isIn(BloodTypes)
            .withMessage('invalid bloodtype')
            .trim()
            .escape(),
    ],
    getMedicalRecord: [
        param('id')
            .not()
            .isEmpty()
            .trim()
            .escape()
            .withMessage('is required for this endpoint'),
    ],
    updateMedicalRecord: [
        ...MedicalRecordSchema.map((field: string) =>
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
