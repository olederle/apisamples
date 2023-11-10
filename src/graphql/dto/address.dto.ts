import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AddressesDto {
  @Field(() => Int) readonly id: number;
  @Field() readonly city: string;
  @Field() readonly state: string;
  @Field() readonly country: string;
}
