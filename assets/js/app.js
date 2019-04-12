

function renderPage() {
    $("#search-div").hide();
    $("#quiz-rando-buttons").hide();
    $("#quiz-body").hide();
    $("#random-btn-body").hide();
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
})