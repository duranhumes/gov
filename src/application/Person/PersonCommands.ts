import { PersonEntity } from '../../domain/Person'

export interface CreatePersonCmd {
    firstName: string
    lastName: string
    address: string
    telephone?: string
    DOB: Date
    sex: string
    height?: string
}

export type UpdatePersonCmd = Partial<PersonEntity>
