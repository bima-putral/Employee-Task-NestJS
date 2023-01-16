import { EmployeeService } from "./employee.service";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { EmployeeDTO } from "./dto/employee.dto";
import { ApiBody, ApiTags } from "@nestjs/swagger";


@ApiTags("Employee")
@Controller("employee")
export class EmployeeController {
  constructor(
    private servEmployee: EmployeeService
  ) {
  }

  @Get()
  async getEmployee() {
    return await this.servEmployee.getAllEmployee()
  }

  @ApiBody({ type: EmployeeDTO })
  @Post()
  async createEmployee(@Body() dto: EmployeeDTO) {
    return await this.servEmployee.createEmployee(dto)
  }

}