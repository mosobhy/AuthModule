
export interface IGenericRepository<T> {
    createEntity(entity: T): Promise<T>
    updateEntity(id: string, entity: T): Promise<T | undefined>
    deleteEntity(id: string): Promise<void>
    getAllEntities(): Promise<T[]>
    getEntityById(id: string): Promise<T>
    getEntityByGenericField(fieldName: string, fieldValue: string): Promise<T | null>
}
