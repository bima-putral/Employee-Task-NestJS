import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class EmployeeDTO {

  @ApiProperty({ example: "Bima", description: "Name of employee" })
  @IsNotEmpty()
  name: string;

}