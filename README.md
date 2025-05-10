

# Service Booking Platform Backend (Mini Sheba.xyz)
Developed with [Nest](https://github.com/nestjs/nest) framework TypeScript a simple  backend for booking services like cleaning, plumbing, etc.

---

## Features

- View available services (paginated)
- Book a service with name, phone, email, schedule
- Check booking status via booking ID
- Admin APIs:
  - Manage services (CRUD)
  - View all bookings
- JWT-based Admin Login
- Email/SMS Notifications on booking
- Docker + PostgreSQL setup

---

## Tech Stack

- **NestJS** (TypeORM, REST)
- **PostgreSQL**
- **JWT Auth**
- **Nodemailer**
- **Docker & Docker Compose**

---

# Running Locally

### 1. Clone and Setup

```bash
git clone https://github.com/OwaliShawon/booking-service-nestjs.git
cd booking-service-nestjs
```


## Add Environment .env
#### Update the environments carefully and safely, some are must need update like TWILIO OR SMTP
```bash
.env.example for local
.env.development for docker
```


# Docker Compose
### Start the Application
```bash
docker-compose up --build
```
### Stop the Application
```bash
docker-compose down
```
### Clean Up Containers and Volumes
```
docker-compose down -v
```

# Host Terminal
## Installation
```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Admin Credentials
#### Admin credential is static if you changed in env then use yours
```
username: admin
password: admin123
```

## 📜 Swagger Documentation

Swagger is available at: [http://localhost:3000/api](http://localhost:3000/api)

### Steps to Use:
1. Open the Swagger URL in your browser.
2. Use the `POST /auth/login` endpoint to log in as an admin.
3. Copy the JWT token from the response.
4. Click the "Authorize" button in Swagger and paste the token (with `Bearer ` prefix).
5. Access the secure admin APIs.

## 📖 API Endpoints

### Public APIs
- `GET /services` - View available services (paginated)
- `GET /services/:id` - View details of a specific service
- `POST /bookings` - Book a service
- `GET /bookings/:id` - Check booking status by ID

### Admin APIs (Require JWT Token)
- `POST /auth/login` - Admin login
- `GET /admin/bookings` - View all bookings
- `POST /admin/services` - Create a new service
- `PUT /admin/services/:id` - Update a service
- `DELETE /admin/services/:id` - Delete a service

## 🛠 Troubleshooting

### Common Issues

- **JWT Token Not Working in Swagger**
  - Ensure the token is prefixed with `Bearer ` when authorizing in Swagger.
  - Check that the `JWT_SECRET` in `.env` matches the one used in the application.

- **Database Connection Issues**
  - Ensure PostgreSQL is running and the credentials in `.env` are correct.
  - If using Docker, ensure the `DATABASE_URL` points to the correct host.

- **Email/SMS Notifications Not Working**
  - Verify the SMTP and Twilio credentials in `.env`.
  - Check the logs for any errors related to email or SMS services.