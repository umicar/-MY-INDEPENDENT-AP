var firebaseConfig = {
      apiKey: "AIzaSyApFhmcZS0pIXQkcWiQDnxwJKaIOPe6ewM",
      authDomain: "proven-impact-296010.firebaseapp.com",
      databaseURL: "https://proven-impact-296010-default-rtdb.firebaseio.com",
      projectId: "proven-impact-296010",
      storageBucket: "proven-impact-296010.appspot.com",
      messagingSenderId: "103138527656",
      appId: "1:103138527656:web:60c04e53dd53715c43f59d",
      measurementId: "G-MYH31F0H80"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
//ADD YOUR FIREBASE LINKS HERE
user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name + " !";

function add_room() {
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose: "adding room name"
      });
      localStorage.setItem("room_name", room_name);
      window.location = "kwitter_page.html";
}
function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  console.log("Room name - " + Room_names);
                  row = "<div class='room_name' id = " + Room_names + " onclick='redirectToRoomName(this.id)'>#" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;
            });
      });
}
getData();

function redirectToRoomName(name) {
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}