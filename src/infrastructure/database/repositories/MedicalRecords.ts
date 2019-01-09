import { MedicalRecordEntity } from '../entities'
import { IRepository } from './IRepository'

export class MedicalRecordsRepository
    implements IRepository<MedicalRecordEntity> {
    create = async (medicalRecord: MedicalRecordEntity) => {
        console.log(medicalRecord)
        return new MedicalRecordEntity()
    }

    find = async (id: string) => {
        console.log(id)
        return new MedicalRecordEntity()
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
