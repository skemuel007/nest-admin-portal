import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';

/**
 * To run migrations see this article
 * https://anjith-p.medium.com/typeorm-database-migrations-in-nestjs-apps-ace923edf1bf
 * https://github.com/ambroiseRabier/typeorm-nestjs-migration-example
 */
@Module({
  imports: [
    UserModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'admin',
      synchronize: true,
      autoLoadEntities: true, // do not use in production
      // migrations: ["dist/migrations/*{.ts,.js}"],
      // migrationsTableName: "migrations_typeorm",
      // migrationsRun: true
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
