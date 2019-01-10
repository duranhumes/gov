import { getManager, EntityManager } from 'typeorm'

import { PersonEntity } from '../entities'
import { IRepository } from '../../../infrastructure/database/repositories'
import { promiseWrapper, isEmpty } from '../../../common/utils'
import logging from '../../../common/utils/logging'

export class PersonRepository implements IRepository<PersonEntity> {
    manager: EntityManager

    constructor() {
        this.manager = getManager()
    }

    create = (person: PersonEntity) => {
        return new Promise<Partial<PersonEntity>>((resolve, reject) => {
            this.checkForDuplicates(person).then(async dupl => {
                if (dupl) {
                    return reject({
                        code: 409,
                        message: 'This person already exists',
                    })
                }

                const tempPerson = new PersonEntity()
                Object.assign(tempPerson, person)

                const [newPerson, newPersonErr] = await promiseWrapper(
                    this.manager.insert(PersonEntity, tempPerson)
                )
                if (newPersonErr) {
                    logging.error(newPersonErr)

                    return reject({ code: 500, message: newPersonErr.message })
                }

                return resolve(newPerson.identifiers[0].id)
            })
        })
    }

    find = (key: string, value: string) => {
        return new Promise<PersonEntity>(async (resolve, reject) => {
            const [person, personErr] = await promiseWrapper(
                this.manager.findOne(PersonEntity, { [key]: value })
            )
            if (personErr) {
                logging.error(personErr)

                return reject({ code: 500, message: personErr.message })
            }

            if (!person || isEmpty(person)) {
                return reject({ code: 404, message: 'Person not found' })
            }

            return resolve(person)
        })
    }

    findQuery = (query: object = {}) => {
        return new Promise<PersonEntity>(async (resolve, reject) => {
            const [person, personErr] = await promiseWrapper(
                this.manager.findOne(PersonEntity, query)
            )
            if (personErr) {
                logging.error(personErr)

                return reject({ code: 500, message: personErr.message })
            }

            if (!person || isEmpty(person)) {
                return reject({ code: 404, message: 'Person not found' })
            }

            return resolve(person)
        })
    }

    update = (id: string, person: Partial<PersonEntity>) => {
        return new Promise<PersonEntity>(async (resolve, reject) => {
            const tempPerson = new PersonEntity()
            Object.assign(tempPerson, id, person)

            const [updatedPerson, updatedPersonErr] = await promiseWrapper(
                this.manager.save(PersonEntity, tempPerson)
            )
            if (updatedPersonErr) {
                logging.error('Update User Service', updatedPersonErr, 500)

                return reject({ code: 500, message: updatedPersonErr.message })
            }

            return resolve(updatedPerson)
        })
    }

    delete = async (id: string) => {
        console.log(id)
    }

    checkForDuplicates = async (personData: PersonEntity) => {
        const { firstName, lastName, DOB, sex } = personData
        const [person] = await promiseWrapper(
            this.findQuery({
                firstName: String(firstName),
                lastName: String(lastName),
                DOB: String(DOB),
                sex: String(sex),
            })
        )

        if (person && !isEmpty(person)) {
            return true
        }

        return false
    }
}
