import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { mock_user_one, mock_user_two } from './fixtures/db';
import { UserService } from 'src/user/user.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {});

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const userService = app.get<UserService>(UserService);
    await userService.deleteUsers();
  });

  it('/user (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/user');

    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('/user (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/user')
      .send(mock_user_two);

    expect(response.status).toEqual(201);
    expect(response.body).toBeDefined();
    expect(response.body.id).toEqual(mock_user_two.id);
    expect(response.body.name).toEqual(mock_user_two.name);
    expect(response.body.email).toEqual(mock_user_two.email);
  });

  it(`user/${mock_user_one.name} (PUT)`, async () => {
    const response = await request(app.getHttpServer())
      .put(`/user/${mock_user_one.name}`)
      .send({
        name: 'New name',
      });

    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
    expect(response.body.id).toEqual(mock_user_one.id);
    expect(response.body.name).toEqual('New name');
    expect(response.body.email).toEqual(mock_user_one.email);
  });

  it(`user/${mock_user_one.id} (DELETE)`, async () => {
    const response = await request(app.getHttpServer()).delete(
      `/user/${mock_user_one.id}`,
    );

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(mock_user_one.id);
    expect(response.body.name).toEqual(mock_user_one.name);
    expect(response.body.email).toEqual(mock_user_one.email);
  });
});
