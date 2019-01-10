import { Router, Response, Request } from 'express'

import { PersonService } from '../../../../application/Person'
import PersonSchema from '../../../../infrastructure/database/schemas/PersonSchema'
import * as httpMessages from '../../../utils/httpMessages'
import { promiseWrapper, escapeString, pick } from '../../../../common/utils'
import logging from '../../../../common/utils/logging'
import { validationRules, validationFunc } from './validation'
import { PersonView } from '../View'

class Controller {
    router: Router
    personService: PersonService

    constructor() {
        this.router = Router()
        this.routes()

        this.personService = new PersonService()
    }

    routes() {
        this.router.get(
            '/:id',
            [...validationRules.getPerson],
            validationFunc,
            this.getPerson
        )
        this.router.post(
            '/',
            [...validationRules.createPerson],
            validationFunc,
            this.createPerson
        )
    }

    getPerson = async (req: Request, res: Response) => {
        const personId = escapeString(req.params.id)
        const [person, personErr] = await promiseWrapper(
            this.personService.findPerson(personId)
        )
        if (personErr) {
            if (personErr.code === 404) {
                return res.status(404).json(httpMessages.code404())
            }

            logging.error(personErr)

            return res.status(500).json(httpMessages.code500())
        }

        return res.status(200).json(httpMessages.code200(PersonView(person)))
    }

    createPerson = async (req: Request, res: Response) => {
        // Filter sent data based on schema
        const filteredData = pick(req.body, PersonSchema)
        const data = {}
        for (const key in filteredData) {
            if (filteredData.hasOwnProperty(key)) {
                data[key] = escapeString(filteredData[key])
            }
        }

        const [personId, personIdErr] = await promiseWrapper(
            this.personService.createPerson(filteredData)
        )
        if (personIdErr) {
            if (Number(personIdErr.code) === 409) {
                return res.status(409).json(httpMessages.code409())
            }

            logging.error(personIdErr)

            return res.status(500).json(httpMessages.code500())
        }

        /**
         * Find new person
         */
        const [newPerson, newPersonErr] = await promiseWrapper(
            this.personService.findPerson(personId)
        )
        if (newPersonErr) {
            logging.error(newPersonErr)

            return res.status(500).json(httpMessages.code500())
        }

        return res.status(201).json(httpMessages.code201(PersonView(newPerson)))
    }
}

export const PersonController = new Controller().router
