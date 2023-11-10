import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, IsEmpty } from 'class-validator';

@Entity('users_have_roles')
export class UsersHaveRoles {
  @PrimaryGeneratedColumn()
  public id!: number;

  @IsNotEmpty()
  @Column({
    name: 'user_id',
    type: 'int',
    nullable: false,
    unique: false,
  })
  public userId!: number;

  @IsNotEmpty()
  @Column({
    name: 'role_id',
    type: 'int',
    nullable: false,
    unique: false,
  })
  public roleId!: number;

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
}
