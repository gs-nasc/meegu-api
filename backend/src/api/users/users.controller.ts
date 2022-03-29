import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';

import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Get()
    async findAll(): Promise<User[]> {
        return await this.usersService.findAll();
    }

    @Get(":id")
    async findById(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return await this.usersService.findById(id);
    }

    @Post()
    async create(@Body() user: User): Promise<User> {
        return await this.usersService.create(user);
    }

    @Put(":id")
    async update(@Param('id', ParseIntPipe) id: number, @Body() user: User): Promise<User> {
        return await this.usersService.update(id, user);
    }

    @Get("?")
    async findByName(@Query("name") name: string): Promise<User> {
        return await this.usersService.findByName(name);
    }

    @Delete(":id")
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return await this.usersService.delete(id);
    }
}
