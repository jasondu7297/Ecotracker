function initMap() {
    // map 
    var ottawa = new google.maps.LatLng(45.424721, -75.695000)

    var mapOptions = {
        zoom: 10, 
        center: ottawa
    }

    var map = new google.maps.Map(document.getElementById('map'),mapOptions)

    //directions Renderer
    var rendererOptions = {
        map: map
    }

    var directionsRenderer = new google.maps.DirectionsRenderer(rendererOptions)

    directionsRenderer.setMap(map);

    //directions Service
    var directionsService = new google.maps.DirectionsService();

    // autocomplete for origin
    var autoOptions = {
      componentRestrictions: {country: ['us', 'ca']},
      fields: ["formatted_address", "geometry", "name"],
      }

    autocompleteS = new google.maps.places.Autocomplete(
      document.getElementById('start'), autoOptions
      )

    autocompleteE = new google.maps.places.Autocomplete(
      document.getElementById('end'), autoOptions
      )

    const input = document.getElementById("start");
    const searchBox = new google.maps.places.SearchBox(input);
    
    //so that route is calculated when user changes origin/destination
    const onChangePathHandler = function () {
        calcRoute(directionsService, directionsRenderer)
    };

    //so that user can select alternate routes
    const onChangeRouteHandler = function () {
      alternateRoute(directionsService, directionsRenderer)
    };

    //so that user can select alternate car
    const onCarChange = function () {
      alternateCarorRoute(directionsService, directionsRenderer)
    };

    //listens for change in origin/destination
    autocompleteS.addListener('place_changed', onChangePathHandler)
    autocompleteE.addListener('place_changed', onChangePathHandler)
    document.getElementById('car_type').addEventListener("change", onCarChange)
    document.getElementById("routeOption").addEventListener("change", onCarChange);

        
}

// takes the user route and calculates the 2-3 best routes
function calcRoute(directionsService, directionsRenderer) {
  console.log('hi')

  var request = {
    origin: {
      query: document.getElementById('start').value,
    },
    destination: {
      query: document.getElementById('end').value,
    },
    travelMode: google.maps.TravelMode.DRIVING,
    provideRouteAlternatives: true
  }

  directionsService.route(request, function(response, status) {
      let emission = 0;
 
      if (status == 'OK'){
        // render map
        directionsRenderer.setDirections(response);
        console.log(response.routes[0].legs[0].distance.value);
        fetch('/cereal')
        .then(response =>
         response.json()
        )
        .then(data => {
          var target = document.getElementById('car_type').value;
          for (let i = 0; i < data.length; ++i) {
            if (data[i]["vehicle_type"] == target) {
              emission = data[i]["emission"];
              evImpact = Math.trunc(emission * response.routes[0].legs[0].distance.value / 1000000)
              evCoal = Math.trunc(evImpact * 1.12)
              evSmart = Math.trunc(evImpact * 122)
              evHome = evImpact * 0.00012
              console.log(evImpact) 
              document.getElementById('co2').innerHTML = 'Kilograms of CO2 released: ' + evImpact
              document.getElementById('coal').innerHTML = 'Pounds of coal: ' + evCoal
              document.getElementById('smartphones').innerHTML = 'Smartphones charged: ' + evSmart
              document.getElementById('home').innerHTML = "Home's energy use of one year: " + evHome.toFixed(4)
 
            }
          }
          console.log(emission);
        });
        
        if (response.routes.length > 2) {
          // if there is more than 1 alternate route, create new option
          var dropdown = document.getElementById("routeOption");
          var newRoute = document.createElement("option");
          var index = response.routes[response.routes.length - 1];
          newRoute.text = 'Route ' + response.routes.length
          newRoute.value = response.routes.length
          dropdown.add(newRoute);
        } 
      }

      else {
        alert('Request failed due to ' + status)
      }
  })
}


// takes the user route and calculates the 2-3 best routes
function alternateCarorRoute(directionsService, directionsRenderer) {
  console.log('car')

  var request = {
    origin: {
      query: document.getElementById('start').value,
    },
    destination: {
      query: document.getElementById('end').value,
    },
    travelMode: google.maps.TravelMode.DRIVING,
    provideRouteAlternatives: true
  }

  directionsService.route(request, function(response, status) {
      let emission = 0;
      var routenum = document.getElementById('routeOption').value - 1
      if (status == 'OK'){
        
        // render map
        directionsRenderer.setDirections(response);
        directionsRenderer.setRouteIndex(routenum);
        console.log(response.routes[routenum].legs[0].distance.value);
        
        console.log(response.routes[routenum].legs[0].distance.value);
        fetch('/cereal')
        .then(response =>
         response.json()
        )
        .then(data => {
          var target = document.getElementById('car_type').value;
          for (let i = 0; i < data.length; ++i) {
            if (data[i]["vehicle_type"] == target) {
              emission = data[i]["emission"];
              evImpact = Math.trunc(emission * response.routes[routenum].legs[0].distance.value / 1000000)
              evCoal = Math.trunc(evImpact * 1.12)
              evSmart = Math.trunc(evImpact * 122)
              evHome = evImpact * 0.00012
              console.log(evImpact) 
              document.getElementById('co2').innerHTML = 'Kilograms of CO2 released: ' + evImpact
              document.getElementById('coal').innerHTML = 'Pounds of coal: ' + evCoal
              document.getElementById('smartphones').innerHTML = 'Smartphones charged: ' + evSmart
              document.getElementById('home').innerHTML = "Home's energy use of one year: " + evHome.toFixed(4)
 
            }
          }
          console.log(emission);
        });
      }

      else {
        alert('Request failed due to ' + status)
      }
  })
}