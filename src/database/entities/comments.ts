import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmpty, IsNotEmpty, IsEnum } from 'class-validator';

export enum CommentKind {
  Comment = 'COMMENT',
  Message = 'MESSAGE',
  Note = 'NOTE',
}

import { Users, IUsers } from '.';

export type IComments = Comments;

@Entity('comments')
export class Comments {
  @PrimaryGeneratedColumn()
  public id!: number;

  @IsNotEmpty()
  @Column({
    type: 'text',
    nullable: false,
  })
  public text!: string;

  @IsNotEmpty()
  @IsEnum(CommentKind)
  @Column({
    type: 'text',
    enum: CommentKind,
    nullable: false,
  })
  public kind!: CommentKind;

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

  @ManyToOne(() => Users, (item) => item.id)
  @IsNotEmpty()
  @JoinColumn({
    name: 'created_by',
  })
  public createdBy!: IUsers;
}
