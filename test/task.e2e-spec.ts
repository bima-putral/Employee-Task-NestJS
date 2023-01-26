import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { TaskModule } from "../src/task/task.module";


describe('TaskController (e2e)', () => {

  let app: INestApplication;

  beforeAll(async () => {
    const modelMixture: TestingModule = await Test.createTestingModule({
      imports: [
          TaskModule,
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

})