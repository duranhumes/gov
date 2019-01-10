export interface IRepository<T> {
    create: (person: T) => Promise<Partial<T>>
    find: (id: string) => Promise<T>
    update: (id: string, person: Partial<T>) => Promise<T>
    delete: (id: string) => Promise<void>
}
