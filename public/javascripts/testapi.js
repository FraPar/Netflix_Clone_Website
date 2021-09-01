$(function() {
    var nbDiv = $(".high_rated .card_list .film_card").length;
    console.log(nbDiv)
    getMostRated();
    var filmGenre = "action";
    getByGenre1(filmGenre);
    var filmGenre = "comedy";
    getByGenre2(filmGenre);
    var filmGenre = "adventure";
    getByGenre3(filmGenre);

});

$(document).ready(function() {
    //$('.card_list').click(function() {
        //idFilm = document.getElementById("idFilm").innerText
    //$('.film_card').click(function(event) {
    $("body").on('click', ".film_card", function(event) {
    //$('.film_card').on('click', function(event) {
        console.log(event)
        console.log(event.currentTarget)
        //let idFilm = event.currentTarget.querySelector("div").innerText
        let idFilm = event.currentTarget.querySelector("div").innerText
        //let idFilm = event.target.innerText
        //alert(idFilm);
        getFilmById(idFilm)
    });
});

var callBackFilmId = function(data) {
    console.log(data)
    appendInDiv = '.film_details';
    $( appendInDiv ).empty();
    dataToAppend = `<div class="popUp">
                    <img src="`+ data.image_url + `" alt="Image du film">
                    <h1>Titre du film : `+ data.title + `</h1>\
                    <h2>Genre complet du film : `+ data.genres + `</h2>\
                    <h2>Date de sortie : `+ data.year + `</h2>\
                    <h2>Rated : `+ data.rated + `</h2>\
                    <h2>Score IMDB : `+ data.imdb_score + `</h2>\
                    <h2>Réalisateur : `+ data.writers + `</h2>\
                    <h2>Liste des acteurs : `+ data.actors + `</h2>\
                    <h2>Durée : `+ data.duration + `</h2>\
                    <h2>Pays d'origine : `+ data.countries + `</h2>\
                    <h2>Résultat au Box Office : `+ data.reviews_from_critics + `</h2>\
                    <p>Résumé du film : `+ data.description + `</p>\
                    </div>`;
    $( appendInDiv ).append( dataToAppend )
}




var callBackInitializeSuccess = function(data) {
    appendInDiv = '#gondola_head .film_card';
    dataToAppend = '<h1>' + data.results[0].title + '</h1>\
                    <i class="fas fa-play-circle"></i>\
                    <p>' + data.results[0].title + ' : Description à venir!</p>\
                    <img src="' + data.results[0].image_url + '" alt="Image de la vidéo">\
                    <div id="idFilm"> ' + data.results[0].id + ' </div>'
    $( appendInDiv ).append( dataToAppend )
    
    appendInDiv = '.high_rated .card_list';
    dataToAppend = '<i class="fas fa-arrow-left"></i>'
    $( appendInDiv ).append( dataToAppend )

    
    console.log(" ");
    console.log("Donnée api", data)
    console.log(" ");
    for (i = 1; i < 5; i++) {
        dataToAppend = '<div class="film_card">\
                        <img src=' + data.results[i].image_url + ' alt="Image du film">\
                        <div id="idFilm"> ' + data.results[i].id + ' </div>\
                        </div>';
        $( appendInDiv ).append( dataToAppend )
    }
    dataToAppend = '<i class="fas fa-arrow-right"></i>'
    $( appendInDiv ).append( dataToAppend )
}


var callBackCategory1 = function(data) {
    appendInDiv = '#category_1 .card_list';
    dataToAppend = '<i class="fas fa-arrow-left"></i>'
    $( appendInDiv ).append( dataToAppend )

    console.log("Donnée api", data)
    for (i = 0; i < 5; i++) {
        dataToAppend = '<div class="film_card">\
                        <img src=' + data.results[i].image_url + ' alt="Image du film">\
                        <div id="idFilm"> ' + data.results[i].id + ' </div>\
                        </div>';
        $( appendInDiv ).append( dataToAppend )
    }
    dataToAppend = '<i class="fas fa-arrow-right"></i>'
    $( appendInDiv ).append( dataToAppend )
}

var callBackCategory2 = function(data) {
    appendInDiv = '#category_2 .card_list';
    dataToAppend = '<i class="fas fa-arrow-left"></i>'
    $( appendInDiv ).append( dataToAppend )

    
    console.log(" ");
    console.log("Donnée api", data)
    console.log(" ");
    for (i = 0; i < 5; i++) {
        dataToAppend = '<div class="film_card">\
                        <img src=' + data.results[i].image_url + ' alt="Image du film">\
                        <div id="idFilm"> ' + data.results[i].id + ' </div>\
                        </div>';
        $( appendInDiv ).append( dataToAppend )
    }
    dataToAppend = '<i class="fas fa-arrow-right"></i>'
    $( appendInDiv ).append( dataToAppend )
}

var callBackCategory3 = function(data) {
    appendInDiv = '#category_3 .card_list';
    dataToAppend = '<i class="fas fa-arrow-left"></i>'
    $( appendInDiv ).append( dataToAppend )

    
    console.log(" ");
    console.log("Donnée api", data)
    console.log(" ");
    for (i = 0; i < 5; i++) {
        dataToAppend = '<div class="film_card">\
                        <img src=' + data.results[i].image_url + ' alt="Image du film">\
                        <div id="idFilm"> ' + data.results[i].id + ' </div>\
                        </div>';
        $( appendInDiv ).append( dataToAppend )
    }
    dataToAppend = '<i class="fas fa-arrow-right"></i>'
    $( appendInDiv ).append( dataToAppend )
}

var callBackGetSuccess = function(data) {
    console.log("Donnée api", data)

    var element = document.getElementById("resultat_api")
    element.innerHTML = "Le genre du film est " + data.results[0].name;

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


function buttonClickGetFilmId() {
    var url = `http://localhost:8000/api/v1/title/`

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

function getByGenre1(filmGenre) {
    var url = "http://localhost:8000/api/v1/titles/?genre_contains=" + filmGenre;
    console.log(url)
    $.get(url, callBackCategory1).done(function() {
        //alert( "second success" )
     })
     .fail(function() {
         alert( "error" );
     })
     .always(function() {
         //alert( "finished" )
     });

}

function getByGenre2(filmGenre) {
    var url = "http://localhost:8000/api/v1/titles/?genre_contains=" + filmGenre;
    console.log(url)
    $.get(url, callBackCategory2).done(function() {
        //alert( "second success" )
     })
     .fail(function() {
         alert( "error" );
     })
     .always(function() {
         //alert( "finished" )
     });

}

function getByGenre3(filmGenre) {
    var url = "http://localhost:8000/api/v1/titles/?genre_contains=" + filmGenre;
    console.log(url)
    $.get(url, callBackCategory3).done(function() {
        //alert( "second success" )
     })
     .fail(function() {
         alert( "error" );
     })
     .always(function() {
         //alert( "finished" )
     });

}

function getFilmById(idFilm) {
    var url = "http://localhost:8000/api/v1/titles/" + idFilm;
    console.log(url)
    $.get(url, callBackFilmId).done(function() {
        //alert( "second success" )
     })
     .fail(function() {
         alert( "error" );
     })
     .always(function() {
         //alert( "finished" )
     });

}