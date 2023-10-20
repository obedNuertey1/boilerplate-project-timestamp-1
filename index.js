// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('../public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//Solution 1

app.get("/api/:date?", (req, res, next)=>{
	const endPointRegex =  /^\d{4}\-\d{1,2}\-\d{1,2}$/ig;
	const errorRegex =  /^(\d{4}\-\d{1,2}\-\d{1,2}|\d{1,16})$/ig;
	let endPointString = req.params.date;
	console.log("empty endpoint = "+endPointString);
	var now;
	if(((errorRegex.test(endPointString) === false) || endPointString > 8640000000000000) && endPointString !== undefined){
		req.err = "Invalid Date";
		next();
	}
	else if(endPointRegex.test(endPointString)){
		now = new Date(req.params.date);
	}else{
		if(endPointString === "" || endPointString === undefined){
			now = new Date();
		}else{
			now = new Date(parseInt(req.params.date));
		}
	}
	let myDateString = now.toString().split(' ');
	req.dayOfTheWeek = myDateString[0];
	req.month = myDateString[1];
	req.dayOfTheMonth = myDateString[2];
	req.year = myDateString[3];
	req.time = myDateString[4];
	const zoneRegex = /([a-zA-Z]*)/gi;
	req.timeZone = myDateString[5].match(zoneRegex)[0];
	req.unix = now.getTime();
	next();
}, (req, res)=>{
	const errorRegex =  /^(\d{4}\-\d{1,2}\-\d{1,2}|\d+)$/ig;
	let endPointString = req.params.date;
	if(((errorRegex.test(endPointString) === false) || endPointString > 8640000000000000) && endPointString !== undefined){
		res.json({error: req.err});
	}else{
		res.json({"unix":req.unix, "utc": `${req.dayOfTheWeek}, ${req.dayOfTheMonth} ${req.month} ${req.year} ${req.time} ${req.timeZone}`});
	}
});


/*//Solution 2 - more concised
app.get("/api/", (req, res)=>{
	const date = new Date();
	res.json({unix: date.getTime(), utc: date.toUTCString()});
});

app.get("/api/:date_string?", (req, res)=>{
	const {date_string} = req.params;

	let date = new Date(date_string);

	if(date.toString() === "Invalid Date"){
		date = new Date(parseInt(date_string));
	}

	if(date.toString() === 'Invalid Date'){
		return res.json({
			error: "Invalid Date"
		});
	}else{
		return res.json({
			unix: date.getTime(),
			utc: date.toUTCString()
		});
	}
});
*/
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
