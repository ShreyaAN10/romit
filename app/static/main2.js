
        const firebaseConfig = {
          apiKey: "AIzaSyCZgHmAHfzBR8KdNIlzmBAxvtA0N4cD2vY",
          authDomain: "romit-18f7c.firebaseapp.com",
          projectId: "romit-18f7c",
          storageBucket: "romit-18f7c.appspot.com",
          messagingSenderId: "416415891647",
          appId: "1:416415891647:web:1db2362509120a5f30c60a",
          measurementId: "G-8XVCTH32JT"
        };
      
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        // const analytics = getAnalytics(firebase);
        // Initialize variables
        const auth = firebase.auth()
        const database = firebase.database()

        // set up sign-up function
        function signup() {
            // get all inputs first
            email = document.getElementById('email').value
            username = document.getElementById('username').value
            console.log(username)
            password = document.getElementById('password').value

            if (validate_email(email) == false || validate_password(password) == false) {
                // dont continue 
                alert('Email or Password is invalid')
                return
            }
            if (validate_field(username) == false) {
                // username is missing
                alert('Missing username')
                return
            }
            console.log('all valid inputs')
            // Authentication
            auth.createUserWithEmailAndPassword(email, password)
            .then(function() {
                var user = auth.currentUser

                // add user to database
                var database_ref = database.ref()
                // create user data
                var user_data = {
                    email : email,
                    password : password,
                    last_login : Date.now()
                }
                console.log('here 2')
                database_ref.child('users/' + user.uid).set(user_data)

                alert('User created')
            })
            .catch(function(error) {
                var error_code = error.code
                var error_message = error.message

                alert(error_message)
            })
        }

        // set up login function
        function login() {
            // get all inputs first
            email = document.getElementById('login-email').value
            // username = document.getElementById('username').value
            password = document.getElementById('login-password').value

            if (validate_email(email) == false || validate_password(password) == false) {
                // dont continue 
                alert('Email or Password is invalid')
                return
            }
            if (validate_field(username) == false) {
                // username is missing
                alert('Missing username')
                return
            }
            console.log('all valid inputs')

            auth.signInWithEmailAndPassword(email, password)
            .then(function() {
                console.log("hereeeee")
                var user = auth.currentUser
                console.log(user.username)
                // var name = user.getDisplayName();
                // console.log(name)

                // add user to database
                var database_ref = database.ref()
                // create user data
                var user_data = {
                    last_login : Date.now()
                }
                console.log('here 2')
                database_ref.child('users/' + user.uid).update(user_data)
                window.location.replace("/home");
                alert('User logged in')
            })
            .catch(function(error) {
                var error_code = error.code
                var error_message = error.message

                alert(error_message)
            })
        }

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
                return false
            } else {
                return true
            }
        }

        // validate other fields
        function validate_field(field) {
            // return false if field is null or length is <= 0
            if (field == null) {
                return false
            }
            if (field.length <= 0) {
                return false
            } else {
                return true
            }
        }


const logoutBtn = document.getElementById("logout-btn");
console.log("here 112")
if (logoutBtn) {
    console.log("here 11")
    logoutBtn.addEventListener('click', e => {
        e.preventDefault();
        auth.signOut();
        console.log('User signed out!');
    })
}

