import { PersonRepository, PersonEntity } from '../../domain/Person'
import { CreatePersonCmd, UpdatePersonCmd } from './PersonCommands'

export class PersonService {
    personRepo: PersonRepository

    constructor() {
        this.personRepo = new PersonRepository()
    }

    /**
     * Creates a new person
     */
    async createPerson(personData: CreatePersonCmd) {
        const person = new PersonEntity()
        Object.assign(person, personData)

        const newPersonId = await this.personRepo.create(person)

        return newPersonId
    }

    /**
     * Find a person
     */
    async findPerson(id: string): Promise<PersonEntity> {
        const person = await this.personRepo.find(id)

        return person
    }

    /**
     * Update a persons info
     */
    async updatePerson(id: string, newData: UpdatePersonCmd): Promise<void> {
        await this.personRepo.update(id, newData)
    }
}
