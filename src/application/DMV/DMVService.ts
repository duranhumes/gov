import {
    DriversLicenseRepository,
    DriversLicenseEntity,
} from '../../domain/DMV'
import { CreateDMVRecordCmd } from './DMVCommands'

export class DMVService {
    driversLicenseRepo: DriversLicenseRepository

    constructor() {
        this.driversLicenseRepo = new DriversLicenseRepository()
    }

    /**
     * Creates a new drivers license
     */
    async createDriversLicense({
        driverId,
        licenseNo,
        expiryDate,
    }: CreateDMVRecordCmd): Promise<void> {
        const driversLicense = new DriversLicenseEntity()
        Object.assign(driversLicense, { driverId, licenseNo, expiryDate })

        await this.driversLicenseRepo.create(driversLicense)
    }
}
