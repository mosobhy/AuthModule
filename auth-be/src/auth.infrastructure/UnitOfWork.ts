import { Injectable } from "@nestjs/common";
import { IUnitOfWork } from "src/auth.domain/interfaces/IUnitOfWork";
import { UserRepository } from "./repositories/UserRepository";

@Injectable()
export class UnitOfWork implements IUnitOfWork {

    constructor(
        public readonly UserRepository: UserRepository
    ) { }
}