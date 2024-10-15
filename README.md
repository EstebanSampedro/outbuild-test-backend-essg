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
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Create a .env file with (same as .env.example)**
   ```bash
   PORT=3000
   DATABASE_URL=your_database_connection_string
   ```
4. **Start the App**
   ```bash
   npm start
   ```

## API Documentation
Access Swagger UI for API docs and testing:

```bash
http://localhost:3000/api-docs
```
Endpoints include:
- User Registration and Authentication
- Schedule Management
- Activity Management

## Final Results and Testing
### Swagger UI API-Docs
![cap6](https://github.com/user-attachments/assets/19012c3c-ea03-4771-b38e-43a1e0a79a3c)

### Schedule Creation
![cap1](https://github.com/user-attachments/assets/0eb5db11-0239-49be-84b3-0065a7271dc3)

### Activity Creation
![cap2](https://github.com/user-attachments/assets/4b493a31-ded2-40b9-9b82-582b8a363134)

### Multiple Activities Creation
![cap3](https://github.com/user-attachments/assets/4fe6eea9-72c3-4464-9393-94fb2fec5ae6)

### Get a Schedule with Activities
![cap4](https://github.com/user-attachments/assets/70fd5776-a1a1-4118-9a2a-132bb637a7bd)



