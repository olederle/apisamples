import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/';
import { Users } from '../database';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([Users])],
})
export class RestModule {}
