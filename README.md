# FINAL Outbuild Backend Assessment - Esteban Sampedro

## Objective

The goal of this project is to develop a scalable and secure API using Express and PostgreSQL (NeonTech Database), capable of handling large datasets efficiently. This API allows users to manage schedules and activities, ensuring that key backend principles such as software best practices, TDD, error handling, logging, security, and architecture design are applied.

## Features

- **User Authentication:** Secure user registration and authentication using JWT tokens.
- **Schedules Management:**
  - Create Schedule: Create an empty schedule (with no activities).
  - Get Schedule: Retrieve a schedule along with its activities.
- **Activities Management:**
  - Add Activity: Add a single activity to a schedule.
  - Add Multiple Activities: Bulk add multiple activities to a schedule.
- **API Documentation:** Interactive API documentation available via Swagger UI.
- **Security Measures:**
  - Authentication middleware to secure endpoints.
  - Authorization checks to ensure users can only access their own schedules.
  - Use of Data Transfer Objects (DTOs) to prevent exposing database entities directly.
- **Error Handling:** Centralized error handling to manage and respond appropriately to different types of errors.
- **Logging:** Implemented logging for each transaction using Winston.
- **Testing:** Automated tests covering the four main use cases using Jest and Supertest.

## Technologies Used

- **Node.js:** JavaScript runtime environment.
- **Express.js:** Web framework for Node.js.
- **PostgreSQL (NeonTech):** Relational database system.
- **Sequelize:** Promise-based Node.js ORM for PostgreSQL.
- **JWT:** JSON Web Tokens for authentication.
- **Winston:** Logging library.
- **Swagger:** API documentation.
- **Jest:** JavaScript testing framework.
- **Supertest:** HTTP assertions for testing.
- **bcrypt:** Library for hashing passwords.


## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/outbuild-test-backend-essg.git
   cd outbuild-test-backend-essg
   ```
