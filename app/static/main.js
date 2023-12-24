const form = document.getElementById('my-form');
console.log(form)

// new
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
} 

// Password toggle
function myFunction() {
	var x = document.getElementById("password");
	if (x.type === "password") {
	  x.type = "email";
	} else {
	  x.type = "password";
	}
  }

// Sign up
const signupBtn = document.querySelector('#signup-btn');
signupBtn.addEventListener('click', e => {
e.preventDefault();

const email = document.querySelector('#email').value;
const password = document.querySelector('#password').value;

if (validate_email(email) == false || validate_password(password) == false) {
	// dont continue 
	alert('Email or Password is invalid')
	return
}

auth.createUserWithEmailAndPassword(email, password).then(cred => {
document.getElementById("message").innerHTML = "You are signed up!";
console.log('User signed up!');
document.forms['form'].reset();

// add user to database
var database_ref = database.ref()
// create user data
var user_data = {
	email : email,
	last_login : Date.now()
}
console.log('here 2')
database_ref.child('users/' + user.uid).set(user_data)

alert('User added to database')

})
.catch(error => {
	console.log(error.message);
	document.getElementById("message").innerHTML = error.message;
  })
});

// Log In
const loginBtn = document.querySelector('#login-btn');
loginBtn.addEventListener('click', e => {
e.preventDefault();

const email = document.querySelector('#email').value;
const password = document.querySelector('#password').value;

auth.signInWithEmailAndPassword(email, password)
  .then(cred => {
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	today = mm + '/' + dd + '/' + yyyy;
	console.log(today);
	alert("Thank you for logging in today! Hope to see you tomorrow! Please hit 'logout' on your way out.")
	document.getElementById("message").innerHTML = user.email + " is logged in!";
	console.log('Logged in user!');

	// update database
	var database_ref = database.ref()
	// create user data
	var user_data = {
		last_login : Date.now()
	}
	database_ref.child('users/' + user.uid).update(user_data)
	console.log('updated database')
	
	
  })
  .catch(error => {
	console.log(error.message);
	document.getElementById("message").innerHTML = error.message;
  })
});

// log out
const logoutBtn = document.querySelector('#logout-btn');
logoutBtn.addEventListener('click', e => {
  e.preventDefault();
  auth.signOut();
  console.log('User is logged out!');
})

auth.onAuthStateChanged(user => {
	if (user) {
		document.getElementById("message").innerHTML = user.email + " is logged in!";
	  console.log(user.email + " is logged in!");
	} else {
		document.getElementById("message").innerHTML = "User is logged out!";
		console.log('User is logged out!');
	}
  });


// validate email address
function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        return true
    } else {
        return false
    }
}

// validate password
function validate_password(password) {
    // password should be greater than 8 characters
    if (password < 8) {
		console.log("password length < 8")
        return false
    } else {
		console.log("password all good")
        return true
    }
}

// password reset
// import { getAuth, sendPasswordResetEmail } from "firebase/auth";
const resetBtn = document.querySelector('#reset-btn');
console.log(resetBtn)
resetBtn.addEventListener('click', e => {
	e.preventDefault();
	
	console.log("reset email func")
	// const auth = auth.getAuth();

	const email = document.querySelector('#email').value;
	if (email) {
		console.log(email)
		auth.sendPasswordResetEmail(email)
	.then(() => {
    	// Password reset email sent!
    	console.log("email sent")
  	})
  	.catch((error) => {
    	var errorCode = error.code;
    	var errorMessage = error.message;
    	console.log(errorMessage)
  	});
	} else {
		alert("Please enter email address")
	}
	
})