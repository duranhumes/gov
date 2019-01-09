import { normalize, resolve } from 'path'
import * as bunyan from 'bunyan'
import * as RotatingFileStream from 'bunyan-rotating-file-stream'

const logSettings = {
    period: '1d',
    totalFiles: 2,
    threshold: '10m',
    totalSize: '20m',
    rotateExisting: true,
    gzip: true,
    startNewFile: true,
}

const projectDirBasePath = normalize(resolve(__dirname, '..', '..', '..'))
const date = new Date().toJSON().slice(0, 10)
const errorStreamerRotatedByLength = {
    type: 'raw',
    level: 'error',
    stream: new RotatingFileStream({
        path: `${projectDirBasePath}/logs/log-${date}.errors.log`,
        ...logSettings,
    }),
}

const infoStreamerRotatedByLength = {
    type: 'raw',
    level: 'info',
    stream: new RotatingFileStream({
        path: `${projectDirBasePath}/logs/log-${date}.log`,
        ...logSettings,
    }),
}

const mainLoggerStreams: RotatingFileStream[] = [
    infoStreamerRotatedByLength,
    errorStreamerRotatedByLength,
]

export const stream = bunyan.createLogger({
    name: String(process.env.APP_NAME),
    serializers: {
        req: require('bunyan-express-serializer'),
        res: bunyan.stdSerializers.res,
        err: bunyan.stdSerializers.err,
    },
    streams: mainLoggerStreams,
})

export function logger(id: any, body: any, statusCode: any) {
    const log = stream.child(
        {
            id,
            body,
            statusCode,
        },
        true
    )

    if (statusCode > 404) {
        return log.error(body)
    }

    return log.info(body)
}
