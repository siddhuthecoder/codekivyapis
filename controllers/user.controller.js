const User = require('../models/User');
const { ErrorValidation, SuccessValidation,generateJwtToken } = require('../utils/helpers');

// User Registration
const registerUser = async (req, res) => {

  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'Email already exists.' });
      }

      
      const user = new User({ name, email, password, phone });
      await user.save();
      const token = generateJwtToken(user);
      SuccessValidation(req,res, { token,user: { email: user.email, name: user.name } });
  } catch (err) {
      ErrorValidation(req,res, err);
  }
}; 

// User login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(email,password);
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }
        const token = generateJwtToken(user);
        SuccessValidation(req,res, { token,user: { email: user.email, name: user.name } });
    } catch (err) {
        ErrorValidation(req,res, err);
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }
        return res.status(200).json({ message: 'User deleted successfully.' });
    } catch (err) {
        return res.status(500).json({ message: 'Error deleting user.', error: err.message });
    }
};

const getUserDetails = async (req,res) => {
    const {email} = req.query;
    if(!email){
        return res.status(400).json({ success: false, message: "email is required" });
    }

    try{
        const  user = await User.findOne({email});
        if(!user){
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({
            success: true,
            user: {
              name: user.name,
              email: user.email,
              phone: user.phone
            }
          });
        } catch (error) {
          console.error('Error fetching user details:', error);
          res.status(500).json({ success: false, message: "Server error" });
        }
}


module.exports = {
    registerUser,
    loginUser,
    deleteUser,
    getUserDetails,
};
