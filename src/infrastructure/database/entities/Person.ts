import { Entity, Column } from 'typeorm'
import { Length, IsEnum } from 'class-validator'

import { BaseEntity } from './BaseEntity'

enum Gender {
    'Male',
    'Female',
    'Other',
}

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

    @Column({ type: 'varchar', width: 6, nullable: false })
    @IsEnum(Gender)
    sex: Gender | undefined

    @Column({ type: 'varchar', length: 255, nullable: true })
    @Length(3, 255)
    height: string | undefined
}
