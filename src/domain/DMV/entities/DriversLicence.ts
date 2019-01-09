import { Entity, Column, OneToOne, JoinColumn } from 'typeorm'
import { Length } from 'class-validator'

import {
    BaseEntity,
    PersonEntity,
} from '../../../infrastructure/database/entities'

@Entity('driversLicence')
export class DriversLicenceEntity extends BaseEntity {
    @Column({ type: 'varchar', length: 255, nullable: false })
    @Length(3, 255)
    licenceNo: string | undefined

    @Column({ type: 'varchar', length: 255, nullable: false })
    expiryDate: Date | undefined

    // @Column({type: 'tinyint', width: 1, nullable: false, default: false})

    @OneToOne(_ => PersonEntity)
    @JoinColumn()
    person: PersonEntity | undefined
}
