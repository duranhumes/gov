import { Router, Response, Request } from 'express'

import { HealthService } from '../../../../application/Health'
import MedicalRecordSchema from '../../../../infrastructure/database/schemas/MedicalRecordSchema'
import * as httpMessages from '../../../utils/httpMessages'
import { promiseWrapper, escapeString, pick } from '../../../../common/utils'
import logging from '../../../../common/utils/logging'
import { validationRules, validationFunc } from './validation'
import { HealthView } from '../View'

class Controller {
    router: Router
    healthService: HealthService

    constructor() {
        this.router = Router()
        this.routes()

        this.healthService = new HealthService()
    }

    routes() {
        this.router.get(
            '/:id',
            [...validationRules.getMedicalRecord],
            validationFunc,
            this.getMedicalRecord
        )
        this.router.post(
            '/',
            [...validationRules.createMedicalRecord],
            validationFunc,
            this.createMedicalRecord
        )
    }

    getMedicalRecord = async (req: Request, res: Response) => {
        const medicalRecordId = escapeString(req.params.id)
        const [medicalRecord, medicalRecordErr] = await promiseWrapper(
            this.healthService.findMedicalRecord(medicalRecordId)
        )
        if (medicalRecordErr) {
            if (medicalRecordErr.code === 404) {
                return res.status(404).json(httpMessages.code404())
            }

            logging.error(medicalRecordErr)

            return res.status(500).json(httpMessages.code500())
        }

        return res
            .status(200)
            .json(httpMessages.code200(HealthView.MedicalRecord(medicalRecord)))
    }

    createMedicalRecord = async (req: Request, res: Response) => {
        // Filter sent data based on schema
        const filteredData = pick(req.body, MedicalRecordSchema)
        const data = {}
        for (const key in filteredData) {
            if (filteredData.hasOwnProperty(key)) {
                data[key] = escapeString(filteredData[key])
            }
        }

        const [medicalRecordId, medicalRecordIdErr] = await promiseWrapper(
            this.healthService.createMedicalRecord(filteredData)
        )
        if (medicalRecordIdErr) {
            if (medicalRecordIdErr.code === 409) {
                return res
                    .status(409)
                    .json(
                        httpMessages.code409(
                            undefined,
                            medicalRecordIdErr.message
                        )
                    )
            }
            logging.error(medicalRecordIdErr)

            return res.status(500).json(httpMessages.code500())
        }

        /**
         * Find new medicalRecord
         */
        const [newMedicalRecord, newMedicalRecordErr] = await promiseWrapper(
            this.healthService.findMedicalRecord(medicalRecordId)
        )
        if (newMedicalRecordErr) {
            logging.error(newMedicalRecordErr)

            return res.status(500).json(httpMessages.code500())
        }

        return res
            .status(201)
            .json(
                httpMessages.code201(HealthView.MedicalRecord(newMedicalRecord))
            )
    }
}

export const HealthController = new Controller().router
