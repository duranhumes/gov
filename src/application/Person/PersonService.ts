import { PersonRepository, PersonEntity } from '../../domain/Person'
import { ICreatePerson, IUpdatePerson } from './IPerson'

export class PersonService {
    personRepo: PersonRepository

    constructor() {
        this.personRepo = new PersonRepository()
    }

    async createPerson(personData: ICreatePerson) {
        const person = new PersonEntity()
        Object.assign(person, personData)

        const newPersonId = await this.personRepo.create(person)

        return newPersonId
    }

    async findPerson(id: string): Promise<PersonEntity> {
        const person = await this.personRepo.find('id', id)

        return person
    }

    async updatePerson(id: string, newData: IUpdatePerson): Promise<void> {
        await this.personRepo.update(id, newData)
    }
}
