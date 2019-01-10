import {
    MedicalRecordsRepository,
    MedicalRecordEntity,
} from '../../domain/Health'
import { CreateMedicalRecordCmd } from './HealthCommands'

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
     * a doctor
     */
    async createMedicalRecord({
        patientId,
        doctorId,
    }: CreateMedicalRecordCmd): Promise<void> {
        const medicalRecord = new MedicalRecordEntity()
        Object.assign(medicalRecord, { patientId, doctorId })

        await this.medicalRecordsRepo.create(medicalRecord)
    }
}
