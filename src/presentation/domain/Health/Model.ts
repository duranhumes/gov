import { PersonEntity } from '../../../domain/Person'

export interface MedicalRecordModel {
    description: string
    hasInsurance: boolean
    bloodType: string
    patient: Partial<PersonEntity>
    physician: Partial<PersonEntity>
}
