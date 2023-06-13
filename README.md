## Backend for Customer Management

This project implements a backend for a simple customer management system using Node.js, Express, and MongoDB. It provides REST endpoints for retrieving, adding, updating, and deleting customer information.

### Prerequisites

To run the backend locally, you need to have the following prerequisites:

- Node.js (version 12 or higher)
- MongoDB (installed and running)

### Installation

1. Clone the repository to your local machine.

```shell
git clone https://github.com/your-username/customerDataBackend.git
```

2. Navigate to the project directory.

```shell
cd customerDataBackend
```

3. Install the dependencies.

```shell
npm install
```

This command reads the package.json file in the project directory and automatically installs all the dependencies listed in it.

Once the command completes, all the required dependencies should be successfully installed, and the project is ready to use.

4. Start the backend.

```shell
npm start
```

The backend is now running at http://localhost:3000.

### REST Endpoints

The backend provides the following REST endpoints:

- `GET /customers/:id` - Retrieves a customer by their ID.
- `POST /customers` - Adds a new customer.
- `PUT /customers/:id` - Updates a customer by their ID.
- `DELETE /customers/:id` - Deletes a customer by their ID.

For more details on each endpoint, refer to the Swagger documentation.

### Swagger Documentation

The Swagger documentation for the REST endpoints is accessible at the `/api-docs` path. It provides information about the available endpoints, parameters, return values, data structures, and possible status codes and error messages.

### Automated Tests

The project includes automated tests for the REST endpoints. The tests are implemented using Jest and Supertest. To run the tests, use the following command:

```shell
npm test
```
