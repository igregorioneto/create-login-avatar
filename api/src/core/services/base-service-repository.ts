import { Logger } from "@nestjs/common";
import { Repository } from "typeorm";
import { BaseEntityID } from "../models/base-entity-id";

export abstract class BaseServiceRepository<T extends BaseEntityID> {
    abstract readonly repository: Repository<T>;
    readonly logger: Logger = new Logger(this.constructor.name);
}