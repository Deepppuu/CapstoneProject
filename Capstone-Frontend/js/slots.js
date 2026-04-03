console.log("Slots page loaded");

const API = "http://localhost:8081/api";

const serviceId = new URLSearchParams(window.location.search).get("serviceId");

let selectedSlot = null;

/* LOGIN CHECK */

const userId = localStorage.getItem("userId");

if(!userId){
window.location = "login.html";
}

/* SLOT LIST */

const slots = [
 {id:1,time:"09:00 AM"},
 {id:2,time:"10:00 AM"},
 {id:3,time:"11:00 AM"},
 {id:4,time:"12:00 PM"},
 {id:5,time:"01:00 PM"},
 {id:6,time:"02:00 PM"},
 {id:7,time:"03:00 PM"},
 {id:8,time:"04:00 PM"},
 {id:9,time:"05:00 PM"},
 {id:10,time:"06:00 PM"},
 {id:11,time:"07:00 PM"},
 {id:12,time:"08:00 PM"},
 {id:13,time:"09:00 PM"},
 {id:14,time:"10:00 PM"},
 {id:15,time:"11:00 PM"}
];

/* PAGE LOAD */

window.onload = function(){
setTodayDate();
loadService();
renderSlots();
};

/* DATE FIX */

function setTodayDate(){

const today = new Date().toLocaleDateString('en-CA');

const dateInput = document.getElementById("bookingDate");

dateInput.value = today;
dateInput.setAttribute("min", today);
dateInput.setAttribute("max", today);

}

/* LOAD SERVICE */

async function loadService(){

try{

const res = await fetch(`${API}/services/${serviceId}`);
const result = await res.json();
const service = result.data;

document.getElementById("serviceInfo").innerHTML = `
<h4>${service.name}</h4>
<p>${service.description}</p>
<b>Price: ₹ ${service.price}</b>
`;

}catch(err){
console.error("Service load error:", err);
}

}

/* RENDER SLOTS */

function renderSlots(){

const container = document.getElementById("slots");

container.innerHTML = "";

/* CURRENT TIME (NORMALIZED) */

const now = new Date();
now.setSeconds(0);
now.setMilliseconds(0);

slots.forEach(slot => {

const slotTime = convertTo24Hour(slot.time);

const slotDate = new Date();
slotDate.setHours(slotTime.hour);
slotDate.setMinutes(slotTime.minute);
slotDate.setSeconds(0);
slotDate.setMilliseconds(0);

/* FIX: ONLY SHOW FUTURE SLOTS */

if(slotDate.getTime() <= now.getTime()){
return;
}

/* CLEAN TEXT (IMPORTANT FOR TESTS) */

const cleanTime = slot.time.trim();

/* RENDER */

container.innerHTML += `
<div class="col-md-3">
  <div class="slot" onclick="selectSlot(this,${slot.id})">
    ${cleanTime}
  </div>
</div>
`;

});

/* NO SLOT CASE */

if(container.innerHTML === ""){
container.innerHTML = "<p class='text-danger'>No slots available for today</p>";
}

}

/* SELECT SLOT */

function selectSlot(el,id){

document.querySelectorAll(".slot")
.forEach(s => s.classList.remove("selected"));

el.classList.add("selected");

selectedSlot = id;

}

/* CONFIRM BOOKING */

function confirmBooking(){

const userId = localStorage.getItem("userId");

/* LOGIN CHECK (FOR TEST CASE) */

if(!userId){
window.location = "login.html";
return;
}

if(!selectedSlot){
alert("Please select a time slot");
return;
}

const bookingDate = document.getElementById("bookingDate").value;

localStorage.setItem("bookingDate", bookingDate);

window.location = `booking.html?serviceId=${serviceId}&slotId=${selectedSlot}`;

}

/* TIME CONVERSION */

function convertTo24Hour(time){

time = time.trim();

let [t,period] = time.split(" ");
let [hour,minute] = t.split(":").map(Number);

if(period === "PM" && hour !== 12) hour += 12;
if(period === "AM" && hour === 12) hour = 0;

return {hour,minute};

}