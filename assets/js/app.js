var foodType;
var foodLocation;

function renderPage() {
    $("#search-div").hide();
    $("#quiz-rando-buttons").hide();
    $("#quiz-body").hide();
    $("#random-btn-body").hide();
    $("#search-results").hide();
}



renderPage();

$("#search-button").on("click", function() {
    $("#start-buttons").hide();
    $("#search-div").show();
});

$("#quiz-random").on("click", function() {
    $("#start-buttons").hide();
    $("#quiz-rando-buttons").show();
});

$("#quiz-button").on("click", function() {
    $("#quiz-rando-buttons").hide();
    $("#quiz-body").show();
});

$("#random-button-go").on("click", function() {
    $("#quiz-rando-buttons").hide();
    $("#random-btn-body").show();
});

function mapAPI(userLat, userLon){
    　　　　　　　'use strict';
    　　　　　　　　var map;
        var service;
        var infowindow;
        var pyrmont = new google.maps.LatLng( userLat, userLon);
        // -84.37362670898438,33.81321311652279
        createMap(pyrmont)
 
 
         
         //document.getElementById('getcurrentlocation').onclick = function() {
          //geoLocationInit();
        //}
 
        function geoLocationInit() {
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(success, fail);
 
            } else {
              createMap(pyrmont);
          }
        }
 
       // success
       function success(position) {
         var currentLat = position.coords.latitude;
         var currentLng = position.coords.longitude;
 
         var pyrmont = new google.maps.LatLng(currentLat,currentLng);
 
         createMap(pyrmont)
 
         CurrentPositionMarker(pyrmont);
       }
 
        // fail
        function fail(pyrmont) {
          createMap(pyrmont);
        }
 
        function createMap(pyrmont) {
 
          map = new google.maps.Map(document.getElementById('map'), {
            center: pyrmont,
            zoom: 15
          });
          nearbysearch(pyrmont)
        }
 
        function createMarker(latlng, icn, place)
        {
          var marker = new google.maps.Marker({
            position: latlng,
            map: map
          });
 
          var placename = place.name;
    　　　　　　　　　　// 吹き出しにカフェの名前を埋め込む          
          var contentString = `<div class="sample"><p id="place_name">${placename}</p></div>`;
 
         // 吹き出し
          var infoWindow = new google.maps.InfoWindow({ // 吹き出しの追加
              content:  contentString// 吹き出しに表示する内容
            });
 
 
            marker.addListener('click', function() { // マーカーをクリックしたとき
                infoWindow.open(map, marker); // 吹き出しの表示
            });
 
          }
 
        // 現在地のアイコンを表示
        function CurrentPositionMarker(pyrmont) {
            var image = 'http://i.stack.imgur.com/orZ4x.png'
 
            var marker = new google.maps.Marker({
                    position: pyrmont,
                    map: map,
                    icon: image
                });
            marker.setMap(map);
        }
 
        
        function nearbysearch(pyrmont) {
            var request = {
              location: pyrmont,
              radius: '1000',
              //type: [food]
            };
 
            service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, callback);
 
            function callback(results, status) {
 
              console.log(results);
 
             if (status == google.maps.places.PlacesServiceStatus.OK) {
        　　　　　　　　//取得したカフェ情報をそれぞれcreateMarkerに入れて、マーカーを作成
                for (var i = 0; i < 2; i++) {
                  var place = results[i];
                  //console.log(place)
                  var latlng = place.geometry.location;
                  var icn = place.icon;
 
                  createMarker(latlng, icn, place);
                }
              }
            }
        }
    };

function yelpAjax(foodType, foodLocation) {

let myUrl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=by-${foodType}&location=${foodLocation}`;

$.ajax({
   url: myUrl,
   method: "GET",
   headers: {
        'Authorization':'Bearer _MCNjLezZ4Hb6LcVdSIrVW-Ju4K5g5jTvcIdHxorIdp4QmGhFAOxqCWnw8HabL_FWhcNRsKJK0E6oimVhtLaQzvAmCJrIOAkSrIa3WlYYVrDnm2u1V-sVjoD99uvXHYx',}
})
.then(function(response) {

   var results = response;
 
    console.log(response);
    

   for (var i = 0; i < results.businesses.length; i++) {
    var businessName = results.businesses[i].name;
    var businessLocation = results.businesses[i].location.display_address;
    var businessRating = results.businesses[i].rating;

    //console.log(businessName);
    //console.log(businessLocation);

    var resultText = $("<div>");
    resultText.html("<h6>" + businessName + ", " + businessLocation + " Rating: " + businessRating + "/5 </h6> <br>");
    resultText.attr("data-lat", results.businesses[i].coordinates.latitude);
    resultText.attr("data-lon", results.businesses[i].coordinates.longitude);
    resultText.attr("data-name", results.businesses[i].name);
    resultText.attr("data-location", results.businesses[i].location.display_address);
    resultText.attr("data-rating", results.businesses[i].rating);
    resultText.attr("data-phone", results.businesses[i].display_phone);
    resultText.attr("data-price", results.businesses[i].price);
    resultText.attr("data-img", `<img src='${results.businesses[i].image_url}' alt='Yelp Restaurant'></img>`);

    $("#search-results-div").append(resultText);

    $(resultText).on("click", function() {
        console.log($(this)[0].innerText);
       // console.log($(this).attr("data-lat"));
       // console.log($(this).attr("data-lon"));

        var userLat = $(this).attr("data-lat");
        var userLon = $(this).attr("data-lon");
        var userBusiness = $(this).attr("data-name");
        var userLoc = $(this).attr("data-location");
        var userRating = $(this).attr("data-rating")
        var userPhone = $(this).attr("data-phone")
        var resultImg = $(this).attr("data-img");
        var userPrice = $(this).attr("data-price");

        //console.log(resultImg);
        

        //console.log(userLat);
        //console.log(userLon);

        $("#search-results-div").empty();
        $("#search-results").hide();

        $("#final-result").append("<h3 class='text-center'>" + userBusiness + "<br>" + userLoc + "<br>" + userRating + "/5 <br>" + userPhone + "<br>" + userPrice + "<br>" + resultImg);

        mapAPI(userLat, userLon);
    })

   }
})

};


$("#food-search-btn").on("click", function() {
    event.preventDefault();

    $("#search-div").hide();
    $("#search-results").show();

        foodType = $("#food-type").val().trim();
        //foodType=["mexican","italian"]
        foodLocation = $("#food-location").val().trim();

    yelpAjax(foodType, foodLocation);




});


