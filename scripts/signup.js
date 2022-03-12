// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAIIdB5-KL3zrLJF6CvtobOngzZ9Qt7P9Y",
    authDomain: "cftracker-nextgen.firebaseapp.com",
    databaseURL: "https://cftracker-nextgen-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "cftracker-nextgen",
    storageBucket: "cftracker-nextgen.appspot.com",
    messagingSenderId: "196835176227",
    appId: "1:196835176227:web:d973c7f8c569f5b790e696"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()
  
  // Set up our register function
  function register () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    full_name = document.getElementById('full_name').value
    birth_year = document.getElementById('birth_year').value
    gender = document.getElementById('gender').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      document.getElementById("status").innerHTML = "Email or Password is invalid!";
      return
      // Don't continue running the code
    }
    if (validate_field(full_name) == false) {
      document.getElementById("status").innerHTML = "Given username is invalid!";
      return
    }
   
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        email : email,
        full_name : full_name,
        last_login : Date.now(),
        birth_year : birth_year,
        gender : gender
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)
  
      // DOne
      document.getElementById("status").innerHTML = "User Created!";
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      document.getElementById("status").innerHTML = error_message;
    })
  }
  
  // Set up our login function
  function login () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      document.getElementById("status").innerHTML = "Email or Password is invalid!";
      return
      // Don't continue running the code
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)
  
      // DOne
      document.getElementById("status").innerHTML = "User logged in!";
  
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      document.getElementById("status").innerHTML = error_message;
    })
  }
  
  
  
  
  // Validate Functions
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }
