import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Employee } from './employees/employee.entity';
import { EmployeesModule } from './employees/employees.module';
import { readFileSync } from 'fs';
import 'dotenv/config';
import * as process from 'node:process';
import * as path from 'node:path';

const sslCertPath = path.join(__dirname, '..', 'certs', 'ca.pem');
const sslCert = readFileSync(sslCertPath).toString();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DBHOST,
      port: Number(process.env.DBPORT),
      username: process.env.DBUSER,
      password: process.env.DBPASSWORD,
      database: process.env.DBNAME,
      entities: [Employee],
      synchronize: true,
      logging: true,
      applicationName: 'org-tree',
      ssl: {
        rejectUnauthorized: true,
        ca: sslCert,
      },
    }),
    EmployeesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
