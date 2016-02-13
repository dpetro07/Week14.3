var express = require('express');
var expressHandlebars = require('express-handlebars');
var app = express();
// var PORT = 8080;
var bodyParser = require('body-parser');
var mysql = require('mysql');

const PORT = process.env.NODE_ENV || 8080;

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  database: 'weather_db'
});

app.use(bodyParser.urlencoded({extended: false}));
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get('/', function(req, res) {
  connection.query("SELECT * FROM weather", function(err, results) {
    if(err) {
      throw err;
    }
    var data = {
      temps: results
    }
    res.render('weatherTemp', data);
  });
});

app.post('/', function(req, res) {
  connection.query('INSERT INTO weather (temperature) VALUES (?)', [req.body.temperature], function (err, results) {
      if (err) throw err;
      res.redirect('/');
      console.log(results);
    });
});




app.listen(PORT, function(req, res){
  console.log('Listening');
});