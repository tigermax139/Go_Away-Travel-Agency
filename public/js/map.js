function initMap() {
    const uluru = {lat: 49.245246 , lng: 28.498625};
    let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: uluru,
        scrollwheel: false,
        zoomControl: true

    });
    let infowindow = new google.maps.InfoWindow({
        content: "<img src='img/logo_new.png' class='image-map image-fluid' alt='p-hotel'>"
    });
    let marker = new google.maps.Marker({
        position: uluru,
        map: map,
        title: "P-hotel",
        label: "H"

    });
    infowindow.open(map, marker);
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}