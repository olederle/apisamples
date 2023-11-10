import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/database';
import { ILike, Repository } from 'typeorm';
import { CreateUsersDto, UpdateUserDto, UsersDto } from '../dto';
import {
  ApiBody,
  ApiNotFoundResponse,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('/rest/users')
export class UsersController {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  @Get()
  @ApiResponse({
    description: 'List of users',
    isArray: true,
    type: UsersDto,
  })
  @ApiQuery({
    name: 'login',
    required: false,
    type: 'string',
    description: 'A like filter for the login name',
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    enum: ['asc', 'desc'],
    type: 'string',
    description: 'The sort condition for login name',
  })
  async findAll(
    @Query('login') login?: string,
    @Query('sort') sort?: 'asc' | 'desc',
  ): Promise<UsersDto[]> {
    return this.usersRepository.find({
      relations: {
        addresses: true,
      },
      select: {
        addresses: {
          id: true,
          city: true,
          state: true,
        },
        firstName: true,
        id: true,
        isActive: true,
        lastName: true,
        login: true,
      },
      where: {
        login: login ? ILike(`%${login || ''}%`) : undefined,
      },
      order: {
        login: sort,
      },
    });
  }

  @Get(':id')
  @ApiParam({
    description: 'The identifier of the user',
    name: 'id',
    required: true,
    example: 1,
  })
  @ApiResponse({
    description: 'The user with the specified identifier',
    status: 200,
    type: UsersDto,
  })
  @ApiNotFoundResponse({ description: 'If the user is not found' })
  async find(@Param('id') id: number): Promise<UsersDto> {
    const user = await this.usersRepository.findOne({
      relations: {
        addresses: true,
      },
      select: {
        addresses: {
          id: true,
          city: true,
          state: true,
        },
        firstName: true,
        id: true,
        isActive: true,
        lastName: true,
        login: true,
      },
      where: {
        id,
      },
    });

    if (user === null) {
      throw new NotFoundException();
    }

    return user;
  }

  @Post()
  @ApiBody({
    description: 'creates a new user',
    type: CreateUsersDto,
    required: true,
  })
  create(@Body() user: CreateUsersDto): Promise<UsersDto> {
    return this.usersRepository.save(user);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() user: UpdateUserDto,
  ): Promise<void> {
    await this.usersRepository.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.usersRepository.delete({
      id,
    });
  }
}
