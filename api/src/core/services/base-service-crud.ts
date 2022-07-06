import { Constructor } from "src/shared/types";
import { DeepPartial, EntityManager } from "typeorm";
import { BaseEntityID } from "../models/base-entity-id";
import { BaseServiceReadOnly } from "./base-service-read-only";

export abstract class BaseServiceCrud<T extends BaseEntityID> extends BaseServiceReadOnly<T> {
    abstract readonly Entity: Constructor<T>;

    async create(dto: T): Promise<T> {
        dto = this.entityFromDto(dto);

        return this.repository.manager
            .transaction(async (transactionEntityManager) => {
                await this.beforeSave(
                    dto as unknown as DeepPartial<T>,
                    transactionEntityManager
                );

                await this.onBeforeUpdate(dto, transactionEntityManager);

                return transactionEntityManager.save(dto);
            })
            .then((value) => this.onAfterSave(value));
    }

    protected entityFromDto(dto: Partial<T>): T {
        return Object.assign(new this.Entity(), dto);
    }

    protected onAfterSave(dto: T): T | Promise<T> {
        return dto;
    }

    protected beforeSave(dto: DeepPartial<T>, trx?: EntityManager): Promise<T> {
        return;
    }

    protected onBeforeUpdate(dto: T, trx?: EntityManager): T | Promise<T> {
        return dto;
    }
}