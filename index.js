const express = require("express");
const app = express();
const fs = require("fs");
const path = require('path');

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/matematicno-modeliranje", (req, res) => { 
    res.sendFile(path.join(__dirname+"/public/index.html"));
})

app.post("/matematicno-modeliranje/add", (req, res) => {
    var jsonContent = JSON.stringify(req.body);
    console.log(jsonContent);
 
    fs.writeFile("./tests/" + req.body.name + ".json", jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
 
        console.log("JSON file has been saved.");
    });
})

app.listen(3000, () => {console.log("Listening")});