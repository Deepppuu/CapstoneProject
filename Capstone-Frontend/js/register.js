console.log("Register page loaded");

const API = "http://localhost:8081/api";

async function registerUser(){

const name = document.getElementById("name").value.trim();
const email = document.getElementById("email").value.trim();
const password = document.getElementById("password").value;
const confirmPassword = document.getElementById("confirmPassword").value;


/* REQUIRED FIELD VALIDATION */

if(!name || !email || !password || !confirmPassword){

alert("Please fill all fields");
return;

}


/* NAME VALIDATION */

const namePattern = /^[A-Za-z ]{3,30}$/;

if(!namePattern.test(name)){

alert("Name must contain only letters and be 3–30 characters long");
return;

}


/* EMAIL VALIDATION */

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!emailPattern.test(email)){

alert("Invalid email format");
return;

}


/* PASSWORD LENGTH VALIDATION */

if(password.length < 6){

alert("Password must be at least 6 characters long");
return;

}


/* PASSWORD MATCH VALIDATION */

if(password !== confirmPassword){

alert("Passwords do not match");
return;

}


/* API CALL */

try{

const response = await fetch(`${API}/users`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

name:name,
email:email,
password:password

})

});

const result = await response.json();

if(response.ok){

alert("Registration Successful!");

window.location.href="login.html";

}else{

alert(result.message || "Registration failed");

}

}catch(err){

console.error("Registration error:",err);

alert("Server error. Please try again.");

}

}