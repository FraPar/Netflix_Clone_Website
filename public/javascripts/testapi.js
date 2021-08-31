$(function() {
    appendInDiv = '.high_rated .card_list';
    dataToAppend = '<i class="fas fa-arrow-left"></i>'
    $( appendInDiv ).append( dataToAppend )
    dataToAppend = '<div class="film_card"><p>IMAGE</p></div>';

    var rating = 9.4
    getMostRated(rating)



    // var nbDiv = $(".high_rated .card_list .film_card").length;
    // console.log(nbDiv)
    // $( appendInDiv ).append( dataToAppend )
    console.log("En dessous")

    console.log("C'est bon")

});

var callBackInitializeSuccess = function(data) {
    console.log(" ");
    console.log("Donnée api", data)
    console.log("Count", data.count)
    console.log(" ");
    for (i = 0; i < data.count; i++) {
        console.log("Id du film : " + data.results[i].id);
        console.log("Titre du film : " + data.results[i].title);
        console.log("Genre du film : " + data.results[i].genres);
        console.log(" ");
    }
}


var callBackGetSuccess = function(data) {
    console.log("Donnée api", data)
    console.log("Genre du film : " + data.results[0].name)
    console.log("Genre du film : " + data.results[1].name)
    console.log("Genre du film : " + data.results[2].name)
    console.log("Genre du film : " + data.results[3].name)
    console.log("Genre du film : " + data.results[4].name)

    var element = document.getElementById("resultat_api")
    element.innerHTML = "Le genre du film est " + data.results[0].name;
    //alert("Meteo temp : " + data.results)

}


function buttonClickGet() {
    var url = `http://localhost:8000/api/v1/genres/`

    $.get(url, callBackGetSuccess).done(function() {
        //alert( "second success" )
    })
     .fail(function() {
         alert( "error" );
     })
     .always(function() {
         //alert( "finished" )
     });

}


function getMostRated(getRating) {
    var url = "http://localhost:8000/api/v1/titles/?imdb_score="+getRating
    console.log(url)
    $.get(url, callBackInitializeSuccess).done(function() {
        //alert( "second success" )
    })
     .fail(function() {
         alert( "error" );
     })
     .always(function() {
         //alert( "finished" )
     });

}