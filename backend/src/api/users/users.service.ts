import { BadRequestException, Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './entities/user.entity';
import { User } from './interfaces/user.interface';
import Util from './users.util';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) { }

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
    async findByName(name: string): Promise<User> {
        const user = await this.userRepository.findOne({ name });
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

        const userEntity = this.userRepository.create(user);
        return userEntity;
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
