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

  // DOM elements
      var train = {
          name:"",
          destination:"",
          frequency:"",
          time:"",
        };
  
$("button").on("click", function (event) {
    event.preventDefault();
    train.name = $("#train").val().trim(),
    train.destination = $("#destination").val().trim(),
    train.frequency = $("#frequency").val().trim(),
    train.time = $("#time").val().trim(),
      // sets form data to database
      database.ref().push({
          name: train.name,
          destination: train.destination,
          frequency: train.frequency,
          time:train.time,
        });
    });
database.ref().on("child_added", function (snapshot) {
        // moment variables ==================================>
        // Current Time
        var currentTime = moment();
        // first train time
        var trainTime = moment(snapshot.val().time, "HH:mm").subtract(1, "years");
        console.log("train time: " + trainTime);
        // difference between first train time and current time
        var diffTime = currentTime.diff(moment(trainTime), "minutes");
        console.log("time diff: " + diffTime);
        // time apart (remainder)
        var tRemainder = diffTime % snapshot.val().frequency;
        console.log(tRemainder);
        // minutes until next train
        var minutesTill = snapshot.val().frequency - tRemainder;
        console.log("next train: " + minutesTill);
        // next train time
        var nextTrain = moment().add(minutesTill, "minutes");
        var nextTrainTime =  moment(nextTrain).format("hh:mm");
        console.log("next arrival: " +nextTrainTime);
        // ==============================================================>
        
            // add to table
            var row = $("<tr>");
            row.append("<td>" + snapshot.val().name + "</td>");
            row.append("<td>" + snapshot.val().destination + "</td>");
            row.append("<td>" + snapshot.val().frequency + "</td>");
            row.append("<td>" + nextTrainTime + "</td>");
            row.append("<td>" + minutesTill + "</td>");
            $("#train-table").append(row);
});


