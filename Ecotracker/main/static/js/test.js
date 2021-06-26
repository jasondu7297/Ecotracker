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
      componentRestrictions: {country: 'us'},
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

    //listens for change in origin/destination
    document.getElementById('origin').addEventListener('change', onChangePathHandler)
    document.getElementById('destination').addEventListener('change', onChangePathHandler)
    autocompleteS.addListener('place_changed', onChangePathHandler)
    autocompleteE.addListener('place_changed', onChangePathHandler)

      //so that user can select alternate routes
    const onChangeRouteHandler = function () {
        alternateRoute(directionsService, directionsRenderer);
    };
        document.getElementById("routeOption").addEventListener("change", onChangeRouteHandler);
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
      if (status == 'OK'){
        // render map
        directionsRenderer.setDirections(response);
        console.log(response.routes[0].legs[0].distance.value);
        
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

// when user changes route
function alternateRoute (directionsService, directionsRenderer) {
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

  directionsService.route(request, function(response, status){
    if (status == 'OK'){
      // sets route based off of route selected from dropdown
      var routenum = document.getElementById('routeOption').value - 1
      directionsRenderer.setDirections(response);
      directionsRenderer.setRouteIndex(routenum);
      console.log(response.routes[routenum].legs[0].distance.value);
      
    }

  })
}