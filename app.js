// const bodyParser = require('body-parser');
// const express = require('express');

// const app = express()

// const fs = require('fs')
// // const s = require('stream')


// app.use(bodyParser.urlencoded({extended:false}));


// // app.get('/',(req,res,next) => {

// //     res.send(`<h3>Chatter</h3>
// //     <a href="/chat">Go To Chats</a>`)

// // })




// // app.get('/chat',(req,res,next) => {

// // res.send(`<h3>Chatter</h3>
// //         <form action="/chat" method="POST"> <input type="text" id="msg" name="msg"> <button type="submit">Send</button></form>`)
// // });

// //     app.post('/chat',(req,res,next) => {
// //             console.log(req.body.message)
// //         message = req.body.msg
// //         if(message)
// //         fs.writeFile('./messages.txt',message)
            
// //                 {
    
// //                     res.send(`<h4>${message}</h4><h3>Chatter</h3>
// //         <form action="/chat" method="post"> <input type="text" id="msg" name="msg"> <button type="submit">Send</button></form>`)
    
// //                 }

    
// // })







//   app.listen(3000);


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