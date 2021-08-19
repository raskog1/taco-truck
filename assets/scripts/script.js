$(document).ready(function () {
  fetch("https://my.api.mockaroo.com/locations.json?key=a45f1200")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (let i = 0; i < 3; i++) {
        const element = data[i];
        $(".card-wrap").append(
          `<div class="card mb-3" style="width: 100%">
                <div class="card-body">
                  <h5 class="card-title">Taco Truck ${i + 1}</h5>
                  <h6>${element.address}</h6>
                  <h6>${element.city}, ${element.state} ${
            element.postal_code
          }</h6>
                  <h6 class="open">Open today until 9pm</h6>
                  <h6 class="phone">
                    <img src="./assets/images/phone-icon.png" />123-456-7890
                  </h6>
                  <div class="d-flex justify-content-between">
                    <button href="#" class="btn btn-secondary directions" style="width: 47%" data-lat=${
                      element.latitude
                    } data-lon=${element.longitude}
                      >Directions</button
                    >
                    <button class="btn btn-secondary" style="width: 47%" data-bs-toggle="modal" data-bs-target="#details"
                      >More Info</button
                    >
                  </div>
                </div>
              </div>`
        );
      }
    });

  // DEMO
  //   $(".map").attr(
  //     "src",
  //     `https://maps.googleapis.com/maps/api/staticmap?center=32.823943,-117.150259&zoom=13&scale=2&size=200x300&maptype=roadmap&format=png&visual_refresh=true&markers=size:small%7Ccolor:0xff0000%7Clabel:1%7C32.823943,-117.150259&key=${key}`
  //   );
});

function showMap(lat, lon) {
  map = new google.maps.Map(document.querySelector(".map"), {
    center: { lat: lat, lng: lon },
    zoom: 8,
  });
}

// Event Listener for Directions buttons, extracting lat/lon from data-attributes
$(".card-wrap").on("click", ".directions", function () {
  const lat = $(this).data("lat");
  const lon = $(this).data("lon");

  $(".map").attr(
    "src",
    `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=13&scale=2&size=320x400&maptype=roadmap&format=png&visual_refresh=true&markers=size:small%7Ccolor:0xff0000%7Clabel:1%7C32.823943,-117.150259&key=${key}`
  );
});
