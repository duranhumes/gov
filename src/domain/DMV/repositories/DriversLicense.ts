import { DriversLicenseEntity } from '../entities'
import { IRepository } from '../../../infrastructure/database/repositories'

export class DriversLicenseRepository
    implements IRepository<DriversLicenseEntity> {
    create = async (driverslicense: DriversLicenseEntity) => {
        console.log(driverslicense)
        return new DriversLicenseEntity()
    }

    find = async (id: string) => {
        console.log(id)
        return new DriversLicenseEntity()
    }

    update = async (
        id: string,
        driverslicense: Partial<DriversLicenseEntity>
    ) => {
        console.log(id, driverslicense)
        return new DriversLicenseEntity()
    }

    delete = async (id: string) => {
        console.log(id)
    }
}
