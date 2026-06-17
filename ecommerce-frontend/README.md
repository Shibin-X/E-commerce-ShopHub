# ShopHub — E-Commerce Frontend

A full-featured React e-commerce frontend with customer shopping flows and an admin dashboard. Built as a resume-ready project paired with a Spring Boot + MongoDB backend.

## Tech Stack

- **React 18** (JSX only — no TypeScript)
- **Vite** — fast dev server and build tooling
- **React Router v6** — client-side routing with protected routes
- **Axios** — HTTP client with JWT interceptors
- **Tailwind CSS v3** — utility-first styling
- **Recharts** — admin dashboard charts (revenue bar chart, order status pie chart)
- **lucide-react** — lightweight icons

## Features

### Customer
- Browse products with search, category, and price filters
- Product detail pages with add-to-cart
- Shopping cart with quantity controls and place order
- Order history with color-coded status badges

### Admin
- Dashboard with stat cards (revenue, orders, products, customers)
- Monthly revenue bar chart and order status pie chart
- Product CRUD with modal forms
- Order management with status updates

### Auth
- JWT-based login and registration
- Role-aware navigation (CUSTOMER vs ADMIN)
- Protected routes and 403 admin guard

## Prerequisites

- Node.js 18+
- Backend API running at `http://localhost:8080` (see `ecommerce-backend` repo)

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## API Configuration

The frontend connects to the backend at:

```
http://localhost:8080/api
```

Configured in `src/api/axios.js`. Ensure the backend has CORS enabled for `http://localhost:5173`.

## Default Accounts

| Role     | Email           | Password  |
| -------- | --------------- | --------- |
| Admin    | admin@shop.com  | admin123  |
| Customer | (register new)  | —         |

## Project Structure

```
src/
├── api/             # Axios instance + API modules
├── context/         # AuthContext (JWT + role)
├── components/
│   ├── layout/      # Navbar, Footer, AdminSidebar
│   ├── ui/          # Button, Input, Card, Badge, Modal, Loader
│   ├── products/    # ProductCard, ProductGrid, SearchFilterBar
│   ├── cart/        # CartItem, CartSummary
│   └── charts/      # RevenueChart, OrderStatusPieChart
├── pages/
│   ├── customer/    # Home, Products, ProductDetail, Cart, MyOrders
│   ├── admin/       # Dashboard, ManageProducts, ManageOrders
│   └── auth/        # Login, Register
├── routes/          # AppRoutes, ProtectedRoute, AdminRoute
└── utils/           # formatCurrency (₹), constants
```

## Routes

| Path              | Page           | Access   |
| ----------------- | -------------- | -------- |
| `/`               | Home           | Public   |
| `/products`       | Products       | Public   |
| `/products/:id`   | Product Detail | Public   |
| `/cart`           | Cart           | Customer |
| `/orders`         | My Orders      | Customer |
| `/login`          | Login          | Public   |
| `/register`       | Register       | Public   |
| `/admin`          | Dashboard      | Admin    |
| `/admin/products` | Manage Products| Admin    |
| `/admin/orders`   | Manage Orders  | Admin    |

## Screenshots

> Add screenshots of the home page, product listing, cart, and admin dashboard here.

## License

MIT
