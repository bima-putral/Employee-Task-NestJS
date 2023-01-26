import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "../entities/task.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { TaskDTO } from "./dto/task.dto";
import { EmployeeService } from "../employee/employee.service";


@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    protected readonly repo: Repository<Task>,
    private servEmployee: EmployeeService
  ) {
  }

  async getAllTask() {
    return await this.repo.find({ relations: ['employee'] })
  }

  async findTaskById(p_taskId: string) {
    const existTask = await this.repo.findOneOrFail({ where: { id: p_taskId } })
    if (existTask) {
      return existTask
    } else {
      throw new HttpException(`Task with id ${p_taskId} not found`, HttpStatus.NOT_FOUND)
    }
  }

  async createTask(dto: TaskDTO) {
    const existEmployee = await this.servEmployee.findEmployee(dto.employeeId);
    return await this.repo.save({ title: dto.title, description: dto.description, employee: existEmployee })
  }

  async updateTask(id: string, dto: TaskDTO) {
    const existTask = await this.findTaskById(id);
    const existEmployee = await this.servEmployee.findEmployee(dto.employeeId);
    await this.repo.update(existTask.id, { title: dto.title, description: dto.description, employee: existEmployee })
    return await this.repo.findOneOrFail({ where: { id: existTask.id }, relations: ['employee'] })
  }

  async deleteTask(id: string) {
    const existTask = await this.findTaskById(id)
    return await this.repo.delete(existTask.id)
  }

}