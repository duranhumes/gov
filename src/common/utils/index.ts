import * as uuid from 'uuid/v4'
import * as escape from 'escape-html'

/**
 * Check if object is plain or has extra properties
 * like a date object.
 *
 * @param {object} obj
 *
 * @returns boolean
 */
export function isPlainObject(obj: object) {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        obj.constructor === Object &&
        Object.prototype.toString.call(obj) === '[object Object]'
    )
}

/**
 *
 * @param {object} obj
 *
 * Check if object is empty
 *
 * @returns boolean
 */
export function isEmpty(obj: object) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false
        }
    }

    return true
}

/**
 *
 * @param {object} obj
 * @param {array} keys
 *
 * Returns new object with only keys
 * specified in keys param
 */
export function pick(obj: object, keys: string[]) {
    return Object.assign(
        {},
        ...keys.map(k => (k in obj ? { [k]: obj[k] } : {}))
    )
}

/**
 *
 * @param {promise} promise
 *
 * Returns the value from a promise and an error if it exists.
 *
 * @returns {array} [value, error]
 */
interface CustomError extends Error {
    code: string | number
}
export async function promiseWrapper<E = CustomError>(
    promise: Promise<any>
): Promise<[any | undefined, undefined | E]> {
    try {
        return [await promise, undefined]
    } catch (e) {
        return [undefined, e]
    }
}

/**
 *
 * @param {object} obj
 * @param {array} keys
 *
 * Returns new object without keys
 * specified in keys param
 */
export function reject(obj: object, keys: string[]) {
    return Object.assign(
        {},
        ...Object.keys(obj)
            .filter(k => !keys.includes(k))
            .map(k => ({ [k]: obj[k] }))
    )
}

/**
 *
 * @param {object} entity
 * @param {array} fields
 *
 * @returns An object with all entity
 * properties except fields specified
 */
export function filterEntity(
    entity: object = {},
    fields: string[] = []
): object {
    const fieldsToExclude = ['password'].concat(fields)

    // If entity param is an array of entities loop through
    // and return the new array.
    if (Array.isArray(entity)) {
        return entity.map(e => {
            Object.assign(e, entityRecurse(e, fieldsToExclude))

            return reject(e, fieldsToExclude)
        })
    }

    Object.assign(entity, entityRecurse(entity, fieldsToExclude))

    return reject(entity, fieldsToExclude)
}

function entityRecurse(obj: object = {}, fieldsToExclude: string[]) {
    for (const key in obj) {
        if (obj[key] && typeof obj[key] === 'object') {
            Object.assign(obj, {
                [key]: filterEntity(obj[key], fieldsToExclude),
            })
        }
    }

    return obj
}

/**
 * Boils uuid string down to only numbers and letters
 *
 * @returns string
 */
export function formattedUUID() {
    return uuid().replace(/[^a-z0-9]/gi, '')
}

/**
 * Escapes and removed all extra spaces
 *
 * @param str string to be escaped
 *
 * @returns string
 */
export function escapeString(str: string) {
    return escape(String(str))
        .replace(/\s+/g, ' ')
        .trim()
}

/**
 * Convert typescript enums to arrays
 */
export function enumToArray<E>(E: any): E[] {
    const keys = Object.keys(E).filter(k => typeof E[k as any] === 'string')

    return keys.map(k => E[k as any])
}
