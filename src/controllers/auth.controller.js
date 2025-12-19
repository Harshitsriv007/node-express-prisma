const { signup, login } = require('../services/auth.service');

exports.signupUser = async (req, res, next) => {
  try {
    const result = await signup(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
