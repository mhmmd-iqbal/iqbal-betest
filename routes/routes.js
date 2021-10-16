const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { registerValidation, loginValidation } = require('../validation');
const { verify } = require('./verifyToken');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('dashboard');
});

router.post('/register', async (req, res) => {
  const { error, value } = registerValidation(req.body);

  if (error) {
    return res.status(400).send(error.message);
  }

  const emailExist = User.findOne(
    { emailAddress: req.body.emailAddress },
    function (err, result) {
      if (result) {
        return res.status(400).send({
          message: 'Email is already exist',
        });
      }
    }
  );
  const userNameExist = User.findOne(
    { userName: req.body.userName },
    function (err, result) {
      if (result) {
        return res.status(400).send({
          message: 'User Name is already exist',
        });
      }
    }
  );

  // hash password
  const salt = await bcrypt.genSalt(10);

  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    userName: req.body.userName,
    accountNumber: req.body.accountNumber,
    emailAddress: req.body.emailAddress,
    identifyNumber: req.body.identifyNumber,
    password: hashPassword,
  });

  try {
    const saved = await user.save();
    res.send({ message: 'Data created' });
  } catch (error) {
    res.status(400).error;
  }
});

router.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.message);

  const user = await User.findOne({ userName: req.body.userName });
  if (!user) {
    return res.status(401).send({ message: 'email or password is invalid' });
  }

  const checkValidation = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!checkValidation)
    return res.status(401).send({ message: 'email or password is invalid' });

  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  });
  res.header('authorization', token).send({
    type: 'bearer',
    token: token,
    expiresIn: 24 * 3600,
  });
});

router.get('/user', verify, async (req, res) => {
  const data = req.query;
  let query = {};

  if (data.identifyNumber) query.identifyNumber = data.identifyNumber;

  if (data.accountNumber) query.accountNumber = data.accountNumber;

  const user = await User.findOne(query);

  if (!user) {
    return res.status(200).send({ message: 'Data not found' });
  }

  return res.status(200).send(user);
});

module.exports = router;
