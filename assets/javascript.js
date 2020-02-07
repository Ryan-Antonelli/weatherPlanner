
var m = moment();
var mDate = m.format("MM-DD-YYYY")

$("#submit").click(function() {
    
    event.preventDefault();
    
    var cityRaw = $("#search").val();
    var city = cityRaw.replace(/\s/g,'');
    
    var queryURLWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=abcef0450e4daf5019f05245f6fa3ff8";
    
    var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&units=imperial&cnt=5&appid=abcef0450e4daf5019f05245f6fa3ff8";
    
    $("#search").empty();
    $("cityDateIcon").empty();

    $.ajax({
        url: queryURLWeather,
        method: "GET"
      })
      .then(function(response){
          console.log(response);
          // adds weather description to output area
          $("<h1 id='data'></h1>").text(cityRaw + "(" + mDate + ")")
            .appendTo("#cityDateIcon");
            //  if I want to capitalize the first letter
            // function capitalizeFirst(str) {
            //   return str.charAt(0).toUpperCase() + str.slice(1) 

          // adds weather icon to output area          
          $("<img id='wIcon' src='' alt='weather icon'>")
            .appendTo("#cityDateIcon");
          
          var iconCode = response.weather[0].icon;
          var iconurl = "http://openweathermap.org/img/w/" +    iconCode + ".png";
          $('#wIcon')
            .attr('src', iconurl);

      })

      // $.ajax({
      //   url: queryURLForecast,
      //   method: "GET"
      // })
})

