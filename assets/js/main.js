$(document).ready(function () {
    
    // Annimation du titre "Mes Qualités"
    $('.qv_container_qualities').css('display', 'none');
    $(window).scroll(function (event) {
        var scroll = $(window).scrollTop();
        if (scroll > 170) {
            $('.qv_container_qualities').css('display', 'block');
            $('.qv_container_qualities').addClass('text-focus-in')
        }
    });



    // Gestion de la hauteur des card pour l'experience
        let height = 0;
        $('.qv_experience_item').each(function () {
            if (height < this.clientHeight) {
                height = this.clientHeight;
            }
        })

        $('.qv_experience_item').each(function () {
            $(this).height(height);
        })


    // Gestion du click sur les fleches experiences
        $('.arrow_right').click(function () { 
            move('right');
        })

        $('.arrow_left').click(function () { 
            move('left');
        })

        let posLeft = 0;
            
        // Récupération de la largeur d'un item
        let pas = $('.container_items').width();

        // Définition de la 
        let maxWidth = ($('.experience_item').length * pas - pas)*-1 

        let compteur = 0
        function move(direction, computer = true, moveTo = null) {
            // Récupération de la position left des items
            // let width = $('.experience_item').position().left;

            // Définition de la position Left à donner.
            switch (direction) {
                case 'left':
                    posLeft = posLeft + pas;
                    --compteur;
                    break;
                case 'right':
                    posLeft = posLeft - pas 
                    ++compteur;
                    break;
            }

            
            // Gestion de la position left au moment du click sur les boutons
            if (moveTo !== null) {
                posLeft = pas * moveTo * -1;
                compteur = moveTo
            }

            let newWidth = posLeft + "px";
            $('.experience_item').css("left", newWidth);

            if (posLeft == 0 && computer == true) {
                $('.arrow_left').css('display', 'none')
            } else if(computer == true) {
                console.log("test1");
                $('.arrow_left').css('display', 'inherit')
            } else {
                console.log("test2");
                $('.arrow_left').css('display', 'none')
            }
            if (posLeft == maxWidth && computer == true) {
                $('.arrow_right').css('display', 'none')
            } else if(computer == true) {
                $('.arrow_right').css('display', 'inherit')
            } else {
                $('.arrow_right').css('display', 'none')
            }


            $('.qv_bouton_panel').removeClass('qv_bouton_active');
            // $('.panel_'+compteur).toggleClass('qv_bouton_active');
            console.log("object")
        }

        let sliderContainer = document.querySelector('.container_experience');
        let posDown = 0;
        let posUp = 0;

        sliderContainer.addEventListener('touchstart',function(event){
            posDown = event.changedTouches[0].pageX;
        });

        sliderContainer.addEventListener('touchend',function(event){
            posUp = event.changedTouches[0].pageX;
            if (posDown > posUp && (posDown - posUp) > 40 && posLeft !== maxWidth) {
                move('right', false);
                $('.arrow_left').css('display', 'none')
                $('.arrow_right').css('display', 'none')
            } else if(posDown < posUp && (posUp - posDown) > 40 && posLeft !== 0) {
                move('left', false);
                $('.arrow_left').css('display', 'none')
                $('.arrow_right').css('display', 'none')
            }
        });

    $('.experience_item').each(function (indexInArray) {
        let bouton = $('<div class="qv_bouton_panel panel_'+ indexInArray +'"></div>');
        $('.qv_navigation_panel').append(bouton);
    })

    $('.qv_bouton_panel').each(function (indexInArray) {
        $(this).click(function () {
            if ($(window).width() < 768) {
                console.log( "condition 1" + $(window).width());
                move('right', false, indexInArray);
            } else {
                console.log( "condition 2" + $(window).width());
                move('right', true, indexInArray);
            }
            // $(selector).toggleClass(className);
            $('.qv_bouton_panel').removeClass('qv_bouton_active')
            $('.panel_'+indexInArray).toggleClass('qv_bouton_active');
        })
        $(this).on('touchstart', function () {

            move('right', false, indexInArray);
            $('.arrow_left').css('display', 'none')
            $('.arrow_right').css('display', 'none')
            // $(selector).toggleClass(className);
            $('.qv_bouton_panel').removeClass('qv_bouton_active')
            $('.panel_'+indexInArray).toggleClass('qv_bouton_active');
        })
        if (indexInArray == 0) {
            $('.panel_0').toggleClass('qv_bouton_active');
        }
        // console.log($('.panel_'+indexInArray));
    })




    /**
     * Gestion de l'animation des compétences
     */

    // let position = $(window).scrollTop(); 
    let containerCompetences = document.querySelector("#competences")
    let animated = false;

    function animationJaugeCompetences() {
        var jauge = 
            Array.from(
                document.getElementsByClassName("jauge")
            ).forEach(item => item.classList.toggle("remplissage-actif"));
    }

    $(window).scroll(function() {
        let breakPoint = window.innerHeight/2;

        if (window.innerHeight < 900) {
            breakPoint = 100
        }
        if(containerCompetences.getBoundingClientRect().top < breakPoint){
            if(animated == false){
                animationJaugeCompetences();
                animated = true;
            }
        } 

    });




    /**
     * Gestion de l'animation des langues
     */
    let positionLangues = $(window).scrollTop(); 
    let containerLangues = document.querySelector(".container-langues")
    let langueAnimated = false;

    function animateBorderLangues() {
        var circles = 
        Array.from(
            document.getElementsByClassName("circular-progress")
        ).forEach(item => item.classList.toggle("full"));
        
        var contentLangue = document.querySelector(".content-languages");
        contentLangue.style.display = "flex";
    }

    $(window).scroll(function() {
        let breakPointLangues = window.innerHeight - containerLangues.clientHeight;

        if(containerLangues.getBoundingClientRect().top < breakPointLangues){
            if(langueAnimated == false){
                animateBorderLangues();
                langueAnimated = true;
            }
        } 
        
    });

});