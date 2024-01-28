import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User } from 'src/auth.domain/entities/User'
import { IGenericRepository } from 'src/auth.domain/interfaces/IGenericRepository'

@Injectable()
export class UserRepository implements IGenericRepository<User> {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>
    ) { }
    
    async createEntity(user: User): Promise<any> {
        const newUser = new this.userModel(user);
        return await newUser.save();
    }

    async updateEntity(id: string, user: User): Promise<User | undefined> {
        return await this.userModel.findByIdAndUpdate(id, user, { new : true})
    }

    async deleteEntity(id: string): Promise<void> {
        await this.userModel.findByIdAndDelete(id)
    }

    async getAllEntities(): Promise<User[]> {
        return await this.userModel.find().exec()    
    }

    async getEntityById (id: string): Promise<User> {
        return await this.userModel.findById(id).exec()
    }

    async getEntityByGenericField(fieldName: string, fieldValue: string): Promise<User | null> {
        const query = {}
        query[fieldName] = fieldValue
        const user = await this.userModel.findOne(query)
        return user ? user : null
    }
}