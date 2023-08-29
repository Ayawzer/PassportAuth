const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const db = require('./db');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({ secret: 'mySecretKey', resave:false, saveUninitialized:false }));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(cookieParser('mySecretKey'));

app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const q = "INSERT INTO account (username, password) VALUES (?, ?)";
  const q2 = "SELECT * FROM account WHERE username = ?";

  db.query(q2, [username], (err, result) => {
    if (err) {throw err};
    if (result.length > 0) {
      res.send({message: "User already exists"});
    }
    if (result.length === 0) {
      const hash = bcrypt.hashSync(password, 10);
      db.query(q, [username, hash], (err, result) => {
        if (err) {throw err};
        res.send(message = "User created");
      });
    }
  });
});

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {throw err};
    if (!user) {
      res.send({message: "User does not exist"});
    } else {
      req.logIn(user, (err) => {
        if (err) {throw err};
        res.send({message: "User logged in"});
        console.log(user);
      });
    }
  })(req, res, next);
});

app.get('/getUser', (req, res) => {
  res.send(req.user);
});

app.get('/logout', (req, res) => {
  req.logout(() => {
    res.send({message: "User logged out"});
  });
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});