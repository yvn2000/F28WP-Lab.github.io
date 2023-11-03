
var weatherContainer = document.getElementById("weather-info");

var btn = document.getElementById("btn");
var city = document.getElementById("cityInput");
console.log(city.innerHTML);

btn.addEventListener("click", function() {

    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 
    'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}');
    ourRequest.onload = function() {
        //console.log(ourRequest.responseText);

        var ourData = JSON.parse(ourRequest.responseText);

        renderHTML(ourData);
        btn.classList.add("hide-me");
    };
    ourRequest.send();

})


function renderHTML(data){

    var htmlString = "";

    

    weatherContainer.insertAdjacentHTML('beforeend' , htmlString);
    

}