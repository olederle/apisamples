import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
  registerEnumType,
  Mutation,
  ObjectType,
  Field,
} from '@nestjs/graphql';
import { Addresses, Users } from '../../database';
import { CreateUsersDto, UpdateUserDto, UsersDto } from '../dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

export enum Sort {
  asc,
  desc,
}

registerEnumType(Sort, {
  name: 'Sort',
});

@ObjectType()
export class DeleteResultDto {
  @Field() affected: number;
}

@Resolver(() => UsersDto)
export class UsersResolver {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Addresses)
    private readonly addressedRepository: Repository<Addresses>,
  ) {}

  @Query(() => [UsersDto])
  async users(
    @Args('login', { type: () => String, nullable: true }) login?: string,
    @Args('sort', { type: () => Sort, nullable: true }) sort?: Sort,
  ) {
    return this.usersRepository.find({
      where: {
        login: login ? ILike(`%${login || ''}%`) : undefined,
      },
      order: {
        login:
          sort !== undefined ? (Sort.asc === sort ? 'asc' : 'desc') : undefined,
      },
    });
  }

  @Query(() => UsersDto)
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  @ResolveField()
  async address(@Parent() user: UsersDto) {
    const { id } = user;
    return this.addressedRepository.findOne({
      where: {
        user: {
          id,
        },
      },
    });
  }

  @Mutation(() => DeleteResultDto)
  async deleteUser(@Args('id', { type: () => Int }) id: number) {
    const result = await this.usersRepository.delete({
      id,
    });

    return {
      affected: result.affected || 0,
    };
  }

  @Mutation(() => UsersDto)
  async createUser(@Args('data') data: CreateUsersDto) {
    return this.usersRepository.save(data);
  }

  @Mutation(() => UsersDto)
  async updateUser(@Args('data') data: UpdateUserDto) {
    const { id, ...user } = data;
    await this.usersRepository.update(id, user);
    return await this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  // @Mutation(() => CreatePokemonDto)
  // async createPokemon (@Args('data') data: inputPokemon) {
  //     return this.pokemonService.createPokemon(data)
  // }
}
