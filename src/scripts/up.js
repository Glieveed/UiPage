"use strict";

/* Функция создания/инициализации/работы слайдера */

function up_slider(upElem, upData) {
    var wrapper = document.querySelector(upElem),
        sliderBox = "",
        slidesList = "",
        data = document.querySelectorAll(upData),
        sliderInfo = {
            cntSlides: 0,
            currentSlide: 0,
            currentSlideWidth: 0,
            sumSlidesWidth: 0,
            shift: 0,
            currentShift: 0,
        };



    /* Работа с содержимым */
    function workWithInner() {
        /* Создание элементов */
        sliderBox = document.createElement("div");
        slidesList = document.createElement("div");

        /* Вставка элементов */
        sliderBox.appendChild(slidesList);
        wrapper.appendChild(sliderBox);

        for (var i = 0; i < data.length; i += 1) {
            data[i].setAttribute("data-id", i);
            data[i].classList.add("up-slider__item");
            slidesList.appendChild(data[i]);
        }

        addBaseClasses(wrapper, sliderBox, slidesList);
        addBaseControls(sliderBox);

        var appendedItems = document.querySelectorAll(".up-slider__item");
        for (var i = 0; i <appendedItems.length; i += 1) {
            sliderInfo.sumSlidesWidth += parseInt(getComputedStyle(appendedItems[i]).width);
        }
    }

    /* Добавление классов, базовым элементам */
    function addBaseClasses(wrapp, box, list) {
        wrapp.classList.add("up-app");
        wrapp.classList.add("up-slider");
        box.classList.add("up-slider__box");
        list.classList.add("up-slider__list");
    }

    // Добавление базовых элементов контроля
    function addBaseControls(controlBox) {
        /* Создание кнопок */
        var nextButton = document.createElement("button");
        var prevButton = document.createElement("button");

        /* Атрибуты кнопок */
        nextButton.classList.add("up-slider__controls");
        nextButton.classList.add("up-slider__next");
        nextButton.setAttribute("id", "up-slider__next");
        prevButton.classList.add("up-slider__controls");
        prevButton.classList.add("up-slider__prev");
        prevButton.setAttribute("id", "up-slider__prev");

        /* Содержимое кнопок */
        nextButton.innerHTML = ">";
        prevButton.innerHTML = "<";

        /* Вставка кнопок */
        controlBox.insertBefore(nextButton, null);
        controlBox.insertBefore(prevButton, document.querySelector(".up-slider__list"));
    }

    function autoPlay() { 
        var next = new Event("click");
        setInterval(function() {
            document.getElementById("up-slider__next").dispatchEvent(next);
        }, 5000);
    }


    // Запуск слайдера в автоматическом режиме
    // autoPlay();


    /* Добавления базового функционала */
    function addBaseFunctional() {
        data[sliderInfo.currentSlide].classList.add("currentSlide");
        var next = document.getElementById("up-slider__next");
        var prev = document.getElementById("up-slider__prev");

        function nextSlide() {
            if ((sliderInfo.cntSlides - 1) === parseInt(document.querySelector(".currentSlide").getAttribute("data-id"))) {
                var lastElem = document.querySelector(".currentSlide");
                lastElem.classList.remove("currentSlide");
                sliderInfo.currentSlide = 0;
                data[sliderInfo.currentSlide].classList.add("currentSlide");
            } else {
                var currentSlide = document.querySelector(".currentSlide");
                var currentSlideIndex = currentSlide.getAttribute("data-id");
                var siblingNextSlide = data[parseInt(currentSlideIndex) + 1];
                sliderInfo.currentSlide = parseInt(currentSlideIndex) + 1;
                siblingNextSlide.classList.add("currentSlide");
                currentSlide.classList.remove("currentSlide");
                
            }

            sliderInfo.currentSlideWidth = getComputedStyle(data[sliderInfo.currentSlide]).width;
            sliderInfo.shift += parseInt(sliderInfo.currentSlideWidth);
            var lastElemWidth = parseInt(getComputedStyle(data[data.length - 1]).width);
            if (sliderInfo.shift > sliderInfo.sumSlidesWidth - lastElemWidth) {
                sliderInfo.shift = 0;
                slidesList.style.marginLeft = sliderInfo.shift + "px";
            } else {
                slidesList.style.marginLeft = "-" + sliderInfo.shift + "px";
            }
        }

        function prevSlide() {
            if (sliderInfo.currentSlide <= 0) {
                data[0].classList.remove("currentSlide");
                var lastSlide = data[sliderInfo.cntSlides - 1];
                sliderInfo.currentSlide = sliderInfo.cntSlides - 1;
                lastSlide.classList.add("currentSlide");

                
            } else {
            var currentSlide = document.querySelector(".currentSlide");
            var currentSlideIndex = currentSlide.getAttribute("data-id");
            var siblingPrevSlide = data[parseInt(currentSlideIndex) - 1];
            sliderInfo.currentSlide = parseInt(currentSlideIndex) - 1;
            siblingPrevSlide.classList.add("currentSlide");
            currentSlide.classList.remove("currentSlide");

            
            }
            sliderInfo.currentSlideWidth = getComputedStyle(data[sliderInfo.currentSlide]).width;
            sliderInfo.shift = parseInt(sliderInfo.shift) - parseInt(sliderInfo.currentSlideWidth);
            var lastElemWidth = parseInt(getComputedStyle(data[data.length - 1]).width);
            if (sliderInfo.shift < 0) {
                sliderInfo.shift = sliderInfo.sumSlidesWidth - lastElemWidth;
                slidesList.style.marginLeft = "-" + sliderInfo.shift + "px";
            } else {
                slidesList.style.marginLeft = "-" + sliderInfo.shift + "px";
            }
           
            
        }



        next.onclick = function() {
            nextSlide();

        };

        prev.onclick = function() {
            prevSlide();

        }
    }
    
    /* Функция инициализации */
    function init() {

        workWithInner();
        addBaseFunctional();

        // Задание свойств во время инициализации
        sliderInfo.cntSlides = data.length;
        sliderInfo.currentSlideWidth = getComputedStyle(data[sliderInfo.currentSlide]).width;
        
    }

    init();
}

