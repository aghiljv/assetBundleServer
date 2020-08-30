var express = require("express");
var app = express();
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");


const download =  require('./routes/download');
const upload = require('./routes/upload');

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// PORT
const PORT = process.env.PORT || 5000;

// enable files upload
app.use(
  fileUpload({
    createParentPath: true
  })
);

app.use('/upload', upload);

//download the desired file by name
app.use('/download', download);

//assigning a port for the server
app.listen(PORT, (req, res) => {
	console.log(`Server Started at PORT ${PORT}`);
});
