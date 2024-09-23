# Admin Panel

This project is a dynamic, smooth, and fast admin panel built using the MERN stack. It provides functionalities for managing employees, user authentication, and more, with a visually appealing and efficient UI.

## Features
- **Employee Management:** Add, update, view, and delete employee records.
- **User Authentication:** Secure login with JWT-based authentication.
- **Dynamic UI:** The frontend is highly responsive, providing a seamless user experience.
- **Fast Performance:** Optimized for speed and smooth transitions.

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express, MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **API Integration:** RESTful APIs

## Setup Instructions

### Server Setup:
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   nodemon index.js
   ```

### Client Setup:
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend:
   ```bash
   npm run
   ```

## API Endpoints

### Employee Management:
- **Get All Employees:**  
  `GET /get-employee`
- **Create Employee:**  
  `POST /create-employee`
- **Update Employee:**  
  `PUT /update-employee/:id`
- **Delete Employee:**  
  `DELETE /delete-employee/:id`
- **Get Employee By ID:**  
  `GET /get-employee/:id`

### User Authentication:
- **Login:**  
  `POST /login`

## Frontend Components
- **EmployeeListView:** Displays a list of all employees.
- **CreateEmployee:** Form to create a new employee.
- **EditEmployee:** Edit an existing employee's details.
- **HomePage:** The main landing page for the admin panel.
- **Login:** User login page.
- **EmployeeEntry:** Manage individual employee records.

## Database Models

### Employee Model:
```javascript
const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  designation: { type: String, required: true },
  gender: { type: String, required: true },
  course: { type: [String], required: true },
  imgUpload: { type: String },
  employeeId: { type: Number, unique: true },
  createData: { type: Date },
});

```

### User Model:
```javascript
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
```

User Credentials: 
Sukanta Bhunia
abcdefgh

TestAdmin
12345678
- This project is designed to be scalable and easily adaptable for further features.

