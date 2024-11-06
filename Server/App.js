// const express=require('express');
// const cors=require('cors');
// const app=express();
// const config=require('./DBConfig/Config');
// const port=4000;

// app.use(cors());
// app.use(express.json());

// config();


// app.get('/',async(req,res)=>{
//     try{
// res.json({success:true,message:"api is working"})
//     }catch(error){

//     }
// })
// app.post('/api/login',async(req,res)=>{
//     try{

//     }catch{

//     }
// })


// app.listen(port,()=>{
//     console.log(`Server is running on http://localhost:${port}`);
// })




const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./Model/Employee');
const config = require('./DBConfig/Config');
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// Database connection
config();

// Home route
app.get('/', async (req, res) => {
  try {
    res.json({ success: true, message: 'API is working' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login route (Sign In / Sign Out)
app.post('/api/login', async (req, res) => {
  const { action, username, timestamp } = req.body;
console.log("action : ",action," username : ", username," timestamp : ", timestamp );

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Add action to user's cart (login/logout history)
    user.cart.push({ action, timestamp: new Date(timestamp) });
    await user.save();

    res.status(200).json({ message: 'Action logged successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get login history for a user
app.get('/api/login-history', async (req, res) => {
  const { username } = req.query;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Return the user's cart (login/logout history)
    res.status(200).json({ history: user.cart });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
