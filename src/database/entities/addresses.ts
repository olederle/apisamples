import {
  PrimaryGeneratedColumn,
  OneToOne,
  Column,
  Entity,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmpty, IsOptional, Length } from 'class-validator';

import { Users, IUsers } from '.';

export type IAddresses = Addresses;

@Entity('addresses')
export class Addresses {
  @PrimaryGeneratedColumn()
  public id!: number;

  @IsOptional()
  @Length(3, 70)
  @Column({
    type: 'varchar',
    length: 70,
    nullable: true,
    default: 'NULL',
  })
  public city!: string;

  @IsOptional()
  @Length(3, 70)
  @Column({
    type: 'varchar',
    length: 70,
    nullable: true,
    default: 'NULL',
  })
  public state!: string;

  @IsOptional()
  @Length(3, 68)
  @Column({
    type: 'varchar',
    length: 68,
    nullable: true,
    default: 'NULL',
  })
  public country!: string;

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

  @OneToOne(() => Users, (item) => item.addresses)
  public user!: IUsers;
}
