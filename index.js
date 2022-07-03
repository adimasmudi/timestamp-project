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
  const regexp = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
  const regexp2 = /^(\d{0,13})?$/; // {0,13} instead of {13}
  const date_string = req.params.date
  let date;
    if(typeof date_string === "string"){
      if(regexp.test(date_string)){
        date = new Date(date_string);
      }
      else if(regexp2.test(date_string)){
        date = new Date(Number(date_string));
      }
      else{
        res.json({
          error : "Invalid Date"
        })
        return
      }
      res.json({
        "unix" : date.getTime(),
        "utc" : date.toUTCString()
      })
}})


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
