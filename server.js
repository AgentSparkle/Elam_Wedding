var express      = require('express'),
    bodyParser   = require('body-parser'),
    submitForm = require('./databaseScripts/formSubmit')

app = express();

//required to read HTML input
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

// Allows styles and images to be used by HTML files
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/images'));
app.use(express.static('../'+ __dirname + '/public'));

//Main Page
app.get('/', function(req, res) {
    res.render('home/pages/index.ejs');
});

//Attendance form is submitted to this route
app.post('/rsvp/submit', function(req, res) {
    //Grab all form variables submitted
    name = req.body.name
    email = req.body.email
    guests = req.body.guests
    song = req.body.song
    comments = req.body.comments
    console.log(name, email, guests, song, comments)
    //This function inserts form into MSSQL database
    submitForm.logAttendee(name, email, guests, song, comments, res)

});

app.listen(8080);
console.log('Server Starting')
console.log('localhost:8080')