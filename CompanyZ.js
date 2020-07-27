const express = require("express");
var cors = require("cors");
const mysql = require("mysql");
var http = require('http');
const fetch = require('node-fetch');
const app = express();
const bodyParser = require("body-parser");
app.use(cors());

var config = {
  host: "assignment5.cem910xoytdp.us-east-1.rds.amazonaws.com",
  user: "lavanya",
  password: "B00834718",
  database: "Project-G14",
  port: 3306,
};

const db = new mysql.createConnection(config);
db.connect(function (err) {
  if (err) {
    console.log("!!! Cannot connect !!! Error:");
    throw err;
  } else {
    console.log("Connection established.");
    sql = "use `Project-G14`;";
    db.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Result: " + JSON.stringify(result));
    });
  }
});

//Get data
app.get("/companyz/users", (req, res) => {
  console.log("i m here");
  let sql = "SELECT * FROM userlogin";
  let query = db.query(sql, (err, Parts718) => {
    if (err) throw err;
    console.log(Parts718);
    res.json({ success: true });
  });
});
//Retrieve data corresponding to username and password
app.get("/companyz/users/:username/:password", (req, res) => {
  let values = [req.params.username, req.params.password];
  let sql = "SELECT * FROM userlogin WHERE username = ? AND password =?";
  console.log(sql);
  let query = db.query(sql, values, (err, result) => {
    if (err) {
      console.log("error"+err);
      res.json({ error: err });
      return;
    }

    if (result == "") {
      res.status(401);
      res.json({ body: "Login failed" });
      console.log(
        "user with name " +
          req.params.username +
          " and password " +
          req.params.password +
          " was not found"
      );
      //res.send("success")  ;
    } else {
    console.log(result);
      res.send(result[0]);
    }
  });
});

const jsonParser = bodyParser.json();

app.post("/companyz/insertSearch", jsonParser, (req, res) => {
  console.log(req.body.jobName);
  let date_ob = new Date();

  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  // current hours
  let hours = date_ob.getHours();

  // current minutes
  let minutes = date_ob.getMinutes();

  // current seconds
  let seconds = date_ob.getSeconds();

  let values = [req.body.jobName];
  let sql = "INSERT INTO search SET ?";
  let data = {
    jobName: req.body.jobName,
    date: year + "-" + month + "-" + date,
    time: hours + ":" + minutes + ":" + seconds,
  };
  console.log(data);
  let query = db.query(sql, data, (err, result) => {
    if (err) {
      throw err;
    }
    res.json({ message: "Search entry inserted" });
  });
});

 app.post('/companyz/book',jsonParser,(req,res)=>{
  let reqObject = req.body;
  let userId = reqObject.userId;
  let partsToBeBooked = reqObject.partsToBook;

  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();

  var myJSON = JSON.stringify(partsToBeBooked);
  var jsonArr = JSON.parse(myJSON);
  var jobId = partsToBeBooked[0].id;

  //Check if that jobid is already there for that user

  let valuesForJobs = [jobId, userId];
  let sqlForJobs = "SELECT * FROM jobparts WHERE jobName = ? AND userId =?";

  let queryForJobs = db.query(
    sqlForJobs,
    valuesForJobs,
    (err, resultForJobs) => {
      if (err) {
        console.log("error");
        res.json({ error: err });
        return;
      }

      if (resultForJobs.length == 0 && partsToBeBooked) {
        partsToBeBooked.forEach(function (partToBeBooked) {
          newQuantity = partToBeBooked.qoh - partToBeBooked.qty;
          if (newQuantity < 0) {
            let insertSqlFailure = "INSERT INTO jobparts SET ?";
            let JobPartsdataFailure = {
              partId: partToBeBooked.partId,
              jobName: partToBeBooked.id,
              userId: userId,
              qty: partToBeBooked.qty,
              date: year + "-" + month + "-" + date,
              time: hours + ":" + minutes + ":" + seconds,
              result: "Failure",
            };

            let queryFailure = db.query(
              insertSqlFailure,
              JobPartsdataFailure,
              (err, result) => {
                if (err) {
                  console.log("Error Occurred");
                }
                console.log("SUCCESSFULLY INSERTED IN JobParts");
              }
            );
          } else {
            let data = JSON.stringify({
              partId: partToBeBooked.partId,
              qoh: newQuantity,
              partName: partToBeBooked.partName  
            });
      
 
            fetch('https://0xfbndiva5.execute-api.us-east-1.amazonaws.com/Dev/parts', {
                    method: 'put',
                    body:    data,
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(res => console.log('Called Company Y For parts update with status'+ res.status));
              }  
          //Insert new record in JobParts
          let insertSql = "INSERT INTO jobparts SET ?";
          let JobPartsdata = {
            partId: partToBeBooked.partId,
            jobName: partToBeBooked.id,
            userId: userId,
            qty: partToBeBooked.qty,
            date: year + "-" + month + "-" + date,
            time: hours + ":" + minutes + ":" + seconds,
            result: "Success",
          };

          let query = db.query(insertSql, JobPartsdata, (err, result) => {
            if (err) {
              throw err;
            }
            console.log("SUCCESSFULLY INSERTED IN JobParts");
          });

          //Insert new record in PartOrders
          let PartOrdersXdata = JSON.stringify({
            partId: partToBeBooked.partId,
            jobName: partToBeBooked.id,
            userId: userId,
            qty: partToBeBooked.qty,
          });
  

          fetch('https://31u8etrzrf.execute-api.us-east-1.amazonaws.com/Test/postpartorders', {
            method: 'post',
            body:    PartOrdersXdata,
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => console.log('Called Company X For parts post'+res.status),
        console.log('Part ID for X: ' + partToBeBooked.partId)
        );

          //Insert new record in partordersy
          
          let PartOrdersYdata = JSON.stringify({
            partId: partToBeBooked.partId,
            jobName: partToBeBooked.id,
            userId: userId,
            qty: partToBeBooked.qty,
          });
          fetch('https://0xfbndiva5.execute-api.us-east-1.amazonaws.com/Dev/partordersy', {
            method: 'post',
            body:    PartOrdersYdata,
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        .then(json => console.log(json))
        .then(res => console.log('Part ID for Y: ' + partToBeBooked.partId));

        });
        res.status(200);
        res.send("success");
      } else {
        //insert failure
        partsToBeBooked.forEach(function (partToBeBooked) {
          newQuantity = partToBeBooked.qoh - partToBeBooked.qty;
          let insertSqlFailure = "INSERT INTO jobparts SET ?";
          let JobPartsdataFailure = {
            partId: partToBeBooked.partId,
            jobName: partToBeBooked.id,
            userId: userId,
            qty: partToBeBooked.qty,
            date: year + "-" + month + "-" + date,
            time: hours + ":" + minutes + ":" + seconds,
            result: "Failure",
          };

          let queryFailure = db.query(
            insertSqlFailure,
            JobPartsdataFailure,
            (err, result) => {
              if (err) {
                console.log("Error Occurred");
              }
              console.log("SUCCESSFULLY INSERTED IN JobParts");
            }
          );
        });
        res.status(400);
        res.send("failure");
      }
    }
  );
  //end
});

app.listen(3000, () => console.log("listening on port...." + 3000));
