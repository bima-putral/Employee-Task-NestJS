import { BaseEntity } from "./base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Employee } from "./employee.entity";

@Entity()
export class Task extends BaseEntity {

  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Column({ type: "text" })
  description: string;

  @ManyToOne(() => Employee, p => p.task)
  employee: Employee;

}