

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const fs = require('fs');


app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send(`
    <h3>Welcome to Chatter</h3>
    <a href="/login">Login</a>
  `);
});

app.get('/login', (req, res) => {
  res.send(`
    <h3>Login</h3>
    <form action="/login" method="POST">
      <input type="text" name="username" placeholder="Enter your username">
      <button type="submit">Login</button>
    </form>
  `);
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  if (username) {
    res.set('Content-Type', 'text/html');
    res.send(`
      <script>
        window.localStorage.setItem('username', '${username}');
        window.location.href = '/chat';
      </script>
    `);
  } else {
    res.redirect('/login');
  }
});



app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});