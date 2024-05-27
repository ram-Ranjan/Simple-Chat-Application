

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const fs = require('fs');


app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send(`
    <h2>Welcome to Chatter    </h2>

   <a href="/login">Login</a>
  `);
});

app.get('/login', (req, res) => {
  res.send(`
    <h3>Login</h3>
    <form action="/login" method="POST">
      <input type="text" name="username"  placeholder="Enter your username">
      <button type="submit">Login</button>
    </form>   
  `);
});



app.post('/login',(req,res) => {

  let username=req.body.username;
  //console.log(userName)
  if(username){

    res.set('content-type','text/html')

    res.send(`

    <script>
    window.localStorage.setItem('username','${username}');//got current user
     window.location.href = '/chat';

  </script>
    `)
  }
  else{
    res.redirect('/login')
  }

})

const path = require('path');
const filePath = path.join(__dirname,'messages.txt');

app.get('/chat',(req,res) => {
  //standard Header of username
  const username = req.headers['x-username'] || '';

  //Atempting to readFile
  fs.readFile(filePath,'utf8',(err,data) => {
    if(err && err.code ==='ENOENT'){

      //If failed Creating new file
      fs.writeFile(filePath,'',(writeErr) => {
        if(writeErr){
          console.error('Error creating file:',writeErr)
          return res.status(500).send('Not able to write ')
        }
        sendChatPage(res,username,'');
    
      });
  
}
  else if(err){
    console.error('Error reading file: ',err);
    return res.status(500).send('Unable to read')
  }else {
    sendChatPage(res,username,data);

  }
  //method for redenring the read data
    });
  });
  

  app.post('/chat',(req,res) => {

    const message  = req.body.message;
    const username = req.headers['x-username'] || req.body.username || '';
  
    if(message){
      const messageWithUsername = `${username} : ${message}\n`
      fs.appendFile(filePath,messageWithUsername,(err) => {
        if(err){
        console.error('Error Creating file:',err);
       return res.status(500).send('Message not exist')
      }else{
        res.redirect('/chat');

      }
    });
  }
     else
       res.redirect('/chat');
  
  });


  function sendChatPage(res,username,messagesData){

    const messagesHtml = messagesData 
    ? `<h4>${messagesData.split('\n').map(line => `<p>${line}</p>`).join('')}</h4>` : '';
    
    const loggedInMessage = username ? `<p>Logged in as: ${username}</p>` : '';

    res.send(`
    ${messagesHtml}

    <h3>Chatter</h3>
  
    <form  action="/chat" method="POST">
    <input type="text" name="message" placeholder="Type your message" id="message">
    <button type="submit" >Send</button>
    </form>
  
    <script>
    const storedUsername = window.localStorage.getItem('username');
    if(storedUsername){
      document.querySelectorAll('form').forEach(form => {
        const usernameInput = document.createElement('input');
        usernameInput.type='hidden';
        usernameInput.name='username';
        usernameInput.value = storedUsername;
        form.appendChild(usernameInput);
      });
    }else{
      window.location.href = '/chat'

    }
    </script>

      `);
    }









app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});