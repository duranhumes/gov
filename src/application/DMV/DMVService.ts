import {
    DriversLicenseRepository,
    DriversLicenseEntity,
} from '../../domain/DMV'
import { ICreateDMVRecord } from './IDMV'

export class DMVService {
    driversLicenseRepo: DriversLicenseRepository

    constructor() {
        this.driversLicenseRepo = new DriversLicenseRepository()
    }

    /**
     * Creates a new drivers license
     */
    async createDriversLicense({
        driver,
        licenseNo,
        expiryDate,
    }: ICreateDMVRecord): Promise<void> {
        const driversLicense = new DriversLicenseEntity()
        Object.assign(driversLicense, { driver, licenseNo, expiryDate })

        await this.driversLicenseRepo.create(driversLicense)
    }
}
