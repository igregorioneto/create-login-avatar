import { BaseEntityID } from "../models/base-entity-id";
import { BaseServiceRepository } from "./base-service-repository";

export abstract class BaseServiceReadOnly< T extends BaseEntityID > extends BaseServiceRepository<T> {
    findAll(): Promise<T[]> {
        return this.repository
            .find()
            .then((res) => this.onAfterFindAll(res));
    }

    findOne(id: number): Promise<T> {
        return this.repository.findOne(id);
    }

    protected onAfterFindAll(res: T[]): T[] | Promise<T[]> {
        return res;
    }
}