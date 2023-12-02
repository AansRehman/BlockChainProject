// // const express = require('express');
// // const app = express();

// // // Mock database (replace this with an actual database in your application)
// // const users = [];

// // // Signup endpoint
// // app.post('/signup', (req, res) => {
// //   const { username, password, confirmPassword, gender } = req.body;

// //   // Basic validation
// //   if (!username || !password || !confirmPassword || !gender) {
// //     return res.status(400).json({ message: 'Please fill in all fields' });
// //   }

// //   if (password !== confirmPassword) {
// //     return res.status(400).json({ message: 'Passwords do not match' });
// //   }

// //   // Check if user already exists (you can use a better check in a real application)
// //   const existingUser = users.find((user) => user.username === username);
// //   if (existingUser) {
// //     return res.status(400).json({ message: 'Username already exists' });
// //   }

// //   // Create a new user object
// //   const newUser = {
// //     username,
// //     password,
// //     gender,
// //     // Add more user details here if needed
// //   };

// //   // Save user to the database
// //   users.push(newUser);

// //   // For demonstration purposes, sending back the newly created user
// //   res.status(201).json({ message: 'User created successfully', user: newUser });
// // });

// // // Start the server
// // const PORT = 3000;
// // app.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`);
// // });



// // UserController.js
// // Example user data (replace this with your actual data retrieval mechanism)

// const getUserById = (req, res) => {
//     try {
//       const { userId } = req.params;
//       console.log(userId)
  
//       // Find user in the array based on the user ID
//       const user = users.find((user) => user.id === parseInt(userId));
  
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
  
//       res.status(200).json(user);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to fetch user data' });
//     }
//   };
  
//   module.exports = {
//     getUserById,
//   };