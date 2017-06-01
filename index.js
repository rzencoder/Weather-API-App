/*Weather API app for Free Code Camp. API from openweathermap.org*/

/*Only works over http (NOT https).*/

$(document).ready(function() {

  //get lat and long from browser using geolocation
  var lat;
  var long;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      long = position.coords.longitude;

      //get api with users lat and long
      var api = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=4051c3320878c4032c9609a13fa653eb';
      //get json from api
      $.getJSON(api, function(info) {
        var tempC = kToC(info.main.temp);
        var tempF = kToF(info.main.temp);
        //access info from json and display in html
        $(".location").html(info.name);
        $(".country").html(info.sys.country);
        $("#weather").html(info.weather[0].main);
        $("#tempC").html(tempC + "°C");
        $("#wind").html(info.wind.speed + "mph");
        //function to convert °C to °F on button click
        var counter = 1;
        $(".btn").on("click", function() {

          if (counter === 0) {
            $("#tempC").html(tempF + "°F");
            counter = 1;
            $(".btn").html("Change to °C");
          } else {
            $("#tempC").html(tempC + "°C");
            counter = 0;
            $(".btn").html("Change to °F");
          }
        });
        
          //conversion functions
  function kToC(kelvin) {
    return Math.round(kelvin - 273.15);
  }

  function kToF(kelvin) {
    return Math.round(kelvin * 9 / 5 - 459.67);
  }
        //background change on temperature change 
        if (tempC > 35) {
          $("body").css("background", "linear-gradient(60deg, #800000, #e60000)");
        } else if (tempC > 28) {
          $("body").css("background", "linear-gradient(60deg, #b34700, #ff751a)");
        } else if (tempC > 21) {
          $("body").css("background", "linear-gradient(60deg, #ff9933, #ffd633)");
        } else if (tempC > 14) {
          $("body").css("background", "linear-gradient(60deg, #59b300, #99e600)");
        } else if (tempC > 7) {
          $("body").css("background", "linear-gradient(60deg, #4dffc3, #00e6e6)");
        } else if (tempC > 0) {
          $("body").css("background", "linear-gradient(60deg, #0066ff, #0033cc)");
        } else {
          $("body").css("background", "linear-gradient(60deg, #505050 , #202020 )");
        }
      });
    });
  }
});