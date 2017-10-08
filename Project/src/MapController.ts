declare var google;

function initMap() {
    let floripa = {lat: -27.59, lng: -48.55};
    let map = new google.maps.Map(document.getElementById('map-container'), {
        zoom: 15,
        center: floripa
    });
    let marker = new google.maps.Marker({
        position: floripa,
        map: map
    });
}