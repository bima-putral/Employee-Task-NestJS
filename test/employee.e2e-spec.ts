import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { EmployeeModule } from "../src/employee/employee.module";
import { EmployeeDTO } from "../src/employee/dto/employee.dto";
import  { faker } from "@faker-js/faker";


describe('EmployeeController (e2e)', () => {

  let app: INestApplication;

  const mockedEmployee: EmployeeDTO = {
    name: faker.name.fullName()
  }

  beforeAll(async () => {
    const modelMixture: TestingModule = await Test.createTestingModule({
      imports: [
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


  it('/employee (GET) employee list', async () => {
    const result = await request(app.getHttpServer())
        .get('/employee');
    expect(result.status).toBe(200);
  })

  it('/employee (POST) Should create a new employee', async () => {
    return request(app.getHttpServer())
      .post('/employee')
      .send(mockedEmployee)
      .expect(201);
  });

})