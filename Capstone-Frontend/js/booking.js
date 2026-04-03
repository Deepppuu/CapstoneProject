const API = "http://localhost:8081/api";

/* LOGIN CHECK */

const userId = localStorage.getItem("userId");

if (!userId) {
  window.location.href = "login.html";
  throw new Error("User not logged in");
}

/* PARAMS */

const params = new URLSearchParams(window.location.search);

const serviceId = params.get("serviceId");
const slotId = params.get("slotId");

if (!serviceId || !slotId) {
  window.location.href = "services.html";
  throw new Error("Missing params");
}

/* SLOT MAP */

const slotMap = {
  1:"09:00", 2:"10:00", 3:"11:00", 4:"12:00",
  5:"02:00", 6:"03:00", 7:"04:00", 8:"05:00",
  9:"06:00", 10:"07:00", 11:"08:00", 12:"09:00",
  13:"10:00", 14:"11:00", 15:"12:00"
};

/* LOAD DATA */

async function loadBooking() {

  try {

    const res = await fetch(`${API}/services/${serviceId}`);
    const result = await res.json();

    const service = result.data || {};

    /* ✅ STORE SERVICE IN LOCAL STORAGE */
    localStorage.setItem("selectedService", JSON.stringify(service));

    /* STORE SLOT TIME IN LOCAL STORAGE */
    const slotTime = slotMap[slotId] || "Selected Slot";
    localStorage.setItem("selectedSlotTime", slotTime);

    /* SERVICE */
    document.getElementById("serviceName").innerText = service.name || "";
    document.getElementById("serviceDescription").innerText = service.description || "";

    /* SLOT */
    document.getElementById("slotTime").innerText = slotTime;

    /* DATE */
    const date = localStorage.getItem("bookingDate") || "";
    document.getElementById("bookingDate").innerText = date;

    /* PRICE */
    document.getElementById("price").innerText = service.price || "";
    document.getElementById("servicePrice").innerText = service.price || "";

  } catch (err) {
    console.error("Load error:", err);
  }

}

/* CONFIRM BOOKING */

async function confirmBooking() {

  try {

    const res = await fetch(`${API}/bookings/book?userId=${userId}&slotId=${slotId}`, {
      method: "POST"
    });

    const result = await res.json();

    if (result.status !== "SUCCESS") {
      alert(result.message || "Booking failed");
      return;
    }

    const bookingId = result.data?.id;

    if (!bookingId) {
      alert("Booking failed");
      return;
    }

    window.location.href = `payment.html?bookingId=${bookingId}`;

  } catch (err) {
    console.error(err);
    alert("Booking failed");
  }

}

/* CANCEL */

function cancelBooking() {
  window.location.href = "services.html";
}

/* LOAD */

window.onload = loadBooking;