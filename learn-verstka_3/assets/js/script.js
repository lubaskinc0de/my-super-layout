// jquery

$(function() {
    // Filter
    var filter = $("[data-filter]");
    filter.on("click", function(event) {
            event.preventDefault();
            var cat = $(this).data("filter");
            $("[data-cat]").each(function() {
                // проходимся по всем элементам с data-cat атрибутом с помощью each
                var elemCat = $(this).data("cat"); // текущий обьект итерации
                if (cat == 'all') {
                    $(this).removeClass("hide")
                } else if (elemCat != cat) {
                    $(this).addClass("hide")
                } else {
                    $(this).removeClass("hide")
                }
            });
        })
        // Modal window

    const modalCall = $("[data-modal]");
    const modalClose = $("[data-close]");
    const modalCloseandOpen = $("[data-btn-close]");
    modalCall.on("click", function(event) {
        event.preventDefault();
        var $this = $(this);
        var modalId = $this.data("modal");
        $("#body").addClass("no-scroll");
        $(modalId).addClass("show")
        setTimeout(function() {
            // ставим задержку для плавности
            $(modalId).find(".modal__dialog").css({
                transform: "rotateX(0)", // ищем элемент модал диалог и выдаем ему css свойство rotate
            })
        }, 200)
        $('[data-slider="slick"]').slick('setPosition'); // при вызове модального окна из за изменения размеров вызываем перерасчет размеров слайдера 
    })
    modalClose.on("click", function(event) {
        event.preventDefault();
        var $this = $(this);
        var modalParent = $this.parents(".modal") // ищем родительский класс с классом modal
        modalParent.find(".modal__dialog").css({
            transform: "rotateX(90deg)", // ищем элемент модал диалог и выдаем ему css свойство rotate
        })
        setTimeout(function() {
            $("#body").removeClass("no-scroll");
            modalParent.removeClass("show");
        }, 250)
    })
    modalCloseandOpen.on("click", function(event) {
            event.preventDefault();
            var $this = $(this);
            var modalParent = $this.parents(".modal") // ищем родительский класс с классом modal
            modalParent.find(".modal__dialog").css({
                transform: "rotateX(90deg)", // ищем элемент модал диалог и выдаем ему css свойство rotate
            })
            setTimeout(function() {
                modalParent.removeClass("show");
            }, 250)
        })
        // закрытие модального окна после клика по маске (в месте где нет окна)
    $(".modal").on("click", function(event) {
        var $this = $(this);

        $this.find(".modal__dialog").css({
            transform: "rotateX(90deg)"
        });

        setTimeout(function() {
            $this.removeClass('show');
            $("#body").removeClass('no-scroll');
        }, 250);
    });
    $(".modal__dialog").on("click", function(event) {
            event.stopPropagation(); // если мы кликаем по модал диалог то мы отменяем событие клика у его родителя (.modal) т.е если мы кликнем по диалоговому окну то окно не закроеться а если по маске то закроеться
        })
        // Slider
        //=====================

    $('[data-slider="slick"]').slick({
        Infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: false, // стрелки
        dots: true, // точки
        // инициализируем слайдер
    })

    $(".modal-work__btn--prev").on("click", function(event) {
        event.preventDefault();
        var current_slider = $(this).parents(".modal").find("[data-slider='slick']");
        current_slider.slick("slickPrev") // при нажатии на кнопку назад переключаем именно текущий слайдер назад (тоесть если у нас будет 2 модальных окна то переключиться только текущее модальное окно)
    });
    $(".modal-work__btn--next").on("click", function(event) {
        event.preventDefault();
        var current_slider = $(this).parents(".modal").find("[data-slider='slick']");
        current_slider.slick("slickNext") // при нажатии на кнопку назад переключаем именно текущий слайдер назад
    });

    /* Burger */
    const burger = $("#burger");
    const nav = $("#nav");
    burger.on("click", function(event) {
        event.preventDefault();
        nav.toggleClass("show");
    })
});