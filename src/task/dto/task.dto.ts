import { IsString, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class TaskDTO {

  @ApiProperty({ example: "Create Feature Dropdown", description: "title of task" })
  @IsString()
  title: string

  @ApiProperty({ example: "Fill with blue color", description: "description of task" })
  @IsString()
  description: string

  @ApiProperty({ example: "54b83bad-5f9d-46b3-9b13-dca6c73ee18b", description: "uuid of employee" })
  @IsUUID()
  employeeId: string

}