
var tls = require('tls');
var fs = require('fs');
var path= require('path');
const PORT = 1337;
const HOST = '127.0.0.1'
var options = {
    key: fs.readFileSync(path.join(__dirname, 'cert','key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert','cert.pem')),
    rejectUnauthorized: false
};
var client = tls.connect(PORT, HOST, options, function() {
 // Check if the authorization worked
 if (client.authorized) {
 console.log("Connection authorized by a Certificate Authority.");
 } else {
 console.log("Connection not authorized: " + client.authorizationError)
 }
 // Send a friendly message
 client.write("I am the client sending you a message.");
});
client.on("data", function(data) {
 console.log('Received: %s [it is %d bytes long]',
 data.toString().replace(/(\n)/gm,""),
 data.length);
 // Close the connection after receiving the message
 client.end();
});
client.on('close', function() {
 console.log("Connection closed");
});
// When an error ocoures, show it.
client.on('error', function(error) {
 console.error(error);
 // Close the connection after the error occurred.
 client.destroy();
});
