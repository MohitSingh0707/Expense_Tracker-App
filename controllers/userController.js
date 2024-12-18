const userModel = require('../models/userModel')

// LOGIN callback
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email, password })
        if (!user) {
            return res.status(404).send('User Not Found')
        }
        res.status(200).json({
            success:true,
            user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error
        })
    }
};

// REGISTER callback
const registerController = async (req, res) => {
    try {
      const newUser = new userModel(req.body);
      await newUser.save();
      res.status(201).json({
        success: true,
        newUser,
      });
    } catch (error) {
    
      res.status(400).json({
        success: false,
        error: error.message || error, // Send detailed error message to the client
      });
    }
  };
  

module.exports = { loginController, registerController };