import request from 'supertest';
import { app, server } from '../server.js';
import mongoose from 'mongoose';

describe('Task API Unit Tests', () => {
  it('should create a new task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ name: 'Unit Test Task', description: 'Test Description' });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Unit Test Task');
  });

  it('should fail to create task without name', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ name: '', description: 'No Name' });

    expect(res.statusCode).toBe(400);
  });
});

// ✅ Cleanup after all tests
afterAll(async () => {
  await mongoose.connection.close();
  if (server) server.close();
});
