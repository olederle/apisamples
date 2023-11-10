import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AddressesDto } from './address.dto';

@ObjectType()
export class UsersDto {
  @Field(() => Int) readonly id: number;
  @Field() readonly login: string;
  @Field() readonly firstName: string;
  @Field() readonly lastName: string;
  @Field() readonly isActive: boolean;
  @Field(() => AddressesDto) readonly address: AddressesDto;
}
