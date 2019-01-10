import { Entity, Column } from 'typeorm'

import { BaseEntity } from './BaseEntity'

export const EventTypes = {
    insert: 'insert',
    read: 'read',
    update: 'update',
    delete: 'delete',
}
const EventTypesArr = Array.from(Object.values(EventTypes))

@Entity('eventLog')
export class EventLogEntity extends BaseEntity {
    @Column({ type: 'enum', enum: EventTypesArr, nullable: false })
    type: string | undefined

    @Column({ type: 'varchar', length: 255, nullable: false })
    table: string | undefined

    @Column({ type: 'varchar', length: 255, nullable: false })
    entityId: string | undefined

    @Column({ type: 'text', nullable: true })
    before: string | undefined

    @Column({ type: 'text', nullable: true })
    after: string | undefined
}