/* Функция для работы с аккордеоном */

// Данные из которых строится accordion
var accordionData = [
    {
        title: "What is Lorem Ipsum?",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }, 
    {
        title: "Where does it come from?",
        content: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32."
    }, 
    {
        title: "Why do we use it?",
        content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    }, 
    {
        title: "Where can I get some?",
        content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
    }
];

function up_accordion(upElem, upData) {
    var wrapper = document.querySelector(upElem),
        data = upData,
        accordionInfo = {
            dataLength: data.length
    };

    wrapper.classList.add("up-app");
    wrapper.classList.add("up-accordion");
    
    /* Function for create/initialization/append items */
    function createItems() {
        var item, itemTitle, itemContent;

        for (var i = 0; i < accordionInfo.dataLength; i += 1) {

            item = document.createElement("div");
            item.setAttribute("data-id", i);
            item.classList.add("up-accordion__item");

            itemTitle = document.createElement("div");
            itemTitle.setAttribute("title-number", i);
            itemTitle.classList.add("up-accordion__title");
            itemTitle.innerHTML = data[i].title;

            itemContent = document.createElement("div");
            itemContent.setAttribute("content-number", i);
            itemContent.classList.add("up-accordion__content");
            itemContent.innerHTML = data[i].content;

            if (i === 0) {
                item.classList.add("item-opened");
                itemTitle.classList.add("title-active");
                itemContent.classList.add("content-active");
            }

            item.appendChild(itemTitle);
            item.appendChild(itemContent);
            wrapper.appendChild(item);
        }

        function clearItemClasses() {
            var items = document.querySelectorAll(".up-accordion__item");
            var titles = document.querySelectorAll(".up-accordion__title");
            var contents = document.querySelectorAll(".up-accordion__content");

            for (var i = 0; i < items.length; i += 1) {
                items[i].classList.remove("item-opened");
                titles[i].classList.remove("title-active");
                contents[i].classList.remove("content-active");
            }
        }


        
        function addItemFunctional (objEvent) {
            // Clear classes
            clearItemClasses();

            /* Item Variables */
            var currentItem = objEvent.target.parentNode,
                currentItemIndex = currentItem.getAttribute("data-id");

            /* Item title variables */
            var currentTitle = objEvent.target,
                currentTitleIndex = currentTitle.getAttribute("title-number");

            /* Item content variables */
            var currentContent = currentTitle.nextElementSibling,
                currentContentIndex = currentContent.getAttribute("content-number");

            // Functional
            currentItem.classList.add("item-opened");
            currentTitle.classList.add("title-active");
            currentContent.classList.add("content-active");


            
        }


        wrapper.onclick = function(e) {
            var target = e.target;
            if (target.classList.contains("up-accordion__title")) {
                addItemFunctional(e);
            } else {
                return false;
            }
        };

    }


    function init() {
        createItems();
    }

    init();
}

window.onload = function() {
    up_slider("#slider-root", ".slider-elem");
    up_accordion("#accordion-root", accordionData);
};