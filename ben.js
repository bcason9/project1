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
 
    //console.log(response);
    

   for (var i = 0; i < results.businesses.length; i++) {
    var businessName = results.businesses[i].name;
    var businessLocation = results.businesses[i].location.display_address;
    var businessRating = results.businesses[i].rating;

    //console.log(businessName);
    //console.log(businessLocation);

    var resultText = $("<div>");
    resultText.html(businessName + ", " + businessLocation + " Rating: " + businessRating + "/5 <br>");
    resultText.attr("data-lat", results.businesses[i].coordinates.latitude)
    resultText.attr("data-lon", results.businesses[i].coordinates.longitude)

    $("#search-results-div").append(resultText);

    $(resultText).on("click", function() {
        console.log($(this)[0].innerText);
        console.log($(this).attr("data-lat"));
        console.log($(this).attr("data-lon"));
    })

   }
})

};


$("#food-search-btn").on("click", function() {
    event.preventDefault();

    $("#search-div").hide();
    $("#search-results").show();

        foodType = $("#food-type").val().trim();
        foodLocation = $("#food-location").val().trim();

    yelpAjax(foodType, foodLocation);




});
