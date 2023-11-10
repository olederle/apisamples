import { ApiProperty } from '@nestjs/swagger';
import { AddressesDto } from './address.dto';

export class UsersDto {
  @ApiProperty() readonly id?: number;
  @ApiProperty() readonly login: string;
  @ApiProperty() readonly firstName: string;
  @ApiProperty() readonly lastName: string;
  @ApiProperty() readonly isActive: boolean;
  @ApiProperty() readonly addresses: AddressesDto;
}

class CreateAddressesDto {
  @ApiProperty() readonly city: string;
  @ApiProperty() readonly state: string;
  @ApiProperty() readonly country: string;
}

export class CreateUsersDto {
  @ApiProperty() readonly login: string;
  @ApiProperty() readonly firstName: string;
  @ApiProperty() readonly lastName: string;
  @ApiProperty() readonly isActive: boolean;
  @ApiProperty() readonly addresses: CreateAddressesDto;
}

export class UpdateUserDto {
  @ApiProperty() readonly login?: string;
  @ApiProperty() readonly firstName?: string;
  @ApiProperty() readonly lastName?: string;
  @ApiProperty() readonly isActive?: boolean;
}
