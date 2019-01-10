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
        return new Promise<Partial<PersonEntity>>(async (resolve, reject) => {
            const tempPerson = new PersonEntity()
            Object.assign(tempPerson, person)

            const [newPerson, newPersonErr] = await promiseWrapper(
                this.manager.insert(PersonEntity, tempPerson)
            )
            if (newPersonErr) {
                if (newPersonErr.code === 'ER_DUP_ENTRY') {
                    return reject({
                        code: 409,
                        message: newPersonErr.message,
                    })
                }

                logging.error(newPersonErr)

                return reject({ code: 500, message: newPersonErr.message })
            }

            return resolve(newPerson.identifiers[0].id)
        })
    }

    find = (id: string) => {
        return new Promise<PersonEntity>(async (resolve, reject) => {
            const [person, personErr] = await promiseWrapper(
                this.manager.findOne(PersonEntity, { id })
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
}
