import { MedicalRecordEntity } from '../../domain/Health'

export interface ICreateMedicalRecord {
    description: string
    hasInsurance: boolean
    bloodType: string
    patient: string
    physician: string
}

export type IUpdateMedicalRecord = Partial<MedicalRecordEntity>
