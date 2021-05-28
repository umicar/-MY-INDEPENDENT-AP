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
user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");
function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        console.log(firebase_message_id);
                        console.log(message_data);
                        name = message_data['name'];
                        message = message_data['message'];
                        like = message_data['like'];
                        nametage = "<h4>" + name + "<img src='tick.png' class='user_tick'></h4>";
                        messagetage = "<h4 class='message_h4'>" + message + "</h4>";
                        like_button = "<button class='btn btn-waring' id=" + firebase_message_id + "value=" + like + "onclick='updateLike(this.id)'>";
                        spantage = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
                        row = nametage + messagetage + like_button + spantage;
                          document.getElementById("output").innerHTML += row;
                        }
                  });
            });
      }

getData();
function updateLike(message_id) {
      console.log("clicked on like button" + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      update_likes = Number(likes) + 1;
      console.log(update_likes);
      firebase.database().ref(room_name).child(message_id).update({ like: update_likes });
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send() {
      message = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: message,
            like: 0
      });
      document.getElementById("msg").value = "";
}