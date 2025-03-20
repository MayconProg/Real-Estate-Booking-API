# 🏡 Real Estate Booking API

## 📖 Description
A real estate booking API built with **Node.js**, **TypeScript**, and **PostgreSQL**, designed to facilitate scheduling property viewings for rentals or purchases. The system ensures secure authentication using **JWT** and **bcrypt**, while **Zod** handles data validation. **Prisma ORM** is used for seamless database interactions, and **Docker** simplifies deployment.

## ✨ Features
- **User Authentication & Authorization**: Secure login and registration with password hashing.
- **JWT Token Authentication**: Secure API access using JSON Web Tokens.
- **Property Listings**: View available houses and apartments.
- **Appointment Booking**: Users can schedule and manage property viewings.
- **Role-Based Access**: Admins can manage properties and users.
- **Middleware Implementation**: Secure routes and enforce permissions.
- **Database Management**: Using **Prisma ORM** with **PostgreSQL**.

## 🛠️ Technologies Used
- **Node.js**: Backend development.
- **TypeScript**: Static typing for better maintainability.
- **PostgreSQL**: Relational database.
- **Express**: Fast and minimalist server framework.
- **JWT (JSON Web Tokens)**: Secure authentication.
- **Prisma**: Database ORM.
- **Docker**: Containerized environment setup.
- **Zod**: Data validation.
- **bcrypt**: Secure password hashing.

## 🚀 Installation & Setup
### Prerequisites
- Node.js (v20+ recommended)
- Docker (Installed and running)
- PostgreSQL
- NPM or Yarn

### Steps
1. **Clone the repository:**
   ```sh
   git clone https://github.com/MayconProg/Real-Estate-Booking-API.git
   cd real-estate-booking-api
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file and add the following:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/your_database
   JWT_SECRET_KEY=your_secret_key
   PORT=5000
   ````

4. **Start the database using Docker:**
   ```sh
   docker-compose up -d
   ```

5. **Run database migrations:**
   ```sh
   npx prisma migrate dev
   ```

6. **Start the server:**
   ```sh
   npm run dev
   ```

## 📌 API Endpoints
### Users
- `GET /users` - List all users
- `GET /users/:id` - List a user by his id
- `POST /users/register` - Register a new user
- `POST /users/login` - Authenticate and receive a JWT token
- `PUT /users/update-user` - Update a existing user
- `DELETE /users/delete-user` - Delete a existing user

### Properties
- `GET /properties` - List all available properties
- `GET /properties/:id` - Get property details
- `POST /properties/create` - Create a new property (Admin and Owner only)
- `PUT /properties/update/:id` - Update property details (Admin and Owner only)
- `DELETE /properties/delete/:id` - Remove a property (Admin and Owner only)

### Schedules
- `GET /schedules` - List all schedules (Admin Only)
- `GET /schedules/:id` - Get schedule details
- `POST /schedules/create/:id` - Create a schedule using property id
- `PUT /schedules/update/:id` - Update a schedule using schedule id
- `DELETE /schedules/:id` - Cancel an schedule

## 🔒 Security Measures
- **Password hashing with bcrypt** to secure user credentials.
- **JWT authentication** for protected API access.
- **Middleware protection** to secure routes.
- **Role-based access control** to manage permissions.

## 🏗️ Project Structure
```
📂 src
 ┣ 📂 controllers    # Handles business logic
 ┣ 📂 middlewares    # Authentication & authorization
 ┣ 📂 models         # Prisma schema models
 ┣ 📂 routes         # API route definitions
 ┣ 📂 services       # Application services
 ┣ 📜 server.ts      # Main application entry point
```

## 🤝 Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

---
Developed with ❤️ using Node.js, TypeScript & Postegres.

