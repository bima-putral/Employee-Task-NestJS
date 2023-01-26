import { TaskService } from "./task.service";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TaskDTO } from "./dto/task.dto";


@ApiTags("Task")
@Controller("task")
export class TaskController {

  constructor(
    private servTask: TaskService
  ) {
  }

  @Get()
  async getAllTask() {
    return await this.servTask.getAllTask();
  }

  @ApiBody({ type: TaskDTO })
  @Post()
  async createTask(@Body() dto: TaskDTO) {
    return await this.servTask.createTask(dto)
  }

  @ApiBody({ type: TaskDTO })
  @Put(":id")
  async updateTask(@Param("id") id: string, @Body() dto: TaskDTO) {
    return await this.servTask.updateTask(id, dto)
  }

  @Delete(":id")
  async deleteTask(@Param("id") id: string) {
    return await this.servTask.deleteTask(id)
  }



}