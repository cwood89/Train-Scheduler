// Initialize Firebase
var config = {
    apiKey: "AIzaSyBtq1Vdy_03eQ6H7HuusHxU1cMzwSHUWA4",
    authDomain: "bootcamp-homework-b6d8a.firebaseapp.com",
    databaseURL: "https://bootcamp-homework-b6d8a.firebaseio.com",
    projectId: "bootcamp-homework-b6d8a",
    storageBucket: "bootcamp-homework-b6d8a.appspot.com",
    messagingSenderId: "865911150402"
  };

firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

$("button").on("click", function (event) {
    // DOM elements
    var train = {
        name: $("#train").val().trim(),
        destination: $("#destination").val().trim(),
        time: $("#time").val().trim(),
        frequency: $("#frequency").val().trim(),
    };
    console.log(train);
    event.preventDefault();
    // sets form data to database
    database.ref().set({
        name: train.name,
        destination: train.destination,
        time: train.time,
        frequency: train.frequency,
    });
    timeCalculator();
});

// function to add to table
database.ref().on("value", function(snapshot) {
    var row = $("<tr>");
    timeCalculator();
    row.append("<td>" + snapshot.val().name + "</td>");
    row.append("<td>" + snapshot.val().destination + "</td>");
    row.append("<td>" + snapshot.val().time + "</td>");
    row.append("<td>" + snapshot.val().frequency + "</td>");
    $("#train-table").append(row);
});

function timeCalculator() {
    // Current Time
    var currentTime = moment();
    // first train time
    var trainTime = moment(train.time, "HH:mm");//.subtract(1, "years");
    console.log("train time: " + trainTime);
    // difference between first train time and current time
    var diffTime = currentTime.diff(moment(trainTime), "minutes");
    console.log("time diff: " + diffTime);
    // time apart (remainder)
    var tRemainder = diffTime % train.frequency;
    console.log(tRemainder);
     // minutes until next train
     var tMinutesTillTrain = train.frequency - tRemainder;
     console.log("next train: " + tMinutesTillTrain);
// next train time
     var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("next arrival: " + moment(nextTrain).format("hh:mm"));
};