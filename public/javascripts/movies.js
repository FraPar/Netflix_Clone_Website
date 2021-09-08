// initializing the page with all content we need
$(function() {
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

        /* MAJ FILMS SELECTION  */
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

// initializing the gondola head space
var callBackInitializeSuccess = function(data) {
    let idFilm = data.results[0].id;
    initializingDescription = true;
    getFilmById(idFilm, initializingDescription)
    appendInDiv = '#gondola_head .film_card';
    dataToAppend = '<h1>' + data.results[0].title + '</h1>\
                    <div id="idFilm"> ' + data.results[0].id + ' </div>'
    $( appendInDiv ).append( dataToAppend )
    document.getElementById("gondola_head").setAttribute("style", 'background-image:url('+data.results[0].image_url+');\
                                                                   background-size: 20em 30em;\
                                                                   background-position: center;\
                                                                   background-position-x: 19%;\
                                                                   background-repeat: no-repeat;');

    thisIsTheDiv = "high_rated"
    loadSelection(data, thisIsTheDiv)
}

// write inside the popup
var callBackFilmId = function(data) {
    appendInDiv = '.film_details';
    $( appendInDiv ).empty();
    filmDescription = data.description
    dataToAppend = `<div class="popUp">
                    <img src="`+ data.image_url + `" alt="Image du film">
                    <h1>`+ data.title + `</h1>\
                    " "\
                    <p><strong>Genre complet du film :</strong> `+ data.genres + `</p>\
                    <p><strong>Date de sortie :</strong> `+ data.year + `</p>\
                    <p><strong>Rated :</strong> `+ data.rated + `</p>\
                    <p><strong>Score IMDB :</strong> `+ data.imdb_score + `</p>\
                    <p><strong>Réalisateur :</strong> `+ data.writers + `</p>\
                    <p><strong>Liste des acteurs :</strong> `+ data.actors + `</p>\
                    <p><strong>Durée :</strong> `+ data.duration + `</p>\
                    <p><strong>Pays d'origine :</strong> `+ data.countries + `</p>\
                    <p><strong>Résultat au Box Office :</strong> `+ data.reviews_from_critics + `</p>\
                    <p><strong>Résumé du film :</strong> `+ data.description + `</p>\
                    </div>`;
    $( appendInDiv ).append( dataToAppend )
}

// get highest rated films
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

// get the films by genre
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

// write the id of the film inside films cards
function getFilmById(idFilm, initializingDescription) {
    var url = "http://localhost:8000/api/v1/titles/" + idFilm;
    $.get(url, callBackFilmId).done(function(data) {
        //alert( "second success" )
        if (initializingDescription == true) {
            appendInDiv = '#gondola_head .film_card';
            dataToAppend = `<p><strong>Résumé du film :</strong> `+ data.long_description + `</p>\
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

// get the selection of films and load it on the page
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

// opening overlay module
function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

// closing overlay module
function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

// publishing the div used in other function
function getThisDiv(event) {
    let thisDiv = event.currentTarget.parentElement.parentElement.id
    thisIsTheDiv = thisDiv
}

// function being able to load next or previous selection of films
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

    // permit to know if we have the special case of 1st throw of film in high rated without de gondola head
    if (data.previous === null && thisIsTheDiv == "high_rated") {
        i = 1
    } else {
        i = 0
    }

    // loading all 4 cards containing films
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