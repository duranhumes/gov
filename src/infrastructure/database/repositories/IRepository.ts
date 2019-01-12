export interface IRepository<T> {
    create: (data: T) => Promise<Partial<T>>
    find: (key: string, value: string) => Promise<T>
    update: (id: string, data: Partial<T>) => Promise<T>
    delete: (id: string) => Promise<void>
}
