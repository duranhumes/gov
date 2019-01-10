import { Entity, Column } from 'typeorm'
import { Length } from 'class-validator'

import { BaseEntity } from '../../../infrastructure/database/entities'

export const Genders = ['Male', 'Female', 'Other']

@Entity('persons')
export class PersonEntity extends BaseEntity {
    @Column({ type: 'varchar', length: 255, nullable: false })
    @Length(3, 255)
    firstName: string | undefined

    @Column({ type: 'varchar', length: 255, nullable: false })
    @Length(3, 255)
    lastName: string | undefined

    @Column({ type: 'varchar', length: 255, nullable: true })
    @Length(3, 255)
    address: string | undefined

    @Column({ type: 'varchar', length: 255, nullable: true })
    @Length(3, 255)
    telephone: string | undefined

    @Column({ type: 'varchar', length: 255, nullable: false })
    @Length(3, 255)
    DOB: string | undefined

    @Column({ type: 'enum', enum: Genders, nullable: false })
    sex: string | undefined

    @Column({ type: 'varchar', length: 255, nullable: true })
    @Length(3, 255)
    height: string | undefined
}
