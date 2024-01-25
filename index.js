require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require("path");
const app = express();
const build = path.join(__dirname, "client/dist");
const model = require('./model/model')
app.use(express.static(build));
app.use('/register',require('./routes/register'));
app.use('/subjects',require('./routes/subjects'));
app.use('/student',require('./routes/student'));
app.use('/class',require('./routes/class'));
app.use('/search',require("./routes/search"));

// Authentication

app.use(bodyParser.json());
app.use(cookieParser());
const secretKey = 'your-secret-key';
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    req.user = user;
    next();
  });
};
app.post('/api/login', async(req, res) => {
  const { username, password } = req.body;
  console.log(username,password);
  //res.sendStatus(200);
  let result = await model.authenticateUser(username,password)
  console.log(result);
  if (result.status == 'success') {
  const token = jwt.sign(result.user, secretKey);
  res.cookie('token', token, { httpOnly: true });

    return res.status(200).json(result.user);
  }
 
  //res.json({ message: 'Login successful', user });
});

app.post('/api/logout', (req, res) => {
  console.log('userlogged out');
  res.clearCookie('token');
  res.json({ message: 'Logout successful' });
});
app.listen(process.env.PORT, () => {
  console.log(`Artemis listening on port ${process.env.PORT}`);
});