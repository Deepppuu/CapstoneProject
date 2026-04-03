const API = "http://localhost:8081/api";

/* LOGIN CHECK */

const userId = localStorage.getItem("userId");

if(!userId){
  alert("Please login first");

  // 🔥 TEMP FIX (REMOVE AFTER LOGIN WORKS)
  localStorage.setItem("userId", "2");

  location.reload();
}

/* LOAD BOOKINGS */

async function loadBookings(){

  try{

    const res = await fetch(`${API}/bookings/user/${userId}`);

    if(!res.ok){
      throw new Error("API failed");
    }

    const result = await res.json();
    const bookings = result.data || [];

    console.log("Bookings:", bookings);

    const container = document.getElementById("bookingList");
    container.innerHTML = "";

    if(bookings.length === 0){
      container.innerHTML = "<p class='text-center'>No bookings found</p>";
      return;
    }

    for(const b of bookings){

      /* PAYMENT STATUS */
      let paymentStatus = "NOT PAID";

      try{
        const payRes = await fetch(`${API}/payments/booking/${b.id}`);
        if(payRes.ok){
          paymentStatus = "PAID";
        }
      }catch(e){
        console.log("Payment check failed");
      }

      const card = document.createElement("div");
      card.className = "booking-card";

      card.innerHTML = `
        <div class="d-flex justify-content-between">
          <h5>${b.slot?.service?.name || "Service"}</h5>
          <span class="status ${b.status.toLowerCase()}">${b.status}</span>
        </div>

        <p><strong>Date:</strong> ${b.slot?.date || "-"}</p>
        <p><strong>Time:</strong> ${b.slot?.time || "-"}</p>

        <p><strong>Payment:</strong> ${paymentStatus}</p>

        <div>

          ${b.status === "BOOKED" ? `
            <button class="btn btn-danger btn-sm btn-action"
              onclick="cancelBooking(${b.id})">
              Cancel
            </button>

            
          ` : ""}

          ${paymentStatus === "NOT PAID" && b.status === "BOOKED" ? `
            <button class="btn btn-success btn-sm"
              onclick="goToPayment(${b.id})">
              Pay Now
            </button>
          ` : ""}

        </div>
      `;

      container.appendChild(card);
    }

  }catch(err){
    console.error("Load error:", err);
    document.getElementById("bookingList").innerHTML =
      "<p class='text-danger text-center'>Failed to load bookings</p>";
  }

}

/* CANCEL */

async function cancelBooking(id){

  if(!confirm("Cancel booking?")) return;

  try{
    await fetch(`${API}/bookings/cancel/${id}`, {
      method:"PUT"
    });

    alert("Booking cancelled");
    loadBookings();

  }catch(err){
    console.error(err);
    alert("Cancel failed");
  }
}

/* RESCHEDULE */

async function rescheduleBooking(id){

  const newSlotId = prompt("Enter new Slot ID:");

  if(!newSlotId) return;

  try{

    await fetch(`${API}/bookings/reschedule?bookingId=${id}&newSlotId=${newSlotId}`, {
      method:"PUT"
    });

    alert("Rescheduled");
    loadBookings();

  }catch(err){
    console.error(err);
    alert("Reschedule failed");
  }
}

/* PAYMENT */

function goToPayment(id){
  window.location = `payment.html?bookingId=${id}`;
}

/* AUTO REFRESH */

setInterval(loadBookings, 5000);

/* INITIAL LOAD */

loadBookings();