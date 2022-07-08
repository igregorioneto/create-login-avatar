import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import * as bcrypt from 'bcrypt';

@Entity()
export class Profile {
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

    @Column({ name: 'name', type: 'varchar', length: 50 })
    name: string;

    @Column({ name: 'avatar_id', unique: true })
    @ApiProperty({ required: false, type: 'number' })
    avatarId: string;

    @Column({ name: 'email', type: 'varchar', length: 255 })
    email: string;

    @Column({ name: 'password', type: 'varchar', length: 255 })
    password: string;

    @Column({ name: 'birth_date', type: 'datetime' })
    birthDate: Date;

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


    @OneToOne(() => File, {
        cascade: ['insert', 'update']
    })
    @JoinColumn([{ name: 'avatar_id', referencedColumnName: 'id' }])
    @ApiProperty({ required: false, type: 'File' })
    avatar?: File;

    async hashPassword() {
        if (this.password !== null)
            this.password = await bcrypt.hash(this.password, 8);
    }

    async validatePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }

}