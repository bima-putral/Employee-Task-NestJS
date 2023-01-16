import { BaseEntity } from "./base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Task } from "./task.entity";

@Entity()
export class Employee extends BaseEntity {

  @Column({ type: "varchar", length: 300 })
  name: string;

  @OneToMany(() => Task, p => p.employee)
  task: Task[]

}