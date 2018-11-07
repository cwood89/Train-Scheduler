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