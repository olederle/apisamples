import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToMany,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, Length, IsOptional, IsEmpty } from 'class-validator';

import { Users, IUsers } from '.';

export type IRoles = Roles;

@Entity('roles')
export class Roles {
  @PrimaryGeneratedColumn()
  public id!: number;

  @IsOptional()
  @Length(3, 128)
  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    default: 'NULL',
  })
  public name!: string;

  @IsNotEmpty()
  @Length(3, 128)
  @Column({
    type: 'varchar',
    length: 128,
    nullable: false,
    unique: true,
  })
  public key!: string;

  @IsOptional()
  @Column({
    name: 'is_default',
    type: 'boolean',
    default: 'false',
  })
  public isDefault!: boolean;

  @IsEmpty()
  @Column({
    name: 'created_at',
    type: 'datetime',
    nullable: true,
    default: () => "(datetime('now','localtime'))",
  })
  public createdAt!: Date;

  @IsEmpty()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'datetime',
    nullable: true,
    default: () => "(datetime('now','localtime'))",
  })
  public updatedAt!: Date;

  @ManyToMany(() => Users, (item) => item.roles)
  public users!: IUsers[];
}
