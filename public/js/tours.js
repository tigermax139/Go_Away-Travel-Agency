// CARD TOGGLE
function toggleCard() {
    /*****************CARD VIEW********************/
    const btnShort = document.getElementById("view_short");
    const btnLong = document.getElementById("view_long");
    const toursItems = document.querySelector(".tours__items");

    btnLong.classList.add('border-green');
    btnShort.addEventListener('click', function () {
        toursItems.classList.add('tour-short');
        btnShort.classList.add('border-green');
        btnLong.classList.remove('border-green');
    });
    btnLong.addEventListener('click', function () {
        toursItems.classList.remove('tour-short');
        btnLong.classList.add('border-green');
        btnShort.classList.remove('border-green');
    });
}
toggleCard();
function resize () {
    const toursItems = document.querySelector(".tours__items");
    const size = +640;
    let count = +1;
    // window.addEventListener('resize', (event)=> {
    const clientWidth = window.innerWidth;
    //console.log(count);
    if(clientWidth <= size) {
        toursItems.classList.add('tour-short');
        count = 2;
    }else if((clientWidth > size) && (count === 2)){
        toursItems.classList.remove('tour-short');
        count = 1;
    }
    //});
}
resize();
/************Select Card By Tags*******/
function cardSelector() {
    /****************CARD SORT************************/

    var btnTop = document.getElementById('btnTop');
    var btnSale = document.getElementById('btnSale');
    var btnChild = document.getElementById('btnChild');
    var btnLove = document.getElementById('btnLove');

    var tours = document.getElementsByClassName('tour');
    var tags = document.getElementsByClassName('tag');

    btnTop.addEventListener('click', function () {
        if(!btnTop.classList.contains('border-green')) {
            tourClear();
        }
        var target = getTarget(btnTop);
        tourSelector(target);

        btnTop.classList.toggle('border-green');
    });
    btnSale.addEventListener('click', function () {
        if(!btnSale.classList.contains('border-green')) {
            tourClear();
        }

        var target = getTarget(btnSale);
        tourSelector(target);

        btnSale.classList.toggle('border-green');
    });
    btnChild.addEventListener('click', function () {
        if(!btnChild.classList.contains('border-green')) {
            tourClear();
        }
        var target = getTarget(btnChild);
        tourSelector(target);

        btnChild.classList.toggle('border-green');
    });
    btnLove.addEventListener('click', function () {
        if(!btnLove.classList.contains('border-green')) {
            tourClear();
        }
        var target = getTarget(btnLove);
        tourSelector(target);

        btnLove.classList.toggle('border-green');
    });

    function getTarget(btn) {
        return btn.dataset.target;
    }
    function tourSelector(feature) {

        for (var i = 0; i<tours.length; i++){
            var attr = tours[i].dataset.features;
            if(attr != null){
                var attrStr = attr.toString();
                var featureStr = feature.toString();

                if(attrStr != featureStr) {
                    tours[i].classList.toggle('display-none');
                }
            }else {
                tours[i].classList.toggle('display-none');
            }
        }
    }
    function tourClear() {
        for (var j = 0; j<tags.length; j++){
            tags[j].classList.remove('border-green');
        }
        for (var i = 0; i < tours.length; i++) {
            tours[i].classList.remove('display-none');
        }
    }
}
//cardSelector();

/**********SORT BY LOWER PRICE *********/
function sortByPrice() {
    btn = document.getElementById('sort_price');
    var tours = document.getElementsByClassName('tour');


    btn.addEventListener('click', function () {

        if(btn.classList.contains('border-green')){
            for (var i = 0; i<tours.length; i++){
                tours[i].style.order = '';
            }
        }else {
            for (var j = 0; j<tours.length; j++){
                tours[j].style.order = tours[j].dataset.price;
            }
        }
        btn.classList.toggle('border-green');
    });
}
//sortByPrice();

/******** Sort by Country *********/
function sortByCountry() {
    var cList = document.getElementById('country__list-s');
    var tours = document.getElementsByClassName('tour');

    cList.addEventListener('change', function () {
        var selectCountry = cList.options[cList.selectedIndex].text;
        if(cList.selectedIndex == 0){
            countryClear();
        }else {
            countryClear();
            for (var i = 0; i<tours.length; i++){
                if (tours[i].dataset.country != selectCountry) {
                    tours[i].classList.add('display-none-country');
                }
            }
        }
    });
    function countryClear() {
        for (var i = 0; i<tours.length; i++){
            tours[i].classList.remove('display-none-country');
        }
    }
}
//sortByCountry();

/******* Sort by Price *************/
function sortByMaxPrice() {
    var tours = document.getElementsByClassName('tour');
    var drag = document.getElementById('maxPrice');

    drag.addEventListener('change', function () {
        priceClear();
        var maxPrice = drag.value;

        console.log(maxPrice);

        for (var i = 0; i<tours.length; i++) {
            var price = +tours[i].dataset.price;

            if(maxPrice < price){
                tours[i].classList.add('display-none-price');
            }
        }
    });
    function priceClear() {
        for (var i = 0; i<tours.length; i++){
            tours[i].classList.remove('display-none-price');
        }
    }
}
//sortByMaxPrice();