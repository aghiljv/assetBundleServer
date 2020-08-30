var express = require("express");
var app = express();
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const _ = require("lodash");

// //housing the index.html file for user interface
// app.use(express.static(__dirname + "/public/"));

var http = require("http").Server(app);
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

// upload multiple files
app.post("/upload-assetbundles", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else if (req.files.assetbundles.length == undefined) {
      //Use the name of the input field (i.e. "assetbundles") to retrieve the uploaded file
      let assetbundles = req.files.assetbundles;

      //Use the mv() method to place the file in upload directory (i.e. "uploads")
      assetbundles.mv("./ABs/" + assetbundles.name);

      //send response
      res.send({
        status: true,
        message: "File is uploaded",
        data: {
          name: assetbundles.name,
          mimetype: assetbundles.mimetype,
          size: assetbundles.size,
        },
      });
    } else {
      let data = [];

      //loop all files
      _.forEach(_.keysIn(req.files.assetbundles), (key) => {
        let assetbundle = req.files.assetbundles[key];
        //move assetbundle to upload directory
        assetbundle.mv("./ABs/" + assetbundle.name);

        //push file details
        data.push({
          name: assetbundle.name,
          mimetype: assetbundle.mimetype,
          size: assetbundle.size,
        });
      });

      //return response
      res.send({
        status: true,
        message: "Files are uploaded",
        data: data,
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

//download the desired file by name
app.get("/download/:name", function (req, res) {
  res.download(__dirname + "/ABs/" + req.params.name, req.params.name);
});

//assigning a port for the server
http.listen(PORT, function () {
  console.log(`Server Started at PORT ${PORT}`);
});
