import { Roles } from '../../database';
import { JsonApi, JsonBaseController } from 'json-api-nestjs';

@JsonApi(Roles, {
  overrideRoute: 'jsonapi/roles',
})
export class RolesController extends JsonBaseController<Roles> {}
