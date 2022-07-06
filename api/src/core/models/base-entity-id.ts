import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseEntityID {
    
    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
        name: 'id',
    })
    @ApiProperty({ required: true, type: 'number' })
    id?: number;

}