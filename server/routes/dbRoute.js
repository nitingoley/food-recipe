// const express = require("express");
// const router = express.Router();
// const User = require("../models/DataEntires");


// router.post('/register', async (req, res) => {
//     try {
//       const { username, email, password } = req.body;
//       const newUser = new User({ username, email, password });
//       await newUser.save();
//       res.status(201).json(newUser);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   });
  
//   module.exports = router;