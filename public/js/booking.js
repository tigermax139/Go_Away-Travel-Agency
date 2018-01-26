function hotelCost() {
    const date = +new Date();
    // const curr_date = date.getDate();
    // const curr_month = date.getMonth() + 1;
    // const curr_year = date.getFullYear();
    // const _localDate = (curr_month + curr_date + curr_year );
    const localDate = Math.round(date/86400000);
    //console.log(curr_month +'/' + curr_date +'/' + curr_year );
    console.log(localDate);


    // Поля для росчета стоимсти отелей
    const _dateIn = document.getElementById('dateIn');
    const _dateOut = document.getElementById('dateOut');
    const  dateIn = Date.parse(_dateIn.value.split('/'))/86400000;
    console.log(Math.round(dateIn));
    const  dateOut = Date.parse(_dateOut.value.split('/'))/86400000;

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
    if((dateOut < +dateIn) || ( Math.round(dateIn) < localDate)) {
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

    //Сдвигаем нашу робочую зону
    const cost = document.querySelector('.cost');
    const hotels = document.querySelector('.hotels');
    //const booking = document.querySelector('.booking');

    cost.classList.remove('slider__visible');
    cost.classList.add('slider__hidden');
    hotels.classList.add('slider__visible');


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

    //Сдвигаем нашу робочую зону
    const booking = document.querySelector('.booking');
    const hotels = document.querySelector('.hotels');
    //const booking = document.querySelector('.booking');

    hotels.classList.remove('slider__visible');
    hotels.classList.add('slider__hidden');
    booking.classList.add('slider__visible');
}