
var weatherContainer = document.getElementById("weather-info");

var btn = document.getElementById("btn");
var city = document.getElementById("cityInput");
console.log(city.value);

btn.addEventListener("click", function() {
    //weatherContainer.insertAdjacentHTML('beforeend' , city.value);

    if (city.value=='') {
        alert("Please Enter City Name");
        return;
    }

    var ourRequest = new XMLHttpRequest();
    
    ourRequest.open('GET', 
    'https://api.openweathermap.org/data/2.5/weather?q=' +city.value+ '&appid=e74a752c81684094463e38f68e07d288');
    
    ourRequest.onerror = function() {
        alert("Request Failed");
    }

    ourRequest.onload = function() {

        var ourData = JSON.parse(ourRequest.responseText);

        renderHTML(ourData);
    };
    ourRequest.send();

})


function renderHTML(data){

    var htmlString = "";

    htmlString += "<p>The weather in " + city.value + " is " + data.weather[0].description +  
        ". <p>The temperature is " + data.main.temp + " degrees with a wind speed of "
        + data.wind.speed + "m/s.";
    
    htmlString += '.<hr></p>';

    weatherContainer.insertAdjacentHTML('beforeend' , htmlString);
    

}