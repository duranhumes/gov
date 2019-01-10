import { filterEntity } from '../../../common/utils'
import { MedicalRecordEntity } from '../../../domain/Health'

export const HealthView = {
    MedicalRecord: (
        medicalRecord: Partial<MedicalRecordEntity>,
        fields: string[] = []
    ) => filterEntity(medicalRecord, fields),
}
