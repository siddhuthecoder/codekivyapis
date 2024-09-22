const Admin = require('../models/Admin');
const { ErrorValidation, SuccessValidation, generateJwtToken } = require('../utils/helpers');

// Admin Registration
const registerAdmin = async (req, res) => {

  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  try {
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
          return res.status(400).json({ message: 'Email already exists.' });
      }

      
      const admin = new Admin({ name, email, password, role });
      await admin.save();
      SuccessValidation(req,res, { message: 'Admin registered successfully.' }, 201);
  } catch (err) {
      ErrorValidation(req,res, err);
  }
}; 

// Admin login
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin || !(await admin.comparePassword(password))) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }
        const token = generateJwtToken(admin);
        SuccessValidation(req,res, { token, admin: { email: admin.email, name: admin.name } });
    } catch (err) {
        ErrorValidation(req,res, err);
    }
};

module.exports = {
    registerAdmin,
    loginAdmin
};
