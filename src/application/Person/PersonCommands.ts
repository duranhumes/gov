import { PersonEntity } from '../../domain/Person'

export interface CreatePersonCmd {
    firstName: string | undefined
    lastName: string | undefined
    address: string | undefined
    telephone: string | undefined
    DOB: Date | undefined
    sex: string | undefined
    height: string | undefined
}

export type UpdatePersonCmd = Partial<PersonEntity>
