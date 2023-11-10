import { Comments } from '../../database';
import { JsonApi, JsonBaseController } from 'json-api-nestjs';

@JsonApi(Comments, {
  overrideRoute: 'jsonapi/comments',
})
export class CommentsController extends JsonBaseController<Comments> {}
