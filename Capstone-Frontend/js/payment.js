const API = "http://localhost:8081/api";

/* LOGIN CHECK */

const userId = localStorage.getItem("userId");

if (!userId) {
  alert("Please login first");
  window.location = "login.html";
}

/* GET BOOKING ID */

const params = new URLSearchParams(window.location.search);
const bookingId = params.get("bookingId");

/* LOAD BOOKING */

async function loadBooking() {

  if (!bookingId) {
    alert("Invalid booking. Please book again.");
    window.location = "services.html";
    return;
  }

  try {

    const res = await fetch(`${API}/bookings/${bookingId}`);

    if (!res.ok) {
      alert("Booking not found");
      return;
    }

    const result = await res.json();
    const booking = result.data;

    /* ✅ FIX: USE STORED SERVICE AND SLOT TIME */
    const storedService = localStorage.getItem("selectedService");
    const storedSlotTime = localStorage.getItem("selectedSlotTime");

    let service;

    if (storedService) {
      service = JSON.parse(storedService);
    } else {
      service = booking.slot.service; // fallback
    }

    /* SERVICE */
    document.getElementById("serviceName").innerText = service.name;

    /* SLOT */
    document.getElementById("slotTime").innerText = storedSlotTime || booking.slot.time;

    /* DATE */
    document.getElementById("bookingDate").innerText = booking.slot.date;

    /* PRICE */
    document.getElementById("price").innerText = service.price;

  } catch (err) {
    console.error("Load Booking Error:", err);
    alert("Failed to load booking");
  }

}

/* PAYMENT */

async function makePayment() {

  const method = document.querySelector("input[name='paymentMethod']:checked");

  if (!method) {
    alert("Please select payment method");
    return;
  }

  const amount = Number(document.getElementById("price").innerText);

  try {

    const res = await fetch(`${API}/payments/pay?bookingId=${bookingId}&amount=${amount}`, {
      method: "POST"
    });

    if (!res.ok) {
      alert("Payment failed");
      return;
    }

    await res.json();

    alert("Payment Successful");

    /* ✅ CLEANUP */
    localStorage.removeItem("selectedService");
    localStorage.removeItem("selectedSlotTime");

    window.location = "bookings.html";

  } catch (err) {
    console.error("Payment Error:", err);
    alert("Payment failed");
  }

}

/* PAGE LOAD */

loadBooking();