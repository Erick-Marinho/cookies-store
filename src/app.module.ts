import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import serverConfig from './config/server.config';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost/cookie-store'),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [serverConfig],
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
