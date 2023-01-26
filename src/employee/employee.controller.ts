import { EmployeeService } from "./employee.service";
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
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

  @ApiBody({ type: EmployeeDTO })
  @Put(":id")
  async updateEmployee(@Param("id") id: string, @Body() dto: EmployeeDTO) {
    return await this.servEmployee.updateEmployee(id, dto)
  }

  @Delete(":id")
  async deleteEmployee(@Param("id") id: string) {
    return await this.servEmployee.deleteEmployee(id)
  }

}