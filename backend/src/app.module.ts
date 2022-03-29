import { Module } from '@nestjs/common';
import { UsersModule } from './api/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './shared/config/config.module';
import { ConfigService } from './shared/config/config.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './shared/guards/auth.guard';
import { CepService } from './api/cep/cep.service';
import { CepModule } from './api/cep/cep.module';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.environment.database.host,
        port: configService.environment.database.port,
        username: configService.environment.database.username,
        password: configService.environment.database.password,
        database: configService.environment.database.database,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.environment.database.synchronize,
        charset: 'utf8mb4',
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ConfigModule,
    CepModule,
  ],
  controllers: [],
  providers: [CepService],
})
export class AppModule {}
