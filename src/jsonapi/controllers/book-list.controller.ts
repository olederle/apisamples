import { ParseUUIDPipe } from '@nestjs/common';
import { BookList } from '../../database';
import { JsonApi, JsonBaseController } from 'json-api-nestjs';

@JsonApi(BookList, {
  pipeForId: ParseUUIDPipe,
  overrideRoute: 'jsonapi/book-list',
})
export class BookListController extends JsonBaseController<BookList> {}
