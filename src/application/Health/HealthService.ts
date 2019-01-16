import {
    MedicalRecordsRepository,
    MedicalRecordEntity,
} from '../../domain/Health'
import { ICreateMedicalRecord, IUpdateMedicalRecord } from './IHealth'

export class HealthService {
    medicalRecordsRepo: MedicalRecordsRepository

    constructor() {
        this.medicalRecordsRepo = new MedicalRecordsRepository()
    }

    /**
     * Creates a new medical record
     *
     * For now with two personId's
     * One being the patient and the other
     * a physician
     */
    async createMedicalRecord(medicalData: ICreateMedicalRecord) {
        const medicalRecord = new MedicalRecordEntity()
        Object.assign(medicalRecord, medicalData)

        const medicalRecordId = await this.medicalRecordsRepo.create(
            medicalRecord
        )

        return medicalRecordId
    }

    async findMedicalRecord(id: string): Promise<MedicalRecordEntity> {
        const medicalRecord = await this.medicalRecordsRepo.find('id', id)

        return medicalRecord
    }

    async updateMedicalRecord(
        id: string,
        newData: IUpdateMedicalRecord
    ): Promise<void> {
        await this.medicalRecordsRepo.update(id, newData)
    }
}
