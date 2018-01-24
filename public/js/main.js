// Modal window Component
function modalWindow(buttonId, modalId) {
    const open = document.querySelector(buttonId);
    const modal = document.querySelector(modalId);
    const close = modal.querySelector('.modal-close');
    open.addEventListener('click', function () {
        modal.classList.add('modal-content-show');
    });
    close.addEventListener('click', function () {
        modal.classList.remove('modal-content-show');
    });
    const inputTel = modal.querySelector('[type=tel]');
    inputTel.addEventListener('focus', function () {
        inputTel.value = '+380';
    });
}

function hotelCost() {
    // Поля для росчета стоимсти отелей
    const _dateIn = document.getElementById('dateIn');
    const _dateOut = document.getElementById('dateOut');
    const  dateIn = Date.parse(_dateIn.value.split('/'))/86400000;
    const  dateOut = Date.parse(_dateOut.value.split('/'))/86400000;
    debugger;
    const adult = document.getElementById('adult');
    const children = document.getElementById('children');
    const room = document.getElementById('room');
    // Количество людей
    const _adult = +adult.value;
    const _children = +children.value;
    // тип комнаты
    const roomType = +room.options[room.selectedIndex].value;
    //еда
    // let eat = document.getElementById('eat');
    //количиство дней * тип комнаты
    let day;
    if(dateOut < +dateIn) {
        alert('Проверьте коректность дат!');
    }else if(dateOut === dateIn){
        day = +1 * roomType;
    }
    else{
        day = +(dateOut - dateIn) * roomType;
    }
    // отели
    const hotel = document.getElementsByClassName('hotel');
    for (let i = 0; i<hotel.length; i++){
        // p стартовая цена отеля за одну ночь одного человека економ
        let p = hotel[i].dataset.price;
        //для упрощения формулы допустим что завтрак 1% от стоимости номера
        // if(eat.checked){
        //     eat = +p/100;
        // }else {
        //     eat = 0;
        // }
        let eat = 0;
        //результат
        let result =  Math.floor(
            //стоимость номеров
            (((_adult + _children)*(p * roomType))*day) +
            //стоимость еды
            ((_adult + _children)*day*eat));
        hotel[i].dataset.order = result;
        let summ = hotel[i].querySelector('.hotel__price');
        summ.innerHTML = `<span class="hotel__price"> Стоимость: ${result}$ </span>`;
    }

    //Поля для отправки на сервер готового заказа

    //вставляються сразу
    const orderAdult = document.getElementById('orderAdult');
    const orderChildren = document.getElementById('orderChildren');
    const orderDateIn = document.getElementById('orderDateIn');
    const orderDateOut = document.getElementById('orderDateOut');
    const orderRoom = document.getElementById('orderRoom');

    orderAdult.value = _adult;
    orderChildren.value = _children;
    orderDateIn.value = _dateIn.value;
    orderDateOut.value = _dateOut.value;
    orderRoom.value = room.options[room.selectedIndex].text;

}
function booking(hotelId) {
    const hotelPrice = document.getElementById(hotelId).dataset.order;
    const tourPrice = document.getElementById('tourPrice').dataset.order;
    //Поля для отправки на сервер готового заказа
    const orderPrice = document.getElementById('orderPrice');
    const orderHotel = document.getElementById('orderHotel');
    //Общая цена тур плюс отель
    const generalPrice = Number(hotelPrice) + Number(tourPrice);
    orderPrice.value = generalPrice + '$';
    //Идентификатор отеля равен его имени
    orderHotel.value = hotelId;

    // появление модального окошка
    let modal = document.querySelector('#modalBooking');
    let close = modal.querySelector('.modal-close');
    modal.classList.add('modal-content-show');

    close.addEventListener('click', function () {
        modal.classList.remove('modal-content-show');
    });

}
// Dropdown Menu
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropDown(dropId) {
    document.querySelector(dropId).classList.toggle("sub-menu-show");
    document.querySelector(dropId).classList.toggle("sub-menu-show-labtop");
}
// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.sub-menu__btn')) {
        const dropdowns = document.getElementsByClassName("sub-menu__container");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('sub-menu-show')) {
                openDropdown.classList.remove('sub-menu-show');
            }
            if (openDropdown.classList.contains('sub-menu-show-labtop')) {
                openDropdown.classList.remove('sub-menu-show-labtop');
            }
        }
    }
};
// CARD TOGGLE
function toggleCard() {
/*****************CARD VIEW********************/
    var btnShort = document.getElementById("view_short");
    var btnLong = document.getElementById("view_long");
    var toursItems = document.querySelector(".tours__items");

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
/*
// Dropdown Menu Component
function dropdown() {
    var subMenu = document.querySelectorAll('sub-menu');
    for (var j = 0; j <= subMenu.length; j++) {
        var button = subMenu[j].querySelector('.sub-menu__btn');
        var clearItems = document.getElementsByClassName('sub-menu-js');
        console.log(clearItems);
        // var subMenuContainer = subMenu.querySelector('.sub-menu__container');
        // subMenuContainer.classList.add('sub-menu-js');
        button.addEventListener('click', function (event) {
            event.preventDefault();
            if (this.nextElementSibling.classList.contains('sub-menu-show')) {
                this.nextElementSibling.classList.remove('sub-menu-show');
                return true
            }
            else {
                for (var i = 0; i <= clearItems.length; i++) {
                    console.log("++" + clearItems[i]);
                    //clearItems[i].classList.remove('sub-menu-show');
                }
            }
            this.nextElementSibling.classList.add('sub-menu-show');
        });

    }
}
dropdown();
*/

