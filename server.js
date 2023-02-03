const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static("public"));

// index
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get('/api', (req, res) => {
  const utc = new Date().toUTCString()
  const unix = Date.parse(utc)
  res.json({ unix, utc })
});

// timestamp API
app.get("/api/:date?", (req, res) => {
  const dateString = req.params.date
  const dateStringRegex = /^[0-9]+$/
  const numbersOnly = dateStringRegex.test(dateString)

  if (!numbersOnly) {
    const unix = Date.parse(dateString)
    const utc = new Date(unix).toUTCString()

    unix
      ? res.json({ unix, utc })
      : res.json({ error: "Invalid Date" })
  }
  else {
    const unix = parseInt(dateString)
    const actualDate = new Date(unix)
    const utc = actualDate.toUTCString()

    res.json({ unix, utc })
  }
});

var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});