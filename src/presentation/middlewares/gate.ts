import { Request, Response, NextFunction } from 'express'

import logging from '../../common/utils/logging'
import * as httpMessages from '../utils/httpMessages'

export const gate = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err) {
        logging.error({
            ip: req.ip,
            message: req.statusMessage,
            code: req.statusCode,
        })

        return res.status(500).json(httpMessages.code500())
    }

    return next()
}
