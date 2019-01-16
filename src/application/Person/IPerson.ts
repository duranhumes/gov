import { PersonEntity } from '../../domain/Person'

export interface ICreatePerson {
    firstName: string
    lastName: string
    address: string
    telephone?: string
    DOB: Date
    sex: string
    height?: string
}

export type IUpdatePerson = Partial<PersonEntity>
