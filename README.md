# Task Management System

This is a Task Management System built using Node.js and TypeScript. It allows you to manage and track tasks, deadlines, and progress.

## Features

- Create, update, and delete tasks
- Assign tasks to users
- Set due dates and priorities for tasks
- Track task progress and completion status
- User API: Create, update, delete, and retrieve user information

## Prerequisites

- Node.js
- npm

## Getting Started

1.  Clone the repository:

    ```
    https://github.com/DevAmmadAli/Task-Management-System-Backend-Node.git
    ```

2.  Install dependencies:

    ```
    cd task-management-system-backend-node
    npm install
    ```

3.  Set up environment variables:
    - Create a `.env` file in the root directory.
    - Provide the following variables:
      ```
      NODE_ENV="development" or "production"
      DB_CONN_STRING_PROD=your-prod-mongo-URL
      DB_CONN_STRING_LOCAL=your-local-mongo-address
      PORT=your-nodeapp-port
      SECRETKEY=your-secret-key
      ORIGIN=frontend-origin-address
      ```
4.  Run the app:
    - Run the app for development.
      ```
      npm run dev
      ```
    - Run the app for production.
      ```
      npm run prod
      ```

## User API

The user API allows you to perform CRUD operations on user information. Below are the available endpoints:

- **POST /users**: Create a new user
- **POST /users/login**: login a new user
- **GET /users**: Retrieve all users
- **GET /users/:id**: Retrieve user by ID
- **GET /users/current**: Retrieve the login user details by ID
- **PUT /users/:id**: Update user by ID
- **DELETE /users/:id**: Delete user by ID

Please refer to the API documentation for more details on request and response formats.

## Task API

The task API allows you to perform CRUD operations on task information. Below are the available endpoints:

- **POST /tasks**: Create a new task
- **GET /tasks**: Retrieve all tasks
- **GET /tasks/:id**: Retrieve task by ID
- **PUT /user/:id**: Update task by ID
- **DELETE /user/:id**: Delete task by ID

Please refer to the API documentation for more details on request and response formats.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.
