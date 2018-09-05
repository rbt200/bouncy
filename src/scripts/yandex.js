let myMap;
const t = ymaps.ready(init);
//alert(t);
function init () {
    myMap = new ymaps.Map('map', {
        center: [53.886, 27.609], // Минск 53.886854, 27.609846
        zoom: 13
    }, {
        searchControlProvider: 'yandex#search'
    });
myMap.geoObjects
    .add(new ymaps.Placemark([53.886854, 27.609846], {
        balloonContent: '<strong>Stormnet</strong>'
    }))
}