import { ApiProperty } from "@nestjs/swagger";
import { AfterInsert, AfterLoad, BaseEntity, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity()
export class File {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id'
    })
    @ApiProperty({ required: true, type: 'number' })
    id: string;

    @Column('binary',{
        name: 'uuid',
        unique: true,
        length: 16,
        default: () => "'uuid_to_bin(uuid())'",
        transformer: {
            from: (value: Buffer) => value?.toString('hex'),
            to: (value: Buffer) => value
        }
    })
    uuid?: Buffer | string;

    @Column('varchar', { name: 'name', length: 255 })
    @ApiProperty({ required: true, type: 'string' })
    name: string;

    @Column('varchar', { name: 'type', length: 255 })
    @ApiProperty({ required: true, type: 'string' })
    type: string;

    @Column('float', { name: 'size_bytes', nullable: true, precision: 12 })
    @ApiProperty({ required: true, type: 'float' })
    sizeBytes: number;

    @ApiProperty({ required: false, type: 'string' })
    url: string;

    @ApiProperty({ required: false, type: 'base64 string' })
    file: string | undefined;

    @Column({
        name: 'created',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    @ApiProperty({ required: true, type: 'timestamp' })
    created?: Date;

    @Column({
        name: 'updated',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    @ApiProperty({ required: true, type: 'timestamp' })
    updated?: Date;

    @AfterLoad()
    @AfterInsert()
    setUrl(): void {
        this.url = [
            'http://localhost:3000',
            this.uuid.toString(),
            this.name,
        ].join('/');
    }
}