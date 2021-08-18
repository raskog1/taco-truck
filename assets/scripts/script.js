$(document).ready(function () {
  //   $.ajax({
  //     method: "GET",
  //     url: "https://my.api.mockaroo.com/locations.json?key=a45f1200",
  //     dataType: "json",
  //   }).success(function (response) {
  //     // work with response data here
  //     console.log(response);
  //   });

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
                    <a href="#" class="btn btn-secondary" style="width: 47%"
                      >Directions</a
                    >
                    <a href="#" class="btn btn-secondary" style="width: 47%"
                      >More Info</a
                    >
                  </div>
                </div>
              </div>`
        );
      }
    });

  // DEMO
  $(".map").attr(
    "src",
    "https://maps.googleapis.com/maps/api/staticmap?center=32.823943,-117.150259&zoom=13&scale=2&size=200x300&maptype=roadmap&format=png&visual_refresh=true&markers=size:small%7Ccolor:0xff0000%7Clabel:1%7C32.823943,-117.150259"
  );
});
