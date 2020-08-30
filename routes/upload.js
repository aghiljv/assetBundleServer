const express = require("express");
const router = express.Router();

// upload multiple files
router.post("/", async (req, res) => {
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
        assetbundles.mv(__dirname + "/../ABs/" + assetbundles.name);
  
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
          assetbundle.mv(__dirname + "/../ABs/" + assetbundle.name);
  
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

module.exports = router;