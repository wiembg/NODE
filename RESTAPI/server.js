var express=  require('express');
//instancier server
var app = express();
app.get('/', function(req, res){
res.setHeader('Content-Type', 'text/html');
res.status(200).send(' <h1> Bonjour sur mon serveur ! </h1> ');
});

app.listen(8080);