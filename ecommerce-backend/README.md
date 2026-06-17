# E-Commerce Backend API

Spring Boot REST API for an Admin E-Commerce Dashboard with JWT authentication, MongoDB persistence, and role-based access control.

## Tech Stack

- Java 17
- Spring Boot 3.2
- Spring Security + JWT (jjwt)
- Spring Data MongoDB
- Bean Validation

## Prerequisites

- Java 17+
- Maven 3.8+
- MongoDB running at `mongodb://localhost:27017`

## Getting Started

1. **Clone and enter the project**

   ```bash
   cd ecommerce-backend
   ```

2. **Configure** (optional — defaults work for local dev)

   Edit `src/main/resources/application.properties`:

   - `spring.data.mongodb.uri` — MongoDB connection
   - `app.jwt.secret` — JWT signing key (min 32 characters)
   - `app.cors.allowed-origins` — frontend origin (`http://localhost:5173`)

3. **Run the application**

   ```bash
   mvn spring-boot:run
   ```

   API base URL: `http://localhost:8080/api`

4. **Seed data** (auto on first run)

   - Admin: `admin@shop.com` / `admin123`
   - 12 sample products across Electronics, Clothing, Accessories, Home, and Sports

## API Endpoints

### Auth (Public / Authenticated)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register (role: CUSTOMER) |
| POST | `/api/auth/login` | Public | Login, returns JWT |
| GET | `/api/auth/me` | Auth | Current user profile |

### Products

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/products` | Public | List with `search`, `category`, `minPrice`, `maxPrice` |
| GET | `/api/products/{id}` | Public | Product details |
| POST | `/api/products` | ADMIN | Create product |
| PUT | `/api/products/{id}` | ADMIN | Update product |
| DELETE | `/api/products/{id}` | ADMIN | Delete product |

### Cart & Orders (CUSTOMER or ADMIN)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get cart |
| POST | `/api/cart/items` | Add/update item `{ productId, quantity }` |
| DELETE | `/api/cart/items/{productId}` | Remove item |
| POST | `/api/orders` | Place order (clears cart) |
| GET | `/api/orders/my` | Customer order history |

### Admin

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/stats` | Dashboard stats |
| GET | `/api/admin/charts/revenue` | Monthly revenue |
| GET | `/api/admin/charts/order-status` | Order status counts |
| GET | `/api/admin/orders` | All orders |
| PATCH | `/api/admin/orders/{id}/status` | Update order status |

## Authentication

Send the JWT in the `Authorization` header:

```
Authorization: Bearer <token>
```

JWT payload: `{ sub: email, role: ADMIN|CUSTOMER }` — expires in 24 hours.

## Project Structure

```
com.ecommerce
├── config/          Security, JWT, CORS, seed data
├── model/           User, Product, Order, Cart
├── repository/      MongoDB repositories
├── dto/             Request/response objects
├── service/         Business logic
├── controller/      REST endpoints
└── exception/       Global error handling
```

## Build

```bash
mvn clean package
```

## Frontend

Designed to work with the React frontend at `http://localhost:5173`. CORS is pre-configured for that origin.
