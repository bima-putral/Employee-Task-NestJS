import { Injectable } from "@nestjs/common";
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
    return await this.repo.find()
  }

  async createEmployee(dto: EmployeeDTO) {
    const createdEmployee = await this.repo.save({ name: dto.name })
    return await this.repo.findBy({ id: createdEmployee.id })
  }


}