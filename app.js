const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');

/*****************MONGO DB  *****************************/
const MongoClient = require('mongodb').MongoClient;
const urlDB = 'mongodb://admin:aunion67@ds261527.mlab.com:61527/travel_agency';
const objectId = require('mongodb').ObjectID;
/*********************MONGO END*************************/

// View engine setup
app.set('views', __dirname + '/template');
app.set('view engine', 'ejs');

// Static folder
app.use('/',express.static(path.join(__dirname, 'public')));

//Body parser Middleware
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/index', (req, res) => {
    res.render('index');
});
//tours ALL
app.get('/tours', (req, res) => {
    tourView(req, res, {}, 'tours_bd');
});
app.get('/tours/hot', (req, res) => {
    tourView(req, res, {tourFeatures:'Скидка'},'toursHot');
});
app.get('/tours/top', (req, res) => {
    tourView(req, res, {tourFeatures:'Топ направления'},'toursTop');
});
//get Tours Country
app.get('/tours/country', (req, res) => {
    let country;
    if(req.query.c){
        country = req.query.c;
    }else {
        res.redirect('/tours');
    }
    console.log(country);
    tourView(req, res,{tourCountry: country},'tours_bd');
});
//функция tourView имеет в себе встроеный пагинатор
function tourView(req, res, sample = {}, render) {
    //Унаем количество туров
    MongoClient.connect(urlDB, (err, db) => {
        db.collection('tours').find(sample).toArray((err, tours) => {
            db.close();
            const size = tours.length;
            //номер странницы и лимит туров на одной
            const limit = 10;
            //количество страниц
            const maxPage = Math.ceil(size/limit);
            //парсим боди на запрос странницы
            let page;
            if(req.query.p){
                page = +req.query.p;
                if(page > maxPage){
                    page = maxPage;
                }
            }else {
                page = 1;
            }
            //сколько туров пропускать при выборке, минус один что б было сначала
            const skip = (page - 1) * limit;
            //console.log(size+'///' + page+'///' +  maxPage+'///' +  limit+'///' +  skip);
            MongoClient.connect(urlDB, (err, db) => {
                db.collection('tours').find(sample).skip(skip).limit(limit).toArray(
                    (err, tours) => {
                        db.close();
                        if(tours.length === 0) {
                            res.redirect('/tours');
                            console.log('redirect was made!')
                        }else {
                            res.render(render, {
                                tours,
                                page: page,
                                maxPage: maxPage
                            });
                        }
                    });
            });
        });
    });
}
//Create tour
app.get('/createTour', (req, res) => {
    res.render('createTour');
});
app.post('/createTour', (req, res) => {
    const {tourName, tourCountry, tourPrice, tourDescription, tourContent, tourFeatures, tourImg} = req.body;
    const oneTour = {
        tourName,
        tourCountry,
        tourPrice,
        tourDescription,
        tourContent,
        tourFeatures,
        tourImg
    };

    MongoClient.connect(urlDB, (err, db) => {
        db.collection("tours").insertOne(oneTour, (err, result) => {
            if(err) {
                return res.status(400).send();
            }
            db.close();
            res.redirect('/createTour');
        });
    });
});

//Create tour
app.get('/createHotel', (req, res) => {
    res.render('createHotel');
});
app.post('/createHotel', (req, res) => {
    const {hotelName, hotelCountry, hotelPrice, hotelStar, hotelDescription, hotelFeatures, hotelImg} = req.body;
    const oneTour = {
        hotelName,
        hotelCountry,
        hotelPrice,
        hotelStar,
        hotelDescription,
        hotelFeatures,
        hotelImg
    };

    MongoClient.connect(urlDB, (err, db) => {
        db.collection("hotels").insertOne(oneTour, (err, result) => {
            if(err) {
                return res.status(400).send();
            }
            db.close();
            res.redirect('/createHotel');
        });
    });
});
//Search
app.post('/search', (req, res) => {
    //const {result} = req.body;
    const id = String(req.body.ticketId);
    console.log(id);
    MongoClient.connect(urlDB, (err, db) => {
        db.collection("orders").find({_id: id}).toArray((err, oneOrder) => {
            console.log(oneOrder);
            if (err) {
                return res.status(400).send();
            }
            if(oneOrder.length === 0){
                res.redirect('/index');
            }
            res.render('ticket', {
                oneOrder
            });
            db.close();
        });
    });
});
//Single tour
app.get('/single/:id', (req, res) => {

    const id = new objectId(req.params.id);

    MongoClient.connect(urlDB, (err, db) => {
        db.collection("tours").findOne({_id: id}, (err, tour) =>{
            if(err) {
                console.log(err);
                return res.status(400).send();
            }
            //search hotels
            const hotelCountry = tour.tourCountry;
            db.collection("hotels").find({hotelCountry}).toArray((err, hotels) =>{
                res.render('single', {
                    tour,
                    hotels
                });
            });
            db.close();
        });
    });
});
app.post('/ticket', (req, res) => {
    const {name, number, email, message, orderPrice, orderAdult, orderChildren,
        orderDateIn, orderDateOut, orderHotel, orderRoom, orderTour, orderCountry} = req.body;
    const oneOrder = {
        name,
        number,
        email,
        message,
        orderPrice,
        orderAdult,
        orderChildren,
        orderDateIn,
        orderDateOut,
        orderHotel,
        orderRoom,
        orderTour,
        orderCountry
    };

    MongoClient.connect(urlDB, (err, db) => {
        db.collection("orders").insertOne(oneOrder, (err, result) => {
            if(err) {
                return res.status(400).send();
            }
            MongoClient.connect(urlDB, (err, db) => {
                const id = result.insertedId;
                db.collection("orders").find({_id: id}).toArray((err, oneOrder) => {
                    if(err) {
                        return res.status(400).send();
                    }
                    db.close();
                    res.render('ticket',{
                        oneOrder
                    });
                });
            });
        });
    });
});
app.get('/delete/:id', (req, res) => {
    const id = new objectId(req.params.id);

    MongoClient.connect(urlDB, (err, db) => {
        db.collection("orders").removeOne({_id: id}, (err, result) =>{
            if(err) {
                console.log(err);
                return res.status(400).send();
            }
            db.close();
            res.redirect('/tours');
        });
    });
});
/*********LISTENER************/
app.use((req, res, next) => {
    res.send('ERROR 404');
    next();
});

app.use((error, req, res, next) => {
    console.log(error);
    res.send('ERROR 500, server not found');
    next();
});

app.listen(3000 , () => {
    console.log("APP started");
});