const weather = document.querySelector(".js-weather");

const API_KEY = "c1785b1e4d1c5a2e27104318dd39c414";
const COORDS = 'coords';

function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        const temperature = json.main.temp;
        const place = json.name;

        weather.innerHTML = `<div>temperature : ${temperature}
        </div><div> station : ${place}</div>`;
    });

}
function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    const coordsObj = {
        latitude : latitude,
        longitude : longitude
    };

    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("can`t acces geo location");
}
function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);

}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if( loadedCoords === null ) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}
function init() {
    loadCoords();
}
 
init();