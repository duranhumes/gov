import {
    Entity,
    Column,
    OneToOne,
    JoinColumn,
    BeforeInsert,
    BeforeUpdate,
} from 'typeorm'
import { IsIn } from 'class-validator'

import { BaseEntity } from '../../../infrastructure/database/entities'
import { PersonEntity } from '../../Person/entities'

export const BloodTypes = ['A', 'B', 'O', 'AB', 'Unknown']

@Entity('medicalRecords')
export class MedicalRecordEntity extends BaseEntity {
    @Column({ type: 'text', nullable: false })
    description: string | undefined

    @Column({ type: 'tinyint', nullable: false, default: 0 })
    @IsIn([0, 1])
    hasInsurance: number | undefined

    @Column({ type: 'enum', enum: BloodTypes, nullable: false })
    @IsIn(BloodTypes)
    bloodType: string | undefined

    @OneToOne(_ => PersonEntity)
    @JoinColumn()
    physician: PersonEntity | undefined

    @OneToOne(_ => PersonEntity)
    @JoinColumn()
    patient: PersonEntity | undefined

    @BeforeInsert()
    @BeforeUpdate()
    handleBeforeEvents() {
        this.hasInsurance = Number(this.hasInsurance)
    }
}
