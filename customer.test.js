import request from 'supertest';
import { app, server, db } from './index';
import { Customer } from './Customer';
import { v4 as uuidv4 } from 'uuid';


const testCustomer = new Customer(
  null,
  'Test First Name 1',
  'Test Last Name 1',
  'test@example.com',
  {
    street: 'Test Street 1',
    city: 'Test City',
    zip: '12345'
  }
);

beforeAll(async () => {
  const result = await db.createCustomer(testCustomer);
  testCustomer._id = result.insertedId;
});

afterAll(async () => {
  await db.deleteCustomer(testCustomer._id);

  server.close();
  db.close();
});

describe('GET /customers', () => {
    it('should return a list of customers', async () => {
        const response = await request(app).get('/customers');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeTruthy();
        expect(response.body.length).toBeGreaterThan(0);
    });
});

describe('GET /customers/:id', () => {
  it('should return a single customer', async () => {
    const response = await request(app).get('/customers/' + testCustomer._id);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it('should return 404 if customer not found', async () => {
    const response = await request(app).get('/customers/AAAbad54ec5fc960aebee036');
    expect(response.statusCode).toBe(404);
  });
});

describe('POST /customers', () => {
    it('should create a new customer', async () => {
        const customer = new Customer(
            null,
          'Test First Name 2',
          'Test Last Name 2',
          'test2@example.com',
          {
            street: 'Test Street 2',
            city: 'Test City',
            zip: '54321'
          }
        );
        const response = await request(app).post('/customers').send(customer);
        expect(response.statusCode).toBe(201);
        expect(response.body).toBeTruthy();
        expect(response.body._id).toBeTruthy();
        expect(response.body.firstName).toBe(customer.firstName);
        expect(response.body.lastName).toBe(customer.lastName);
        expect(response.body.email).toBe(customer.email);
        expect(response.body.address.street).toBe(customer.address.street);
        expect(response.body.address.city).toBe(customer.address.city);
        expect(response.body.address.zip).toBe(customer.address.zip);
      
        await db.deleteCustomer(response.body._id);
      });

    it('should fail because of missing first name', async () => {
        const customer = new Customer(
          null,
          null,
          'Test Last Name 2',
          'test3@example.com',
          {
            street: 'Test Street 3',
            city: 'Test City',
            zip: '98765'
          }
        );
    const response = await request(app).post('/customers').send(customer);
    expect(response.statusCode).toBe(400);
});
});
      


describe('PUT /customers/:id', () => {
  it('should update a customer', async () => {
    const customer = new Customer(
      testCustomer._id,
      'Test First Name Put',
      'Test Last Name Put',
      'test4@example.com',
      {
        street: 'Test Street 4',
        city: 'Test City',
        zip: '24680'
      }
    );
    const response = await request(app).put('/customers/' + testCustomer._id).send(customer);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeTruthy();
    expect(response.body._id).toBeTruthy();
    expect(response.body.firstName).toBe(customer.firstName);
    expect(response.body.lastName).toBe(customer.lastName);
    expect(response.body.email).toBe(customer.email);
    expect(response.body.address.street).toBe(customer.address.street);
    expect(response.body.address.city).toBe(customer.address.city);
    expect(response.body.address.zip).toBe(customer.address.zip);

    // Verify that the customer was updated
    const updatedCustomer = await db.getCustomerById(testCustomer._id);
    expect(updatedCustomer).toBeTruthy();
    expect(updatedCustomer.firstName).toBe(customer.firstName);
    expect(updatedCustomer.lastName).toBe(customer.lastName);
    expect(updatedCustomer.email).toBe(customer.email);
    expect(updatedCustomer.address.street).toBe(customer.address.street);
    expect(updatedCustomer.address.city).toBe(customer.address.city);
    expect(updatedCustomer.address.zip).toBe(customer.address.zip);
  });
});

describe('DELETE /customers/:id', () => {
  it('should delete a customer', async () => {
    const response = await request(app).delete('/customers/' + testCustomer._id);
    expect(response.statusCode).toBe(204);

    // Verify that the customer was deleted
    const deletedCustomer = await db.getCustomerById(testCustomer._id);
    expect(deletedCustomer).toBeNull();
  });
});
