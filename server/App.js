const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./Models/User');
const Appointment = require('./Models/appointmentSchema');
const Tests = require('./Models/tests');
const Report = require('./Models/ReportUpload');
const multer = require('multer');



const secretKey = 'your-secret-key'; // Replace with your actual secret key

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
require('./db/conn')

app.get('/', (req, res) => {
  res.send('Hello from server');
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

app.post("/register", async (req, res) => {
  const { name, email, password, gender ,age} = req.body;

  try {
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // If the email doesn't exist, create a new user
    const newUser = new User({
      name,
      email,
      password,
      gender,
      age
      // roles: ['patient'],
    });

    await newUser.save();
    console.log("User registered successfully");
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("User registration failed:", err);
    res.status(500).json({ message: "Registration failed" });
  }
});



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Destination folder for storing uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Unique filename for the uploaded file
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('reportFile'), async (req, res) => {
  try {
    const { patientName } = req.body;
    const reportFile = req.file.path; // Assuming the file path is stored in req.file.path (using multer)
    console.log(req.body);

    const newReport = new Report({ patientName, reportFile });
    await newReport.save();

    res.status(201).json({ message: 'Report uploaded successfully', report: newReport });
  } catch (error) {
    console.error('Error uploading report:', error);
    res.status(500).json({ error: 'Error uploading report' });
  }
});











app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ message: 'Login failed: Incorrect password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    // console.log(user)
    req.user= user;
    next();
  });
};

app.get('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});


app.get('/patients', async (req, res) => {
  try {
    const patients = await User.find();
    res.json(patients);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/patients/:id', async (req, res) => {
  try {
    const patients = await User.findById();
    res.json(patients);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// ...

app.put('/patients/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedPatient = await User.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.status(200).json(updatedPatient);
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(500).json({ error: 'Error updating patient' });
  }
});

app.delete('/patients/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPatient = await User.findByIdAndDelete(id);

    if (!deletedPatient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error('Error deleting patient:', error);
    res.status(500).json({ error: 'Error deleting patient' });
  }
});






// ... (other imports and setup)

// Create a schema for the Appointment model (if using Mongoose or a similar ORM)
// Example using Mongoose:
// const mongoose = require('mongoose');
// const appointmentSchema = new mongoose.Schema({
//   name: String,
//   doctor: String,
//   appointmentDate: Date,
// });
// const Appointment = mongoose.model('Appointment', appointmentSchema);

// ... (other middleware and setup)

// POST route to create a new appointment
app.post('/appointments', async (req, res) => {
  const { name, doctor, appointmentDate } = req.body;

  try {
    // Example with Mongoose to save an appointment
    const newAppointment = new Appointment({ name, doctor, appointmentDate });
    await newAppointment.save();

    res.status(201).json({ message: 'Appointment scheduled successfully' });
  } catch (error) {
    console.error('Error scheduling appointment:', error);
    res.status(500).json({ error: 'Error scheduling appointment' });
  }
});

// GET route to fetch all appointments
app.get('/appointments', async (req, res) => {
  try {
    // Example with Mongoose to fetch all appointments
    const appointments = await Appointment.find();

    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Error fetching appointments' });
  }
});

// GET route to fetch a specific appointment by ID
app.get('/appointments/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Example with Mongoose to find an appointment by ID
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.status(200).json(appointment);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ error: 'Error fetching appointment' });
  }
});

// PUT route to update an existing appointment by ID
app.put('/appointments/:id', async (req, res) => {
  const { id } = req.params;
  const { name, doctor, appointmentDate } = req.body;

  try {
    // Example with Mongoose to update an appointment by ID
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { name, doctor, appointmentDate },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ error: 'Error updating appointment' });
  }
});

// DELETE route to delete an appointment by ID
app.delete('/appointments/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Example with Mongoose to delete an appointment by ID
    const deletedAppointment = await Appointment.findByIdAndDelete(id);

    if (!deletedAppointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ error: 'Error deleting appointment' });
  }
});

// ... (other routes and middleware)

// ...


// ...


app.post('/doctor', async (req, res) => {
  try {
    const { name, age, tests, prescription } = req.body;
    console.log(req.body);
    const newTests = new Tests({ name, age, tests, prescription });
    await newTests.save();
    res.status(201).json(newTests);
  } catch (error) {
    res.status(500).json({ error: 'Error creating patient tests' });
  }

});