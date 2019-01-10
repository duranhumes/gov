import { PersonRepository, PersonEntity } from '../../domain/Person'
import { CreatePersonCmd, UpdatePersonCmd } from './PersonCommands'

export class PersonService {
    personRepo: PersonRepository

    constructor() {
        this.personRepo = new PersonRepository()
    }

    async createPerson(personData: CreatePersonCmd) {
        const person = new PersonEntity()
        Object.assign(person, personData)

        const newPersonId = await this.personRepo.create(person)

        return newPersonId
    }

    async findPerson(id: string): Promise<PersonEntity> {
        const person = await this.personRepo.find('id', id)

        return person
    }

    async updatePerson(id: string, newData: UpdatePersonCmd): Promise<void> {
        await this.personRepo.update(id, newData)
    }
}
