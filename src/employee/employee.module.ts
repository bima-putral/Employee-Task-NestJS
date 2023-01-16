import { Module } from "@nestjs/common";
import { Employee } from "../entities/employee.entity";
import { EmployeeController } from "./employee.controller";
import { EmployeeService } from "./employee.service";
import { TypeOrmModule } from "@nestjs/typeorm";


@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService]
})
export class EmployeeModule{}