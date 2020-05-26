window.addEventListener("load", gogopower);

function gogopower(){
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCU_K7bJAGPqxcfZUZonT9Kgu1RCiOTURw",
    authDomain: "my-personal-topic.firebaseapp.com",
    databaseURL: "https://my-personal-topic.firebaseio.com",
    projectId: "my-personal-topic",
    storageBucket: "my-personal-topic.appspot.com",
    messagingSenderId: "50448876934",
    appId: "1:50448876934:web:e2c91295e32e6313ce9807"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  

}
