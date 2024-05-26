

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
      <input type="text" name="username" id="username" placeholder="Enter your username">
      <button type="submit">Login</button>
    </form>
  `);
});



app.post('/login',(req,res) => {

  let userName=req.body.username;
  //console.log(userName)
  res.send(`
  <h2>Welcome to Chatter</h2>
  <h3>Logged User: ${userName}</h3> 
  <a href="/chat">Go to Chat</a>

    <a href="/login">Another user Login</a>
  <script>
  window.localStorage.setItem("userName","${userName}");//got current user
  // window.location.href = '/chat';


</script>
  `)

})

app.get('/chat',(req,res) => {
  
  res.send(`

  <form id="formData" action="/chat"><input type="text" name=msg placeholder="Type your message" id="msg"><button type="submit" >Send</button></form>
    
  `)
})





app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});