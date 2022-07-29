var express=  require('express');

require('dotenv').config()
var bodyParser = require('body-parser')
var apiRouter = require('./apiRouter').router;
//instancier server
var app = express();
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-formurlencoded
app.use(bodyParser.json()); // for parsing application/json


app.get('/', function(req, res){
res.setHeader('Content-Type', 'text/html');
res.status(200).send(' <h1> Bonjour sur mon serveur ! </h1> ');
});
app.use('/api/', apiRouter);
app.listen(8080)
//app.listen(process.env.PORT,()=>console.log(`Server running on port ${process.env.PORT}`));
