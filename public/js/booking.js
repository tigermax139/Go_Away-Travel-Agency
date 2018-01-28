function hotelCost(event) {
    event.preventDefault();
    
    // Поля для росчета стоимсти отелей
    const dateIn = document.getElementById('dateIn');
    const dateOut = document.getElementById('dateOut');
    // Парсим дату с милисекунд в дни
    const  _dateIn = Date.parse(dateIn.value.split('/'))/86400000;
    const  _dateOut = Date.parse(dateOut.value.split('/'))/86400000;

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
    function dayPromise () {
        return new Promise((resolve, reject) => {
            if((dateIn.value === "")||(dateOut.value === "")){
                reject();
            }
            if((_dateOut < +_dateIn)) {
                reject();
            }else if(_dateOut === _dateIn){
                day = +1 * roomType;
                resolve();
            }
            else{
                day = +(_dateOut - _dateIn) * roomType;
                resolve();
            }
        })
    }
    dayPromise()
        .then(resolve => {
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

           slideSection('cost', 'hotels');
           // scrollToTop(800);
        })
        .catch( reject => {
            console.log(reject);
            alert('Проверьте коректность дат!');
        })
}
function booking(hotelId) {
    const hotelPrice = document.getElementById(hotelId).dataset.order;
    const tourPrice = document.getElementById('tourPrice').dataset.order;
    //Поля для отправки на сервер готового заказа
    const orderPrice = document.getElementById('orderPrice');
    const orderHotel = document.getElementById('orderHotel');
    //Общая цена тур плюс отель
    const generalPrice = Number(hotelPrice) + Number(tourPrice);
    orderPrice.value = ` Итого: ${generalPrice}$`;
    //Идентификатор отеля равен его имени
    orderHotel.value = hotelId;

    slideSection('hotels', 'booking');
   // scrollToTop(800);
}
function slideSection(currentPage, nextPage) {
    scrollToTop(800);
    // console.log(currentPage);
    // console.log(nextPage);

    //Сдвигаем нашу робочую зону
    const current = document.querySelector(`.${currentPage}`);
    const next = document.querySelector(`.${nextPage}`);

    current.classList.remove('slider__visible');
    current.classList.add('slider__hidden');
    next.classList.remove('slider__hidden');
    next.classList.add('slider__visible');
}
function validator (sectionName) {
    const section = document.querySelector(`.${sectionName}`);
    const inputs = section.querySelectorAll('[required]');
    let counter;

    for(let input of inputs){
        if(input.checkValidity() === false) {
            counter++;
        }
        console.log(counter);
    }
}
// validator('cost');
function scrollToTop(pageY = 0) {
    $("html, body").animate({ scrollTop: pageY }, "slow");
}
function starGenerator() {
    const hotels = document.querySelectorAll('.hotel__stars');
    let item = `<span class="star__item"></span>`;

    for(let i = 0; i < hotels.length; i++){
       let stars = hotels[i].dataset.stars;
       for(let j = 0; j < stars; j++){
           item += item;
       }
       hotels[i].innerHTML = item;
    }
}
//starGenerator();