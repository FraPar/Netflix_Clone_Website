$( () => {
    let search = $('#search')
    let sendLike = $('#likeButton')
    let sendComment = $('#commentButton')
    let commentValue = $('#locationComment')
    let validatePost = $('.validationButton')

    // fonction appelée au début et apres le search
    // recupere tableau de classe (get element by className)
    // forEach sur élément récupéré
    // pour chacun, appel ajax avec ID élément courant (pour nb like et commentaire en '.length')

    //Permet la recherche d'un nouveau film de la catégorie
    validatePost.each(function() {
        var card = this;
        card.addEventListener('click', function() {
            $.ajax({
                url:`http://localhost:8000/api/v1/titles/`,
                method: 'GET',
                success: function(response, status, status_msg) {
                    console.log(response.message);
                },
                error: function(err, error_msg, error_status) {
                    console.log(err);
                }
            })
        })
    })