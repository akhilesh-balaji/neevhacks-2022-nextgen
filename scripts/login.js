function getUserName() {
  var nameField = document.getElementById('nameField').value;
  var result = document.getElementById('result');
  
  if (nameField.length < 3) {
      result.textContent = 'Username must contain at least 3 characters';
  
  } else {
      result.textContent = 'Your username is: ' + nameField;
  }
  }

  function getPassword() {
  var passwordField = document.getElementById('passwordField').value;
  var result = document.getElementById('result');
  
  if (passwordField.length < 3) {
      result.textContent = 'Password must contain at least 3 characters';
  
  } else {
      result.textContent = 'Your password is: ' + passwordField;
  }
  }
var time = new Date();
var hours = time.getHours();
var minutes = time.getMinutes();
var seconds = time.getSeconds();
