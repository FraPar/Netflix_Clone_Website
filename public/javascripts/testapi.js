$(function() {

    var nbDiv = $(".high_rated .card_list .film_card").length;
    console.log(nbDiv)
    getMostRated();
    var filmGenre = "comedy";
    getByGenre(filmGenre);
    // while (nbDiv < 10 || rating != 9) {
        // getMostRated(rating)
        // rating -= 0.1
        // console.log(rating)
    // }

    // var nbDiv = $(".high_rated .card_list .film_card").length;
    // console.log(nbDiv)
    // $( appendInDiv ).append( dataToAppend )
    console.log("En dessous")

    console.log("C'est bon")

});

var callBackInitializeSuccess = function(data) {
    appendInDiv = '.high_rated .card_list';
    dataToAppend = '<i class="fas fa-arrow-left"></i>'
    $( appendInDiv ).append( dataToAppend )

    
    console.log(" ");
    console.log("Donnée api", data)
    console.log("Count", data.count)
    console.log(" ");
    for (i = 0; i < 5; i++) {
        console.log("Id du film : " + data.results[i].id);
        console.log("Titre du film : " + data.results[i].title);
        console.log("Genre du film : " + data.results[i].genres);
        console.log("Image Url : " + data.results[i].image_url);
        console.log("URL : " + data.results[i].url);
        dataToAppend = '<div class="film_card"><a href="' + data.results[i].url + '"><img src=' + data.results[i].image_url + ' alt="Image du film"></a></div>';
        $( appendInDiv ).append( dataToAppend )
        console.log(" ");
    }
    dataToAppend = '<i class="fas fa-arrow-right"></i>'
    $( appendInDiv ).append( dataToAppend )
}


var callBackCategory = function(data) {
    appendInDiv = '#category_1 .card_list';
    dataToAppend = '<i class="fas fa-arrow-left"></i>'
    $( appendInDiv ).append( dataToAppend )

    
    console.log(" ");
    console.log("Donnée api", data)
    console.log("Count", data.count)
    console.log(" ");
    for (i = 0; i < 5; i++) {
        console.log("Id du film : " + data.results[i].id);
        console.log("Titre du film : " + data.results[i].title);
        console.log("Genre du film : " + data.results[i].genres);
        console.log("Image Url : " + data.results[i].image_url);
        console.log("URL : " + data.results[i].url);
        dataToAppend = '<div class="film_card"><a href="' + data.results[i].url + '"><img src=' + data.results[i].image_url + ' alt="Image du film"></a></div>';
        $( appendInDiv ).append( dataToAppend )
        console.log(" ");
    }
    dataToAppend = '<i class="fas fa-arrow-right"></i>'
    $( appendInDiv ).append( dataToAppend )
}


var callBackGetSuccess = function(data) {
    console.log("Donnée api", data)
    // console.log("Genre du film : " + data.results[0].name)
    // console.log("Genre du film : " + data.results[1].name)
    // console.log("Genre du film : " + data.results[2].name)
    // console.log("Genre du film : " + data.results[3].name)
    // console.log("Genre du film : " + data.results[4].name)

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


function getMostRated() {
    var url = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score"
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

function getByGenre(filmGenre) {
    var url = "http://localhost:8000/api/v1/titles/?genre_contains=" + filmGenre;
    console.log(url)
    $.get(url, callBackCategory).done(function() {
        //alert( "second success" )
     })
     .fail(function() {
         alert( "error" );
     })
     .always(function() {
         //alert( "finished" )
     });

}