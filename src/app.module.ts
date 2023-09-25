import { Module } from '@nestjs/common';
import { ClientesModule } from './clientes/clientes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'pruebatcc',
      autoLoadEntities: true,
      // synchronize: true,
    }),
    ClientesModule,
  ],
})
export class AppModule {}
