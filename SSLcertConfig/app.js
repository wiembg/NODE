// Import the top-level function of express
const express = require('express');
const http = require('http');
var tls = require('tls');
var fs = require('fs');
var path= require('path');

const app=express();
app.use ("/", (req,res,next)=> {
    
    res.send('Hello, World!');
    });

const sslServer=http.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert','key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert','cert.pem'))
    rejectUnauthorized: false
},app);    

sslServer.listen(1337,()=>{
    console.log('Server listening on http://localhost:1337');
}   );
/* const PORT = 1337;
const HOST = '127.0.0.1'
var options = {
    key: fs.readFileSync('private-key.pem'),
    cert: fs.readFileSync('public-cert.pem')
   };
   var server = tls.createServer(options, function(socket) {
    // Send a friendly message
    socket.write("I am the server sending you a message.");
    // Print the data that we received
    socket.on('data', function(data) {
    console.log('Received: %s [it is %d bytes long]',
    data.toString().replace(/(\n)/gm,""),
    data.length);
    });
    // Let us know when the transmission is over
    socket.on('end', function() {
    console.log('EOT (End Of Transmission)');
    });
   });
   // Start listening on a specific port and address
   server.listen(PORT, HOST, function() {
    console.log("I'm listening at %s, on port %s", HOST, PORT);
   });
   // When an error occurs, show it.
   server.on('error', function(error)  {
    console.error(error);
    // Close the connection after the error occurred.
    server.destroy();
   }) */