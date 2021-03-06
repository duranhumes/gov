import { Entity, Column, OneToOne, JoinColumn } from 'typeorm'
import { Length } from 'class-validator'

import { BaseEntity } from '../../../infrastructure/database/entities'
import { PersonEntity } from '../../Person/entities'

@Entity('driversLicense')
export class DriversLicenseEntity extends BaseEntity {
    @Column({ type: 'varchar', length: 255, nullable: false })
    @Length(3, 255)
    licenseNo: string | undefined

    @Column({ type: 'varchar', length: 255, nullable: false })
    expiryDate: Date | undefined

    @OneToOne(_ => PersonEntity)
    @JoinColumn()
    driver: PersonEntity | undefined
}
