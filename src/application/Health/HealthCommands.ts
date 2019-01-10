import { MedicalRecordEntity } from '../../domain/Health'

export interface CreateMedicalRecordCmd {
    description: string
    hasInsurance: boolean
    bloodType: string
    patient: string
    physician: string
}

export type UpdateMedicalRecordCmd = Partial<MedicalRecordEntity>
