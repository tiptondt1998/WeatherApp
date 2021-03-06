var getCity = function(city){
    //format the github api url
    // var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=de9be8a62e91f54477dfa886a78cb6ec&units=imperial";
    //make a request to the url
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=de9be8a62e91f54477dfa886a78cb6ec&units=imperial";
    fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
          displayCity(data, city);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()` method
      alert("Unable to connect");
    });
};

var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#city");

var formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input element
var city = nameInputEl.value.trim();

if (city) {
  getCity(city);
  nameInputEl.value = "";
} else {
  alert("Please enter a city");
}
    console.log(event);
  };

  userFormEl.addEventListener("submit", formSubmitHandler);

  var displayCity = function(data, city) {
    console.log(city);
    console.log(data);
    
    var today = new Date();
    var month = (today.getMonth()+1);
    var day = today.getDate();
    var year = today.getFullYear();
    
    var determineConditions = function(index){
      var x = "";
      var y = data.list[index].weather[0].description;
      if(y === "overcast clouds"){
        x = "overcast clouds";
      }
      else if(y === "broken clouds"){
        x = "broken clouds";
      }
      else if(y === "scattered clouds"){
        x = "scattered clouds";
      }
      else if(y === "few clouds"){
        x = "few clouds";
      }
      else if(y === "light rain"){
        x = "light rain";
      }
      else if(y === "clear sky"){
        x = "clear sky";
      }
        return x;
    }

    var weather = document.querySelector("#displayWeather");
    weather.createElement="div";

    weather.innerHTML = "<p id=weatherResult class=card>"+
    month + "-" + day + "-" + year + 
    "<br>Temperature:  "+ JSON.stringify(data.list[0].main.temp) + "<br>" +
     "Humidity: " + JSON.stringify(data.list[0].main.humidity) +
     "<br>" + "Conditions: " + determineConditions(0) +
     "</p>" + 
    "<p id =weatherResult class=card>" +
    month + "-" + (day+1) + "-" + year +
    "<br>Temperature: " + JSON.stringify(data.list[1].main.temp) + "<br>" +
    "Humidity: " + JSON.stringify(data.list[1].main.humidity) +
    "<br>" + "Conditions: " + determineConditions(1) +
    "</p>" +
    "<p id =weatherResult class=card>" +
    month + "-" + (day+2) + "-" + year +
    "<br>Temperature: " + JSON.stringify(data.list[2].main.temp) + "<br>" +
    "Humidity: " + JSON.stringify(data.list[2].main.humidity) +
    "<br>" + "Conditions: " + determineConditions(2) +
    "</p>" +
    "<p id =weatherResult class=card>" +
    month + "-" + (day+3) + "-" + year +
    "<br>Temperature: " + JSON.stringify(data.list[3].main.temp) + "<br>" +
    "Humidity: " + JSON.stringify(data.list[3].main.humidity) +
    "<br>" + "Conditions: " + determineConditions(3) +
    "</p>" +
    "<p id =weatherResult class=card>" +
    month + "-" + (day+4) + "-" + year +
    "<br>Temperature: " + JSON.stringify(data.list[4].main.temp) + "<br>" +
    "Humidity: " + JSON.stringify(data.list[4].main.humidity) +
    "<br>" + "Conditions: " + determineConditions(4) +
    "</p>"
    localStorage.setItem(city, JSON.stringify(data.list[1].main.temp));
    
    var searchHistory = document.getElementById("searchHistory");
    searchHistory.innerHTML = "<button id=history>"+ city +"</button>"

  };