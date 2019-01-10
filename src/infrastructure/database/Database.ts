import { writeFileSync, readdir, unlink } from 'fs'
import { normalize, join } from 'path'
import { promisify } from 'util'
import {
    createConnection,
    ConnectionOptions,
    Connection,
    getManager,
} from 'typeorm'

import logging from '../../common/utils/logging'

const isProduction = process.env.NODE_ENV === 'production'
const isTesting = process.env.NODE_ENV === 'test'
const database = isTesting
    ? String(process.env.MYSQL_DATABASE_TEST)
    : String(process.env.MYSQL_DATABASE)

const infraDBPath = 'src/infrastructure/database'
const domainBasePath = 'src/domain'

class Database {
    connectionOptions: ConnectionOptions
    connection: Connection

    constructor() {
        this.connectionOptions = {
            database,
            type: 'mysql',
            maxQueryExecutionTime: 800,
            entities: [
                `${infraDBPath}/entities/**/index.ts`,
                `${domainBasePath}/**/entities/**/index.ts`,
            ],
            subscribers: [
                `${infraDBPath}/subscribers/**/index.ts`,
                `${domainBasePath}/**/subscribers/**/index.ts`,
            ],
            migrations: [`${infraDBPath}/migrations/*.ts`],
            host: String(process.env.MYSQL_HOST),
            port: Number(process.env.MYSQL_PORT),
            username: String(process.env.MYSQL_ROOT_USER),
            password: String(process.env.MYSQL_PASSWORD),
            logging: !isProduction && !isTesting,
            synchronize: true,
        }
        this.connection = new Connection(this.connectionOptions)
    }

    async init() {
        await this.openConnection()
        await this.genModelSchemas()

        console.info('=> DB successfully connected')
    }

    get isConnected() {
        return this.connection.isConnected
    }

    async openConnection() {
        try {
            this.connection = await createConnection(this.connectionOptions)
        } catch (err) {
            logging.error('Error in db connection', err, 500)
            console.error('Error in db connection: ', err)

            process.exit(1)
        }
    }

    async closeConnection() {
        try {
            await this.connection.close()
        } catch (err) {
            logging.error('Error in db connection close', err, 500)
            console.error('Error in db connection close: ', err)

            process.exit(1)
        }
    }

    async clearTables() {
        const entities = this.connection.entityMetadatas
        const manager = getManager()

        await manager.query('SET FOREIGN_KEY_CHECKS = 0;')

        for (const entity of entities) {
            const repository = await this.connection.getRepository(entity.name)
            const query = `TRUNCATE TABLE \`${entity.tableName}\`;`
            try {
                await repository.query(query)
            } catch (err) {
                // console.log(err)
            }
        }

        await manager.query('SET FOREIGN_KEY_CHECKS = 1;')
    }

    /**
     * Loop through all models and gen schemas
     * to validate against later
     */
    private async genModelSchemas() {
        try {
            const entities = this.connection.entityMetadatas
            const schemasDir = normalize(join(__dirname, 'schemas'))

            await this.clearSchemasDir(schemasDir)
            for (const entity of entities) {
                const entityName =
                    entity.name.charAt(0).toUpperCase() +
                    entity.name.slice(1).replace('Entity', 'Schema')
                const schemaFile = `${schemasDir}/${entityName}.ts`

                const modelSchema = this.connection.getMetadata(entity.name)
                    .propertiesMap

                const objKeys = Object.keys(modelSchema)
                const keys = objKeys.map((k: string) => `\n    '${k}'`)
                const template = `export default [${keys},\n]\n`

                writeFileSync(schemaFile, template)
            }

            console.info('=> Entity schemas created!')
        } catch (err) {
            console.error(err)

            process.exit(0)
        }
    }

    private async clearSchemasDir(directory: string) {
        const getFilesInDir = promisify(readdir)
        const remove = promisify(unlink)

        const files = await getFilesInDir(directory)
        const unlinkPromises = files.map((filename: string) =>
            remove(`${directory}/${filename}`)
        )

        await Promise.all(unlinkPromises)
    }
}

export default new Database()
