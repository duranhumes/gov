import { EntityManager, getManager } from 'typeorm'

import { MedicalRecordEntity } from '../entities'
import { IRepository } from '../../../infrastructure/database/repositories'
import { promiseWrapper, isEmpty } from '../../../common/utils'
import logging from '../../../common/utils/logging'

export class MedicalRecordsRepository
    implements IRepository<MedicalRecordEntity> {
    manager: EntityManager

    constructor() {
        this.manager = getManager()
    }

    create = async (medicalRecord: MedicalRecordEntity) => {
        return new Promise<Partial<MedicalRecordEntity>>(
            async (resolve, reject) => {
                const tempMedicalRecord = new MedicalRecordEntity()
                Object.assign(tempMedicalRecord, medicalRecord)

                const [
                    newMedicalRecord,
                    newMedicalRecordErr,
                ] = await promiseWrapper(
                    this.manager.insert(MedicalRecordEntity, tempMedicalRecord)
                )
                if (newMedicalRecordErr) {
                    if (newMedicalRecordErr.code === 'ER_DUP_ENTRY') {
                        return reject({
                            code: 409,
                            message:
                                'A medical record already exists for this patient',
                        })
                    }

                    logging.error(newMedicalRecordErr)

                    return reject({
                        code: 500,
                        message: newMedicalRecordErr.message,
                    })
                }

                return resolve(newMedicalRecord.identifiers[0].id)
            }
        )
    }

    find = async (key: string, value: string) => {
        return new Promise<MedicalRecordEntity>(async (resolve, reject) => {
            const [medicalRecord, medicalRecordErr] = await promiseWrapper(
                this.manager.findOne(MedicalRecordEntity, { [key]: value })
            )
            if (medicalRecordErr) {
                logging.error(medicalRecordErr)

                return reject({ code: 500, message: medicalRecordErr.message })
            }

            if (!medicalRecord || isEmpty(medicalRecord)) {
                return reject({ code: 404, message: 'MedicalRecord not found' })
            }

            return resolve(medicalRecord)
        })
    }

    findQuery = async (query?: object) => {
        return new Promise<MedicalRecordEntity>(async (resolve, reject) => {
            const [medicalRecord, medicalRecordErr] = await promiseWrapper(
                this.manager.findOne(MedicalRecordEntity, query)
            )
            if (medicalRecordErr) {
                logging.error(medicalRecordErr)

                return reject({ code: 500, message: medicalRecordErr.message })
            }

            if (!medicalRecord || isEmpty(medicalRecord)) {
                return reject({ code: 404, message: 'MedicalRecord not found' })
            }

            return resolve(medicalRecord)
        })
    }

    update = async (
        id: string,
        medicalRecord: Partial<MedicalRecordEntity>
    ) => {
        console.log(id, medicalRecord)
        return new MedicalRecordEntity()
    }

    delete = async (id: string) => {
        console.log(id)
    }
}
