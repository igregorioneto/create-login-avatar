import { BaseServiceReadOnly } from "../services/base-service-read-only";

export interface BaseControllerReadOnlyInterface<Entity> {
    readonly resourceService: BaseServiceReadOnly<Entity>;
    findAll?: () => Promise<Entity[]>;
    findOne?: (id: number) => Promise<Entity>;
}