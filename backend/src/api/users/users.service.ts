import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CepService } from '../cep/cep.service';
import { CEP } from '../cep/interface/cep.interface';

import { UserEntity } from './entities/user.entity';
import { User } from './interfaces/user.interface';
import Util from './users.util';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>, private cepService: CepService) { }

    /**
     * Find all users
     * @returns {Promise<User[]>}
     */
    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    };

    /**
     * Find a user by id
     * @param id User id
     * @returns {Promise<User>}
     */
    async findById(id: number): Promise<User> {
        const user = await this.userRepository.findOne(id);
        if(user == undefined || user == null) throw new UnprocessableEntityException('User not found');
        return user;
    }

    /**
     * Check if the user is valid
     * @param name User name
     * @returns {Promise<User>}
     */
    async findByName(name: string): Promise<User[]> {
        const user = await this.userRepository.createQueryBuilder('user').where('user.name LIKE :name', { name: `%${name}%` }).getMany();
        if(user == undefined || user == null) throw new UnprocessableEntityException('User not found');
        return user;
    }

    /**
     * Delete an user by id
     * @param id User id
     */
    async delete(id: number): Promise<void> {
        const user = await this.userRepository.findOne(id);
        if(user == undefined || user == null) throw new UnprocessableEntityException('User not found');
        await this.userRepository.delete(id);
    }

    /**
     * Create an user
     * @param user User to be created
     * @returns {Promise<User>}
     */
    async create(user: User): Promise<User> {
        Util.check(user);

        const cep: CEP = await this.cepService.getCep(user.zipcode.toString());

        user = {
            ...user,
            state: cep.uf,
            city: cep.localidade,
            neighborhood: cep.bairro,
            street: cep.logradouro,
        }

        return await this.userRepository.insert(user).then(() => user);
    }

    /**
     * Update an user
     * @param id User id
     * @param user User to be updated
     * @returns {Promise<User>}
     */
    async update(id: number, user: User): Promise<User> {
        Util.check(user);

        let userEntity = await this.userRepository.findOne(id);
        if(userEntity == undefined || userEntity == null) throw new UnprocessableEntityException('User not found');
        userEntity = {
            ...userEntity,
            ...user
        }

        return await this.userRepository.update(id, userEntity).then(() => userEntity);
    }
}
