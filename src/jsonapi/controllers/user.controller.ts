import { Users } from '../../database';
import { JsonApi, excludeMethod, JsonBaseController } from 'json-api-nestjs';

@JsonApi(Users, {
  allowMethod: excludeMethod(['deleteRelationship']),
  requiredSelectField: false,
  overrideRoute: 'jsonapi/users',
})
export class UserController extends JsonBaseController<Users> {}
