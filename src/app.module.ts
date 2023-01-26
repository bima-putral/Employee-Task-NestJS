import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostgresConfigService } from "./common/database/postgres.connector";
import { EmployeeModule } from "./employee/employee.module";
import { TaskModule } from "./task/task.module";

const envFilePath = `.env`;

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: PostgresConfigService }),
    EmployeeModule,
    TaskModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
