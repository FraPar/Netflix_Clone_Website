var callBackGetSuccess = function(data) {
    console.log("Donnée api", data)
    console.log("Genre du film : " + data.results[0].genres)
    console.log("Genre du film : " + data.results[1].genres)
    console.log("Genre du film : " + data.results[2].genres)
    console.log("Genre du film : " + data.results[3].genres)
    console.log("Genre du film : " + data.results[4].genres)
    //alert("Meteo temp : " + data.results)

}


function buttonClickGet() {
    var url = `http://localhost:8000/api/v1/titles/`

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