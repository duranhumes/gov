import {
    MedicalRecordsRepository,
    MedicalRecordEntity,
} from '../../domain/Health'
import {
    CreateMedicalRecordCmd,
    UpdateMedicalRecordCmd,
} from './HealthCommands'

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
    async createMedicalRecord(
        medicalData: CreateMedicalRecordCmd
    ): Promise<void> {
        const medicalRecord = new MedicalRecordEntity()
        Object.assign(medicalRecord, medicalData)

        await this.medicalRecordsRepo.create(medicalRecord)
    }

    async findMedicalRecord(id: string): Promise<MedicalRecordEntity> {
        const medicalRecord = await this.medicalRecordsRepo.find('id', id)

        return medicalRecord
    }

    async updateMedicalRecord(
        id: string,
        newData: UpdateMedicalRecordCmd
    ): Promise<void> {
        await this.medicalRecordsRepo.update(id, newData)
    }
}
