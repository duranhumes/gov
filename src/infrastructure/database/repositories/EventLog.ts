import { getManager, EntityManager } from 'typeorm'

import { EventLogEntity } from '../entities'
import { promiseWrapper } from '../../../common/utils'
import logging from '../../../common/utils/logging'

export class EventLogRepository {
    manager: EntityManager

    constructor() {
        this.manager = getManager()
    }

    create = (event: Partial<EventLogEntity>) => {
        return new Promise<Partial<EventLogEntity>>(async (resolve, reject) => {
            const tempEvent = new EventLogEntity()
            Object.assign(tempEvent, event)

            const [newEvent, newEventErr] = await promiseWrapper(
                this.manager.insert(EventLogEntity, tempEvent)
            )
            if (newEventErr) {
                logging.error(newEventErr)

                return reject({ code: 500, message: newEventErr.message })
            }

            return resolve(newEvent.identifiers[0].id)
        })
    }
}
