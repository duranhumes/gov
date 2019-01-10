import {
    DriversLicenceRepository,
    DriversLicenceEntity,
} from '../../domain/DMV'
import { CreateDMVRecordCmd } from './DMVCommands'

export class DMVService {
    driversLicenceRepo: DriversLicenceRepository

    constructor() {
        this.driversLicenceRepo = new DriversLicenceRepository()
    }

    /**
     * Creates a new drivers licence
     */
    async createDriversLicence({
        driverId,
        licenceNo,
        expiryDate,
    }: CreateDMVRecordCmd): Promise<void> {
        const driversLicence = new DriversLicenceEntity()
        Object.assign(driversLicence, { driverId, licenceNo, expiryDate })

        await this.driversLicenceRepo.create(driversLicence)
    }
}
