const jwt = require('jsonwebtoken');
const express = require('express');
const { User } = require('../database');
const router = express.Router();
const { SECRETKey, authentication } = require('../middleware');

router.post('/signup', async (req, res) => {
  try {
   
    const { username, password } = req.body;
    
    // Check if the user already exists
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({username, password });
    
    await newUser.save();
    
    // Sign a token for the newly registered user
    const token = jwt.sign({ username,id:newUser._id },SECRETKey, { expiresIn: '10h' },);

    // Send a success response with the token
    res.status(200).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/login',async (req,res)=>{
  try{
    const {username,passord} = req.body
    const user = await User.findOne({username})
    if(user){
      const token = jwt.sign({ username,id:user._id },SECRETKey, { expiresIn: '10h' },);
      return res.status(200).json({message:'user logged in sucsessfully',token})
    }
    res.status(403).json({ message: 'user does not exist or incorrect credentials' });
  }catch(error){
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

module.exports = router;
