import { ApiProperty } from '@nestjs/swagger';

export class AddressesDto {
  @ApiProperty() readonly id?: number;
  @ApiProperty() readonly city: string;
  @ApiProperty() readonly state: string;
}
