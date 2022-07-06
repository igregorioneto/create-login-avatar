import { Inject, Type } from "@nestjs/common";
import { Constructor } from "src/shared/types";
import { BaseEntityID } from "../models/base-entity-id";
import { BaseServiceCrud } from "../services/base-service-crud";
import { BaseControllerReadOnlyInterface } from "./base-controller-read-only";

export interface BaseControllerCrudInterface<Entity>
    extends BaseControllerReadOnlyInterface<Entity> {
        readonly resourceService: BaseServiceCrud<Entity>;
        create?: (dto: Entity) => Promise<Entity>;
    }

export function BaseControllerCrud<Entity extends BaseEntityID>(init: {
    routePath: string;
    entity: Constructor<Entity>;
    service: Constructor<BaseServiceCrud<Entity>>;
    allowArray?: boolean;
}): Type<BaseControllerCrudInterface<Entity>> {
    class BaseControllerCrud
        extends BaseControllerReadOnly(init)
        implements BaseControllerCrudInterface<Entity> {
            constructor(
                @Inject(init.service)
                readonly resourceService: BaseServiceCrud<Entity>,
            ) {
                super(resourceService)
            }
        }
}
