import { Module } from '@nestjs/common';
import { JsonApiModule as NestJsJsonApiModule } from 'json-api-nestjs';
import { HttpModule } from '@nestjs/axios';
import { Users, Addresses, Comments, Roles, BookList } from '../database';

import {
  AddressesController,
  BookListController,
  CommentsController,
  RolesController,
  UserController,
} from './controllers';

@Module({
  imports: [
    NestJsJsonApiModule.forRoot({
      controllers: [
        AddressesController,
        BookListController,
        CommentsController,
        RolesController,
        UserController,
      ],
      entities: [Addresses, BookList, Comments, Roles, Users],
      imports: [HttpModule],
      options: {
        debug: true,
        requiredSelectField: false,
      },
    }),
  ],
})
export class JsonApiModule {}
