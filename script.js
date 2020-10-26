var apikey = "5a9330ff39aa4d71dda59e8146ab11fd";
var long;
var lat;
$("#saveCity").click(function () {
  var cityName = $("#cityName").val();

  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    apikey +
    "&units=imperial";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    //find longitude and latitude of city
    var long = response.coord.lon;
    var lat = response.coord.lat;
    console.log(long);

    //add city name to city data box
    var nameCity = response.name;
    $("#nameCity").html(nameCity);

    //add date
    var date = moment().format("LL");
    $("#currentDay").html(date);

    //Switch to one call to obtain results including uv index and forcast
    var query1URL =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      long +
      "&appid=" +
      apikey +
      "&units=imperial";

    $.ajax({
      url: query1URL,
      method: "GET",
    }).then(function (response) {
      //display city data
      console.log(response);

      var temp = response.current.temp;
      $("#temp").html("Temperature: " + temp + "°F");

      var humid = response.current.humidity;
      $("#humidity").html("Humidity: " + humid + "%");

      var wind = response.current.wind_speed;
      $("#wind-speed").html("Wind Speed: " + wind + "mph");

      var uvi = response.current.uvi;
      $("#UV").html("UV index: : " + uvi);

      //5 day forcast
      //<h4 id = "forcast-1">day 1</h4>
      //<i id ="icon">icon</i> <br>
      // <p id ="forcastTemp">temp</p>
      //<p id ="forcastHumid">humidity</p>
      //adding date to forcast cards
      var forcast_1 = moment().add(1, "days").format("L");
      var forcast_2 = moment().add(2, "days").format("L");
      var forcast_3 = moment().add(3, "days").format("L");
      var forcast_4 = moment().add(4, "days").format("L");
      var forcast_5 = moment().add(5, "days").format("L");

      $("#forcast-1").html(forcast_1);
      $("#forcast-2").html(forcast_2);
      $("#forcast-3").html(forcast_3);
      $("#forcast-4").html(forcast_4);
      $("#forcast-5").html(forcast_5);

      for (i = 1; i < 6; i++) {
        //getting and displaying the icon to forcast cards
        var iconCode = response.daily[i].weather[0].icon;
        var iconURL =
          "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
        $("#icon" + [i]).prepend("<img src=' " + iconURL + "'>");

        //adding the rest of the forcast weather data to cards
        var cardCondition = response.daily[i].weather[0].description;
        var cardHigh = Math.round(response.daily[i].temp.max);
        var cardLow = Math.round(response.daily[i].temp.min);
        var cardHumid = response.daily[i].humidity;

        $("#forcastCondition" + [i]).html(cardCondition);
        $("#forcastHigh" + [i]).html("High: " + cardHigh + "°F");
        $("#forcastLow" + [i]).html("Low: " + cardLow + "°F");
        $("#forcastHumid" + [i]).html("Humidity: " + cardHumid + "%");
      }
    });
  });
});
