import { filterEntity } from '../../../common/utils'
import { PersonEntity } from '../../../domain/Person'

export const PersonView = (
    person: Partial<PersonEntity>,
    fields: string[] = []
) => filterEntity(person, fields)
