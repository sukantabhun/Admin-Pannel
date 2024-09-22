import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Employee from './db/Models/Employee.js';
import User from './db/Models/User.js'
import connectDB from './db/db.js';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 8000;
const JWT_SECRET = 'your_secret_key';

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

function getNowDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); 
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

// Employee routes
app.get('/get-employee', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: error.message });
  }
});

app.delete('/delete-employee/:id', async (req, res) => {
  const { id } = req.params; 

  try {
    const result = await Employee.findByIdAndDelete(id); 

    if (!result) {
      console.error(`Employee with ID ${id} not found.`);
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: error.message });
  }
});

app.post('/create-employee', upload.single('imgUpload'), async (req, res) => {
  try {
    const randomId = Math.floor(Math.random() * 1000000);
    const imgBuffer = req.file ? req.file.buffer : null;
    const date = getNowDate();

    const newEmployee = new Employee({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      designation: req.body.designation,
      gender: req.body.gender,
      course: req.body.course,
      imgUpload: imgBuffer ? imgBuffer.toString('base64') : null,
      employeeId: randomId,
      createData: date,
    });
    
    await newEmployee.save();

    res.status(201).json({
      message: 'Employee created successfully',
      employeeId: randomId,
    });
  } catch (err) {
    console.error('Error creating employee:', err);
    res.status(500).json({ error: 'Failed to create employee' });
  }
});

app.get('/get-employee/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.put('/update-employee/:id', upload.single('imgUpload'), async (req, res) => {
  const { id } = req.params;

  try {
    const updatedData = {
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      designation: req.body.designation,
      gender: req.body.gender,
      course: req.body.course,
      imgUpload: req.file ? req.file.buffer.toString('base64') : undefined,
      createDate: req.body.createDate,
    };

    const result = await Employee.findByIdAndUpdate(id, updatedData, { new: true });

    if (!result) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee updated successfully", employee: result });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: error.message });
  }
});

// User routes
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Start server
app.listen(port, async () => {
  try {
    await connectDB();
    console.log(`Server is running at http://localhost:${port}`);
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  }
});
