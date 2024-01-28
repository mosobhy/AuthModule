import { IGenericRepository } from "./IGenericRepository";
import { User } from "../entities/User";

export interface IUnitOfWork {

    UserRepository: IGenericRepository<User> 
}