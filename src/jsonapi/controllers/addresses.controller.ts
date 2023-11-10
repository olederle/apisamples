import { Addresses } from '../../database';
import { JsonApi, JsonBaseController } from 'json-api-nestjs';

@JsonApi(Addresses, {
  overrideRoute: 'jsonapi/addresses',
})
export class AddressesController extends JsonBaseController<Addresses> {}
