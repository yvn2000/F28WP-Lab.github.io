
var weatherContainer = document.getElementById("weather-info");

var btn = document.getElementById("btn");
var city = document.getElementById("cityInput");
console.log(city.value);

btn.addEventListener("click", function() {
    weatherContainer.insertAdjacentHTML('beforeend' , city.value);

    var ourRequest = new XMLHttpRequest();
    
    ourRequest.open('GET', 
    'https://api.openweathermap.org/data/2.5/weather?q=' +city.value+ '&appid=e74a752c81684094463e38f68e07d288');
    
    /*ourRequest.open('GET', 
    'test.json');*/
    ourRequest.onload = function() {
        //console.log(ourRequest.responseText);

        var ourData = JSON.parse(ourRequest.responseText);

        renderHTML(ourData);
        //btn.classList.add("hide-me");
    };
    ourRequest.send();

})


function renderHTML(data){

    var htmlString = "";

    htmlString += "<p>" + data.weather[0].description +  
        ", </br> Is the current weather condition </br>" ;
    
    htmlString += '.</p>';

    weatherContainer.insertAdjacentHTML('beforeend' , htmlString);
    

}