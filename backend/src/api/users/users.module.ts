import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CepModule } from '../cep/cep.module';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        CepModule
    ],
    controllers: [
        UsersController
    ],
    providers: [
        UsersService
    ],
    exports: [
        UsersService
    ],
})
export class UsersModule {}
