import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "../entities/task.entity";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";
import { EmployeeModule } from "../employee/employee.module";


@Module({
  imports: [TypeOrmModule.forFeature([Task]), EmployeeModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService]
})
export class TaskModule{}