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
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api', (req, res)=>{
  res.json({
    "unix" : Date.now(),
    "utc" : new Date().toUTCString()
  })
})

app.get('/api/:date', (req, res)=>{
  let date_string = req.params.date
  if(typeof date_string === "string"){
    if(/\d{5,}/.test(date_string)){
      res.json({
        "unix" : new Date(Number(date_string)).getTime(),
        "utc" : new Date(Number(date_string)).toUTCString()
      })
    }
    else{
      let dateObject = new Date(date_string);

    if (dateObject.toString() === "Invalid Date") {

      res.json({ error: "Invalid Date" });

    } else {

      res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });

    }

    }
    
    
  }
})


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
