$(function() {
    var nbDiv = $(".high_rated .card_list .film_card").length;
    console.log(nbDiv)
    console.log(thisIsTheDiv)
    getMostRatedFilms();

    for (category = 1; category <= 3; category++) {
        if (category == 1) {
            filmGenre = "action";
        } else if (category == 2) {
            filmGenre = "comedy";
        } else {
            filmGenre = "adventure";
        }
        thisIsTheDiv = "category_"+category;
        getByGenre(filmGenre, thisIsTheDiv);
    }

});

$(document).ready(function() {

        /* OVERLAY MODULE */
    const closeModalButtons = document.querySelectorAll('[data-close-button]')
    const overlay = document.getElementById('overlay')
    
    overlay.addEventListener('click', () => {
            const modals = document.querySelectorAll('.modal.active')
            modals.forEach(modal => {
                closeModal(modal)
            })
    })

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        })
    })

        /* FILM DETAIL MODULE */
    $("body").on('click', ".film_card", function(event) {
        let idFilm = event.currentTarget.querySelector("div").innerText
        const modal = document.querySelector('.modal');
        initializingDescription = false;
        getFilmById(idFilm, initializingDescription)
        openModal(modal)
    });

        /* MAJ SELECTION DE FILMS */
    $("body").on('click', ".fa-arrow-right, .fa-arrow-left", function(event) {
        let urlPage = event.currentTarget.querySelector("div").innerText
        //let thisDiv = event.currentTarget.parentElement.parentElement.id
        getThisDiv(event)
        getSelection(urlPage)
    });

});

var filmGenre = "";
var thisIsTheDiv = "";
var filmDescription = "";

var callBackPreviousPage = function(data) {
    appendInDiv = '#category_1 .card_list';
    $( appendInDiv ).empty();
    if (data.previous != null) {
        dataToAppend = '<i class="fas fa-arrow-left"><div class="previous_page">\
        <p>'+ data.previous +'</p></div></i></p>'
        $( appendInDiv ).append( dataToAppend )
    }

    for (i = 0; i < 5; i++) {
        dataToAppend = '<div class="film_card">\
                        <img src=' + data.results[i].image_url + ' alt="Image du film">\
                        <div id="idFilm"> ' + data.results[i].id + ' </div>\
                        </div>';
        $( appendInDiv ).append( dataToAppend )
    }
    dataToAppend = '<i class="fas fa-arrow-right"><div class="next_page">\
                    <p>'+ data.next +'</p></div></i></p>'

    $( appendInDiv ).append( dataToAppend )
}

var callBackInitializeSuccess = function(data) {
    console.log("data callBackInitializeSuccess")
    console.log(data)
    let idFilm = data.results[0].id;
    console.log("idFilm callBackInitializeSuccess")
    console.log(idFilm)
    initializingDescription = true;
    console.log(initializingDescription)
    getFilmById(idFilm, initializingDescription)
    console.log("filmDescription callBackInitializeSuccess")
    console.log(filmDescription)
    appendInDiv = '#gondola_head .film_card';
    dataToAppend = '<h1>' + data.results[0].title + '</h1>\
                    <i class="fas fa-play-circle"></i>\
                    <p></p>\
                    <div id="idFilm"> ' + data.results[0].id + ' </div>'
    $( appendInDiv ).append( dataToAppend )
    document.getElementById("gondola_head").setAttribute("style", 'background-image:url('+data.results[0].image_url+');\
                                                                   background-size: 20em 30em;\
                                                                   background-position: center;\
                                                                   background-position-x: 19%;\
                                                                   background-repeat: no-repeat');

    //document.getElementById("gondola_head").style.background-image = "url(data.results[0].image_url);
    /*background-image:url(images/image_de_fond.png);*/
    thisIsTheDiv = "high_rated"
    loadSelection(data, thisIsTheDiv)
}

var callBackFilmId = function(data) {
    appendInDiv = '.film_details';
    $( appendInDiv ).empty();
    filmDescription = data.description
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
    console.log("filmDescription callBackFilmId")
    console.log(filmDescription)
}

function getMostRatedFilms() {
    var url = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score"
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

function getByGenre(filmGenre, thisIsTheDiv) {
    var url = "http://localhost:8000/api/v1/titles/?genre_contains=" + filmGenre;
    $.get(url).done(function(data) {
        //alert( "second success" )
        loadSelection(data, thisIsTheDiv)
     })
     .fail(function() {
         alert( "error" );
     })
     .always(function() {
         //alert( "finished" )
     });
}

function getFilmById(idFilm, initializingDescription) {
    var url = "http://localhost:8000/api/v1/titles/" + idFilm;
    $.get(url, callBackFilmId).done(function(data) {
        //alert( "second success" )
        if (initializingDescription == true) {
            console.log("Ca viens de début")
            appendInDiv = '#gondola_head .film_card';
            dataToAppend = `<p>Résumé du film : `+ data.long_description + `</p>\
                            </div>`;
            $( appendInDiv ).append( dataToAppend )
        }
     })
     .fail(function() {
         alert( "error" );
     })
     .always(function() {
         //alert( "finished" )
     });

}

function getSelection(urlPage) {
    var url = urlPage;
    $.get(url).done(function(data) {
        //alert( "second success" )
        loadSelection(data, thisIsTheDiv)
     })
     .fail(function() {
         alert( "error" );
     })
     .always(function() {
         //alert( "finished" )
     }); 
}

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

function getThisDiv(event) {
    let thisDiv = event.currentTarget.parentElement.parentElement.id
    thisIsTheDiv = thisDiv
}

function loadSelection(data, thisIsTheDiv) {
    appendInDiv = '#'+ thisIsTheDiv +' .card_list';
    $( appendInDiv ).empty();
    if (data.previous != null) {
        dataToAppend = '<i class="fas fa-arrow-left"><div class="previous_page">\
        <p>'+ data.previous +'</p></div></i>'
        $( appendInDiv ).append( dataToAppend )
    } else {
        dataToAppend = '<i class="fas fa-arrow-circle-left"><div class="previous_page">\
        <p>'+ data.previous +'</p></div></i>'
        $( appendInDiv ).append( dataToAppend )
        
    }

    if (data.previous === null && thisIsTheDiv == "high_rated") {
        i = 1
    } else {
        i = 0
    }

    for (i;  i < 5; i++) {
        dataToAppend = '<div class="film_card">\
                        <img src=' + data.results[i].image_url + ' alt="Image du film">\
                        <div id="idFilm"> ' + data.results[i].id + ' </div>\
                        </div>';
        $( appendInDiv ).append( dataToAppend )
    }
    dataToAppend = '<i class="fas fa-arrow-right"><div class="next_page">\
                    <p>'+ data.next +'</p></div></i></p>'

    $( appendInDiv ).append( dataToAppend )
}