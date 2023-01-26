import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { TaskModule } from "../src/task/task.module";
import { faker } from "@faker-js/faker";
import { EmployeeModule } from "../src/employee/employee.module";
import { EmployeeDTO } from "../src/employee/dto/employee.dto";
import { TaskDTO } from "../src/task/dto/task.dto";


describe('TaskController (e2e)', () => {

  let app: INestApplication;

  const mockedEmployee: EmployeeDTO = {
    name: faker.name.fullName()
  }

  const mockedTask: TaskDTO = {
    title: faker.name.fullName(),
    description: faker.name.fullName(),
    employeeId: faker.datatype.uuid()
  }

  beforeAll(async () => {
    const modelMixture: TestingModule = await Test.createTestingModule({
      imports: [
          TaskModule,
        EmployeeModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: '127.0.0.1',
          port: 5432,
          username: 'postgres',
          password: 'abcd12345',
          database: 'employee_task_nest_db',
          entities: ['src/**/*.entity.{ts,js}'],
          synchronize: false,
        })
      ],
    }).compile();

    app = modelMixture.createNestApplication();
    await app.init();
  })


  afterAll(async () => {
    await app.close();
  });


  it('/task (GET) task list', async () => {
    const result = await request(app.getHttpServer())
        .get('/task');
    expect(result.status).toBe(200);
  })

  describe("/task (POST) Should create a new task", () => {

    it('/employee (POST) Should create a new employee', async () => {
      const resultEmployee = await request(app.getHttpServer())
        .post('/employee')
        .send(mockedEmployee);

      mockedTask.employeeId = resultEmployee.body.id

      const resultTask = await request(app.getHttpServer())
        .post('/task')
        .send(mockedTask);

      expect(resultTask.status).toBe(201);
    });
  })

})