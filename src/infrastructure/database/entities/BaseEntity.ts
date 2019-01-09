import {
    PrimaryColumn,
    UpdateDateColumn,
    CreateDateColumn,
    BeforeInsert,
    AfterLoad,
} from 'typeorm'

import { formattedUUID } from '../../../common/utils'

export abstract class BaseEntity {
    @PrimaryColumn('uuid')
    id: string | undefined

    @CreateDateColumn({ nullable: false })
    createdAt: string | undefined

    @UpdateDateColumn({ nullable: false })
    updatedAt: string | undefined

    @BeforeInsert()
    beforeInsert() {
        this.id = formattedUUID()
    }

    @AfterLoad()
    handleAfterLoad() {
        this.createdAt = String(this.createdAt)
        this.updatedAt = String(this.updatedAt)
    }
}
