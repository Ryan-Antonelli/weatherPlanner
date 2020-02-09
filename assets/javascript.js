// add recently searched button and clear button


var m = moment();
var mDate = m.format("LL");

var queryURLWeather;
var queryURLForecast;

var cityRaw;
var city;

var cityList = [];
var buttons = [];

var lat;
var lon;

$("#submit").click(function() {
    
    event.preventDefault();
    
    cityRaw = $("#search").val();
    city = cityRaw.replace(/\s/g,'');
  
clear();    
weatherAjax();
forecastAjax();


      
})

function weatherAjax() {

  var queryURLWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=abcef0450e4daf5019f05245f6fa3ff8";
  
  $.ajax({
    url: queryURLWeather,
    method: "GET"
  })
  .then(function(response){
    lat = response.coord.lat;
    lon = response.coord.lon;  
    // console.log(lat);

      // adds weather description to output area
      // capitalizes first letter of city name
      var cityRawCap = cityRaw.charAt(0).toUpperCase() + cityRaw.slice(1);
      
      $("<h1 id='data'></h1>").text(cityRawCap + "(" + mDate + ")")
        .appendTo("#cityDateIcon");        
      
      $("#humidity").text("Humidity: " + response.main.humidity + "%");
      
      $("#windSpeed").text("Wind speed: " + response.wind.speed + "mph") 
      
      // $("UVIndex").text() 

      // adds weather icon to output area          
      $("<img id='wIcon' src='' alt='weather icon'>")
        .appendTo("#cityDateIcon");
      
      var iconCode = response.weather[0].icon;
      var iconurl = "http://openweathermap.org/img/w/" + iconCode + ".png";
      $('#wIcon')
        .attr('src', iconurl);
    UVIndex();
    recentSearch();
  })
}

function forecastAjax() {
  
  var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&cnt=5&appid=abcef0450e4daf5019f05245f6fa3ff8";
  
  $.ajax({
    url: queryURLForecast,
    method: "GET"
  })
  .then(function(response){
    // console.log(response);
    // iterate through 5-day forecast cards
    for (let i = 0; i < 5; i++) {
      
      var forecastDate = moment().add( i+1, "days").format("MMM Do");       
     // 
      // show forecast date      
      $("<h6 id='forecastDate" + i +"'></h6>")
        .text("(" + forecastDate + ")")
        .appendTo("#forecast" + (i+1));
      // show forecast description
      $("<h6 id='forecastText" + i +"'></h6>")
        .text(response.list[i].weather[0].description)
        .appendTo("#forecast" + (i+1));
      // show forecast humidity
      $("<h6 id='forecastHumText" + i +"'></h6>")
        .text("Humidity: " + response.list[i].main.humidity + "%").appendTo("#forecast" + (i+1))  
      // show forecast temp
      $("<h6 id='forecastTempText" + i +"'></h6>")
        .text("Temp: " + response.list[i].main.temp + "deg F").appendTo("#forecast" + (i+1))
      // show forecast icons
      $("<img id='wfIcon" + i + "' src='' alt='weather icon'>")
        .appendTo("#forecast" + (i+1));
      
      var iconCodeF = response.list[i].weather[0].icon;
      var iconurlF = "http://openweathermap.org/img/w/" +    iconCodeF + ".png";
      $('#wfIcon' + i)
        .attr('src', iconurlF);

    }
  })
}

// clear output fields before population
function clear() {
  $("#search").empty();
  
  $("#cityDateIcon").empty();
  
  for (let i = 1; i < 6; i++) {
    $("#forecast" + i).empty();    
  }
}

function recentSearch() {
  var searched = $("#search").val();
  
  cityList.push(searched)
  // console.log(searched)
  // console.log(cityList)
  
  if (cityList.length < 5) {
     
  }

    else {
      cityList.pop();
      localStorage.setItem("cities", cityList);
    }
  recentSearchButtons();
}

function recentSearchButtons() {
  $("#searches").empty();
  buttons = localStorage.getItem("cities")
  console.log(buttons)
  var splitButtons = buttons.split(",")
  
  for (let i = 0; i < splitButtons.length; i++) {
    $("<input>")
      .attr("value", splitButtons[i])
      .attr("id", "city" + i)
      .attr("type", "submit")
      .attr("class", "cityButton")
      .appendTo("#searches")
    $("<br>")
      .appendTo("#searches")
  }
}

function UVIndex() {
  var queryURLUVIndex = "http://api.openweathermap.org/data/2.5/uvi?appid=abcef0450e4daf5019f05245f6fa3ff8&lat=" + lat + "&lon=" + lon  
  
  $.ajax({
    url: queryURLUVIndex,
    method: "GET"
  })
  .then(function(response) {
    // console.log(response)
    var UVI = $("#UVIndex").text("UV Index: " + response.value + "%");
    var UVII = parseInt(response.value);
    // console.log(UVII);
    if (UVII < 3) {
      $("#UVIndex").css({"background-color": 
    "green","color":"whitesmoke"})
    }

    else if ((UVII >= 3) && (UVI < 6)) {
      $("#UVIndex").css({"background-color": 
      "yellow","color":"whitesmoke"})
    }

    else if ((UVII >= 6) && (UVI < 7)) {
      $("#UVIndex").css({"background-color": 
      "orange","color":"whitesmoke"})
    }
    
    else if ((UVII >= 8) && (UVI < 10)) {
      $({"background-color": 
      "red","color":"whitesmoke"})
    }

    else if (UVII >= 11) {
      $({"background-color": 
      "purple","color":"whitesmoke"})
    }
  })
}