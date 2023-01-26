import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Employee } from "../entities/employee.entity";
import { Repository } from "typeorm";
import { EmployeeDTO } from "./dto/employee.dto";

@Injectable()
export class EmployeeService {

  constructor(
    @InjectRepository(Employee)
    protected readonly repo: Repository<Employee>
  ) {

  }

  async getAllEmployee() {
    return await this.repo.find({ relations: ['task'] })
  }

  async findEmployee(p_employeeId: string) {
    const existEmployee = await this.repo.findOneOrFail({ where: { id: p_employeeId } })
    if (existEmployee) {
      return existEmployee
    } else {
      throw new HttpException(`Employee with id ${p_employeeId} not found`, HttpStatus.NOT_FOUND);
    }
  }

  async createEmployee(dto: EmployeeDTO) {
    return await this.repo.save({ name: dto.name })
  }

  async updateEmployee(id: string, dto: EmployeeDTO) {
    const existEmployee = await this.findEmployee(id);
    await this.repo.update(existEmployee.id, { name: dto.name })
    return await this.findEmployee(existEmployee.id)
  }

  async deleteEmployee(id: string) {
    const existEmployee = await this.findEmployee(id);
    return await this.repo.delete(existEmployee.id);
  }


}