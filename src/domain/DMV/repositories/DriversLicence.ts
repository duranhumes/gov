import { DriversLicenceEntity } from '../entities'
import { IRepository } from '../../../infrastructure/database/repositories'

export class DriversLicenceRepository
    implements IRepository<DriversLicenceEntity> {
    create = async (driversLicence: DriversLicenceEntity) => {
        console.log(driversLicence)
        return new DriversLicenceEntity()
    }

    find = async (id: string) => {
        console.log(id)
        return new DriversLicenceEntity()
    }

    update = async (
        id: string,
        driversLicence: Partial<DriversLicenceEntity>
    ) => {
        console.log(id, driversLicence)
        return new DriversLicenceEntity()
    }

    delete = async (id: string) => {
        console.log(id)
    }
}
