
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

    //so that route is calculated when user changes origin/destination
    const onChangePathHandler = function () {
        calcRoute(directionsService, directionsRenderer)
    };

    //listens for change in origin/destination
    document.getElementById('origin').addEventListener('change', onChangePathHandler)
    document.getElementById('destination').addEventListener('change', onChangePathHandler)

}

// takes the user route and calculates the 2-3 best routes
function calcRoute(directionsService, directionsRenderer) {
  console.log('hi')

  var request = {
    origin: {
      query: document.getElementById('origin').value,
    },
    destination: {
      query: document.getElementById('destination').value,
    },
    travelMode: google.maps.TravelMode.DRIVING,
    provideRouteAlternatives: true
  }

  directionsService.route(request, function(response, status) {
    if (status == 'OK'){
      // render map
      directionsRenderer.setDirections(response);
    }

    else {
      alert('Request failed due to ' + status)
    }
  })
}