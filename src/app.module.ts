import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { DatabaseModule } from './database';
import { GraphQlModule } from './graphql';
import { JsonApiModule } from './jsonapi';
import { RestModule } from './rest';

@Module({
  imports: [
    DatabaseModule,
    JsonApiModule,
    RestModule,
    GraphQlModule,
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'debug',
      },
    }),
  ],
})
export class AppModule {}
