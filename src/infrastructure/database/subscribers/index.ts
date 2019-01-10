import {
    EventSubscriber,
    EntitySubscriberInterface,
    InsertEvent,
    UpdateEvent,
    RemoveEvent,
    getManager,
} from 'typeorm'
import { EventLogRepository } from '../repositories/EventLog'
import { EventTypes } from '../entities/EventLog'

/**
 * Used to log all db transactions
 * some with before & after diff
 * for the case when you'd need to
 * rollback a change
 */
@EventSubscriber()
export class EverythingSubscriber implements EntitySubscriberInterface {
    before: object
    after: object
    eventLogRepo: EventLogRepository

    constructor() {
        this.before = {}
        this.after = {}

        this.eventLogRepo = new EventLogRepository()
    }

    beforeInsert(event: InsertEvent<any>) {
        this.before = event.entity
    }

    beforeUpdate(event: UpdateEvent<any>) {
        this.before = event.entity
    }

    beforeRemove(event: RemoveEvent<any>) {
        this.before = event.entity
    }

    afterInsert(event: InsertEvent<any>) {
        this.after = event.entity

        const manager = event.manager
        const entityName = event.entity.constructor.name

        if (entityName && !entityName.toLowerCase().includes('event')) {
            const entityTableName = manager.getRepository(entityName).metadata
                .tableName
            const newEventLog = {
                type: EventTypes.insert,
                table: entityTableName,
                entityId: event.entity.id,
                before: JSON.stringify({}),
                after: JSON.stringify(this.after),
            }

            this.eventLogRepo.create(newEventLog)
        }
    }

    afterUpdate(event: UpdateEvent<any>) {
        this.after = event.entity

        const manager = event.manager
        const entityName = event.entity.constructor.name

        if (entityName && !entityName.toLowerCase().includes('event')) {
            const entityTableName = manager.getRepository(entityName).metadata
                .tableName
            const newEventLog = {
                type: EventTypes.update,
                table: entityTableName,
                entityId: event.entity.id,
                before: JSON.stringify(this.before),
                after: JSON.stringify(this.after),
            }

            this.eventLogRepo.create(newEventLog)
        }
    }

    afterRemove(event: RemoveEvent<any>) {
        this.after = event.entity

        const manager = event.manager
        const entityName = event.entity.constructor.name

        if (entityName && !entityName.toLowerCase().includes('event')) {
            const entityTableName = manager.getRepository(entityName).metadata
                .tableName
            const newEventLog = {
                type: EventTypes.delete,
                table: entityTableName,
                entityId: event.entity.id,
                before: JSON.stringify(this.before),
                after: JSON.stringify(this.after),
            }

            this.eventLogRepo.create(newEventLog)
        }
    }

    afterLoad(event: any) {
        this.after = event

        const manager = getManager()
        const entityName = event ? event.constructor.name : undefined

        if (
            entityName &&
            !entityName.toLowerCase().includes('event') &&
            entityName.toLowerCase().includes('entity')
        ) {
            const entityTableName = manager.getRepository(entityName).metadata
                .tableName
            const newEventLog = {
                type: EventTypes.read,
                table: entityTableName,
                entityId: event.id,
                before: JSON.stringify({}),
                after: JSON.stringify({}),
            }

            this.eventLogRepo.create(newEventLog)
        }
    }
}
