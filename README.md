# 🎫 Role-Based Ticketing System

A modern, role-based support ticketing system built with React, Node.js, Express, and MongoDB. This application allows users to create support tickets while administrators can manage and update ticket statuses.

## ✨ Features

- **User Authentication** - Secure JWT-based authentication
- **Role-Based Access Control** - Different interfaces for users and admins
- **Ticket Management** - Create, view, and update support tickets
- **Responsive Design** - Works on desktop and mobile devices

## 🚀 Getting Started

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/haileyesus2433/STS.git
cd STS
```

2. **Set up environment variables**

Create a `.env` file in the server directory:

```
JWT_SECRET=your_jwt_secret_key_here
MONGO_URI=mongodb://localhost:27017/sts
PORT=5000
```

3. **Install dependencies**

```bash
# Install server dependencies
cd backend
npm install

# Install client dependencies
cd ../frontend
npm install
```

## 🏃‍♂️ Running the Application

### Development Mode

1. **Start the server**

```bash
# From the server directory
npm run dev
```

2. **Start the client**

```bash
# From the client directory
npm run dev
```

3. **Access the application**

Open your browser and navigate to:

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 🔑 User Roles

### User

- Create support tickets
- View their own tickets
- Track ticket status

### Admin

- View all tickets in the system
- Update ticket status (open, in progress, closed)
- See user information for each ticket

## 📝 API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Authenticate a user

### Tickets

- `POST /api/tickets` - Create a new ticket
- `GET /api/tickets` - Get tickets (all for admin, user-specific for regular users)
- `PUT /api/tickets/:id` - Update ticket status (admin only)

## 🎨 Tech Stack

### Frontend

- React.js with TypeScript
- React Router for navigation
- Context API for state management
- Tailwind CSS for styling
- Lucide React for icons

### Backend

- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
