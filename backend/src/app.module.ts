import { Module } from '@nestjs/common';
import { UsersController } from './api/users/users.controller';
import { UsersService } from './api/users/users.service';
import { UsersModule } from './api/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
