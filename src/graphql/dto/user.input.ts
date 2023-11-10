import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
class CreateAddressesDto {
  @Field() readonly city: string;
  @Field() readonly state: string;
  @Field() readonly country: string;
}

@InputType()
export class CreateUsersDto {
  @Field() readonly login: string;
  @Field() readonly firstName: string;
  @Field() readonly lastName: string;
  @Field() readonly isActive: boolean;
  @Field() readonly addresses: CreateAddressesDto;
}

@InputType()
export class UpdateUserDto {
  @Field(() => Int) readonly id: number;
  @Field({ nullable: true }) readonly login?: string;
  @Field({ nullable: true }) readonly firstName?: string;
  @Field({ nullable: true }) readonly lastName?: string;
  @Field({ nullable: true }) readonly isActive?: boolean;
}
