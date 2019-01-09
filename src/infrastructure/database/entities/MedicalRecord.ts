import { Entity, Column, OneToOne, JoinColumn } from 'typeorm'
import { Length } from 'class-validator'

import { BaseEntity } from './BaseEntity'
import { PersonEntity } from './Person'

@Entity('medicalRecords')
export class MedicalRecordEntity extends BaseEntity {
    @Column({ type: 'varchar', length: 255, nullable: false })
    @Length(3, 255)
    licenceNo: string | undefined

    @OneToOne(_ => PersonEntity)
    @JoinColumn()
    person: PersonEntity | undefined
}
