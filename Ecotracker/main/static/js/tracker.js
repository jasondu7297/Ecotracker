// Create the script tags, set the appropriate attributes

// js and directionsS
var script = document.createElement('script');
script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDk0KjJLF2X4ng7kEbBB7YxtZFbNy8kz-k&callback=initMap&libraries=&v=weekly";
// callback means it is going to try to load the specified function 

script.async = true;

// Append the 'script' element to 'head'
document.head.appendChild(script);

// places
// var script = document.createElement('script');
// script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAzI-JBDF-ZvAHmSrGCPmvcomdxfq--TBQ&libraries=places";

// script.async = true;

// // Append the 'script' element to 'head'
// document.head.appendChild(script);

function initMap() {

    //map 
    // var ottawa = new google.maps.LatLng(45.424721, -75.695000)

    // var mapOptions = {
    //     zoom: 10, 
    //     center: ottawa
    // }

    var map = new google.maps.Map(document.getElementById('map'))

    //directions Renderer
    var rendererOptions = {
        map: map
    }

    var directionsRenderer = new google.maps.DirectionsRenderer(rendererOptions)

    directionsRenderer.setMap(map);

    //directions Service
    var directionsService = new google.maps.DirectionsService();

    // autocomplete for origin
    // var autoOptions = {
    //       componentRestrictions: {country: 'us'},
    //       fields: ["formatted_address", "geometry", "name"],
    // }
    
  
    // var autocompleteO = new google.maps.places.Autocomplete(document.getElementById('origin'), autoOptions)

    // autocompleteO.addListener('place_changed', onPlaceChanged)

    // var autocompleteD = new google.maps.places.Autocomplete(document.getElementById('destination'), autoOptions)

    // autocompleteD.addListener('place_changed', onPlaceChanged)

    // function onPlaceChanged() {
    //     var place = autocomplete.getPlace();
        
    //     // tests whether user selected a prediction or entered text that didnt result in a prediction 
    //     if (!place.geometery) {
    //         document.getElementById('origin').placeholder = 
    //         'Please enter a starting point' ;
    //     }
    //     // if valid place
    //     else { 
    //         document.getElementById('destination').innerHTML = place.name;
    //     }
    // }

    //so that route is calculated when user changes origin/destination
    const onChangePathHandler = function () {
        calcRoute(directionsRenderer, directionsService)
    };

    //listens for change in origin/destination
    document.getElementById('origin').addEventListener('change', onChangePathHandler)
    document.getElementById('destination').addEventListener('change', onChangePathHandler)

    //so that user can select alternate routes
    // const onChangeRouteHandler = function () {
    //     alternateRoute(directionsService, directionsRenderer);
    // };
    //     document.getElementById("routeOption").addEventListener("change", onChangeRouteHandler);

}

// takes the user route and calculates the 2-3 best routes
function calcRoute (directionsService, directionsRenderer) {

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
  
        if (response.routes.length > 2) {
          // if there is more than 1 alternate route, create new option in dropdown
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
        query: document.getElementById('origin').value,
      },
      destination: {
        query: document.getElementById('destination').value,
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
        
      }
  
    })
  }