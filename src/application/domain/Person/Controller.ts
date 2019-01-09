import { Router, Response, Request } from 'express'

class Controller {
    router: Router

    constructor() {
        this.router = Router()
        this.routes()
    }

    routes() {
        this.router.get('/:id', this.getPerson)
        this.router.post('/', this.createPerson)
    }

    getPerson = async (_: Request, res: Response) => {
        return res.sendStatus(200)
    }

    createPerson = async (_: Request, res: Response) => {
        return res.sendStatus(200)
    }
}

export const PersonController = new Controller().router
