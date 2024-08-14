# Ecommerce App

This is a full-stack e-commerce web application that allows users to browse products, add them to a cart, and manage their cart. The project is temporarily named "Ecommerce App" and is built using modern web development technologies.

## Features

- **User Authentication**: Users can sign up and log in to their accounts.
- **Product Viewing**: Browse through a list of products available in the store.
- **Cart Management**: Add products to the cart, update the quantity, or remove items entirely.
- **Persistent Data**: All user and product data is stored in a PostgreSQL database.

## Technologies Used

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) (TypeScript)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **State Management**: [Redux](https://redux.js.org/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Validation**: [Zod](https://zod.dev/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (deployed on [Neon](https://neon.tech/))

## Project Structure

```bash
ecommerce-app/
│
├── frontend/                 # Frontend code (Next.js, TypeScript)
│   ├── app/                  # Application logic
│   │   ├── cart/             # Cart-related pages and components
│   │   ├── components/       # Reusable components
│   │   ├── layout/           # Layout components
│   │   ├── login/            # Login page and components
│   │   ├── product/          # Product listing and details pages
│   │   ├── signup/           # Signup page and components
│   ├── store/                # Redux store and slices
│   └── ...                   # Other frontend-related files
│
├── backend/                  # Backend code (Node.js, Express, JavaScript)
│   ├── controllers/          # Route controllers
│   ├── middleware/           # Express middlewares (e.g., authorization)
│   ├── prisma/               # Prisma ORM configuration and schema
│   ├── routes/               # Application routes
│   ├── validations/          # Zod validation schemas
│   └── server.js             # Entry point for the backend server
│
├── README.md                 # Project documentation
└── package.json              # Root package.json for project-level scripts
```

## Setup Instructions

To set up the project locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ecommerce-app.git
cd ecommerce-app
```
### 2. Install Dependencies
Navigate to both the frontend and backend folders and install the necessary dependencies:

```bash
# Install frontend dependencies
cd frontend
npm install

#Install backend dependencies
cd ../backend
npm install
```
### 3. Configure Environment Variables
- Create a `.env` file in the `backend` directory
- Add the following environment variables:
```bash
PORT=your_desired_port
DATABASE_URL=your_neon_database_url
JWT_SECRET=your_jwt_secret
```

- Also create a `.env.local` file in the `frontend` directory
```bash
NEXT_PUBLIC_API_URL=http://locahost:${PORT}/api
```

### 4. Run the Application

**Backend**
- Start the backend server:
```bash
cd backend
npm run test
```

**Frontend** - (Another terminal)
- Start the frontend server:
```bash
cd frontend
npm run dev
```

### 5. Access the Application
Open your browser and go to `http://localhost:3000` to view the application.

## Contributing
Feel free to fork this repository and contribute by submitting a pull request. Any contributions are welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](https://opensource.org/license/mit) file for details.
