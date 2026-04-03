console.log("Services JS Loaded");

const API_URL = "http://localhost:8081/api/services";

async function loadServices() {

    try {

        const response = await fetch(API_URL);

        const result = await response.json();

        console.log("API Response:", result);

        const services = result.data;

        const container = document.getElementById("servicesContainer");

        container.innerHTML = "";

        services.forEach(service => {

            // Convert service name → image filename
            const imageName = service.name
                .replace(/\s+/g, '')
                .toLowerCase();

            container.innerHTML += `

            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">

                <div class="service-card">

                    <img src="images/${imageName}.webp"
                         class="service-img"
                         onerror="this.src='images/default.webp'">

                    <h5 class="mt-3">${service.name}</h5>

                    <p>${service.description}</p>

                    <div class="price">₹ ${service.price}</div>

                   <button class="book-btn"
onclick="window.location='slots.html?serviceId=${service.id}'">
Book Now
</button>

                </div>

            </div>

            `;
        });

    } catch (error) {

        console.error("Error loading services:", error);

    }
}

function bookService(serviceId, serviceName) {

    alert("Booking for: " + serviceName);

}

loadServices();