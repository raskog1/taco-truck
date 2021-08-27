const truckData = [];
const days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
const day = days[new Date().getDay()];

$(document).ready(function () {
  fetch("https://my.api.mockaroo.com/locations.json?key=a45f1200")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (let i = 0; i < 3; i++) {
        const element = data[i];
        const closing = element[`${day}_close`];

        $("#card-wrap").append(
          `<div class="card mb-3" tabindex="0" data-lat=${
            element.latitude
          } data-lon=${element.longitude} style="width: 100%">
                <div class="card-body">
                  <h2 class="card-title">Taco Truck ${i + 1}</h2>
                  <p>${element.address}</p>
                  <p>${element.city}, ${element.state} ${
            element.postal_code
          }</p>
                  <p class="open">Open today until ${closing}</p>
                  <p class="phone">
                    <img src="./assets/images/phone-icon.png" />123-456-7890
                  </p>
                  <div class="d-flex justify-content-between mt-3">
                    <button href="#" class="btn btn-secondary directions" style="width: 47%" data-lat=${
                      element.latitude
                    } data-lon=${element.longitude}
                      >Directions</button
                    >
                    <button class="btn btn-secondary more-info" style="width: 47%" data-bs-toggle="modal" data-bs-target="#details" data-id=${
                      element.id
                    }
                      >More Info</button
                    >
                  </div>
                </div>
              </div>`
        );
        truckData.push(element);
      }
    });
});

// Displays map based on lat/lon fed in from card data attribute
function showMap(lat, lon) {
  const map = new google.maps.Map(document.querySelector("#map"), {
    center: { lat: lat, lng: lon },
    zoom: 14,
  });

  const marker = new google.maps.Marker({
    position: { lat: lat, lng: lon },
    icon: "./assets/images/map-pin.png",
    map: map,
  });
}

// Event Listener for cards, extracting lat/lon from data-attributes
$("#card-wrap").on("click", ".card", function () {
  const lat = $(this).data("lat");
  const lon = $(this).data("lon");

  showMap(lat, lon);
});

// Event Listener for Directions buttons to redirect to Google Maps
$("#card-wrap").on("click", ".directions", function (e) {
  e.stopPropagation();
  const lat = $(this).data("lat");
  const lon = $(this).data("lon");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (data) {
      if (data.coords) {
        window.open(
          `https://maps.google.fr/maps?saddr=${data.coords.latitude},${data.coords.longitude}&daddr=${lat},${lon}`,
          "_blank"
        );
      }
    });
  }
});

// Event Listener for More Info buttons
$("#card-wrap").on("click", ".more-info", function (e) {
  e.stopPropagation();
  const id = $(this).data("id");
  const data = truckData[id - 1];
  $(".modal-content").empty().append(`
                <div class="modal-header p-2">
                  <button
                    type="button"
                    class="btn-close d-block float-end"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body p-2">
                  <div class="modal-image">
                    <img src="./assets/images/taco${data.id}.jpg" alt="Taco truck" />
                  </div>

                  <div class="modal-address">
                    <h2 class="card-title">Taco Truck ${data.id}</h2>
                    <p>${data.address}</p>
                    <p>${data.city}, ${data.state} ${data.postal_code}</p>
                    <div class="modal-contact p-2 row">
                      <p class="phone col-6">
                        <img src="./assets/images/phone-icon.png" />123-456-7890
                      </p>
                      <p class="drive col-6">
                        <img src="./assets/images/direction-icon.png" />Get
                        Directions
                      </p>
                    </div>
                  </div>

                  <div class="modal-hours row">
                    <div class="col-4">
                      <p>Monday</p>
                      <p>Tuesday</p>
                      <p>Wednesday</p>
                      <p>Thursday</p>
                      <p>Friday</p>
                      <p>Saturday</p>
                      <p>Sunday</p>
                    </div>
                    <div class="col-8">
                      <p>${data.monday_open} - ${data.monday_close}</p>
                      <p>${data.tuesday_open} - ${data.tuesday_close}</p>
                      <p>${data.wednesday_open} - ${data.wednesday_close}</p>
                      <p>${data.thursday_open} - ${data.thursday_close}</p>
                      <p>${data.friday_open} - ${data.friday_close}</p>
                      <p>${data.saturday_open} - ${data.saturday_close}</p>
                      <p>${data.sunday_open} - ${data.sunday_close}</p>
                    </div>
                    </div>
                </div>
                <div class="modal-footer p-2">
                  <a type="button" href="${data.url}" target="_blank" rel="noreferrer" class="btn btn-secondary">
                    View Full Details
                  </a>
            </div>`);
});

$("#details").on("hide.bs.modal", function () {
  setTimeout(() => {
    const target = document.activeElement.closest(".card");
    target.scrollIntoView({ block: "center" });
  }, 500);
});

// Footer Event Listener to swap "active" class between links
$("footer").on("click", "a", function () {
  $(this).addClass("active").siblings().removeClass("active");
});
