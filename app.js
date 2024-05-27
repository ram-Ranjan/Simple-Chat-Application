

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
  if(userName){

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
  }
  else{
    res.redirect('/login')
  }

})

const path = require('path');
const filePath = path.join(__dirname,'message.txt');

app.get('/chat',(req,res) => {
  //standerd Header of username
  const username = req.header['x-username'] || '';

  //Atempting to readFile
  fs.readFile(filePath,'utf-8',(err,data) => {
    if(err && err.code ==='ENDENT'){

      //If failed Creating new file
      fs.writeFile(filePath,'',(writeErr) => {
        if(writeErr){
          console.error('Error creating file:',writeErr)
          return res.status(500).send('Internal Server ')
        }
        sendChatPage(res,username,'');
    
      });
  
}
  else if(err){
    console.error('Error reading file: ',err);
    return res.status(500).send('Internal server error')
  }else 
  //method for redenring the read data
      sendChatPage(res,username,data);
    })
  })
  


  function sendChatPage(res,username,messageData){

    const messageHtml = messageData ? `<h4>${messageData.split('\n').map(line => `<p>${line}</p>`).join('')}<\h4>`:'';
    
    res.send(`
    ${messageHtml}
    <h3>Chatter</h3>
    <p>Logged in as : ${username}</p>
  
    <form id="formData" action="/chat" method="POST">
    <input type="text" name=msg placeholder="Type your message" id="msg">
    <button type="submit" >Send</button>
    </form>
  
    <script>
    const storedUserName=window.localStorage.getItem('username');
    if(storedUserName){
      document.querySelectorAll('form).forEach(form => {
        cosnt userNameInput = documet.createElement('input');
        userNameInput.type='hidden';
        userNameInput.name='username';

        userNameInput.value = storedUserName;
        form.appendChild(userNameInlut);
      });
    }else
    [
      window.location.href = '/login'
    }

    </script>

      `);
    }

    app.post('/chat',(req,res) => {

      const message  = req.body.msg;
      const userName = req.headers['x-username'] || req.body.username || '';
    
      if(message){
        const data = `${userName} : ${message}\n`
        fs.appendFile(filePath,data,(err) => {
          if(err){
          console.error(err);
          res.status(500).send('Message not exist')
    
        }
        res.redirect('/chat');
      });
    }
       else
         res.redirect('/chat');
    
    });







app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});