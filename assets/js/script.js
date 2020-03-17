$(function () {

    function generateCardBody(city){
        return $("<h5 class='card-title' data-city='citi-name'>"  + city.name +  " (<span> " + moment().format('l') + " </span>)<img id='icon' src='http://openweathermap.org/img/wn/"+ city.icon +".png' alt='current weather icon'/></h5><div class='weather-info'><p class='temp'>Temperature: " + city.temp + " ºF</p><p class='hum'>Humidity: " + city.humidity + "%</p><p class='wind'>Wind Speed: " + city.wind + " MPH</p><p class='uv'>UV Index: <span><button id='uvindex' type='button' class='btn text-white'>" + city.uv + "</button></span></p></div>");
    }

    function generateFiveDay(forecast){
        return $("<div class='card weather-card'><div class='card-body pb-3'><h6 class='date'>"+ forecast.date +"</h6><div id='icondiv' class='d-flex justify-content-between'><img src='http://openweathermap.org/img/wn/"+ forecast.icon +".png'></i></div><p>Temp: "+forecast.temp+" </p><p>Humidity: " +forecast.humidity+"</p></div></div>");
    }

    function generateButton(city){
        return $("<button type='button' id='"+city+"' class='btn btn-outline-info btn-block text-grey lighten-3'>"+ city+"</button>");
    }

    $("#basic-text1").on("click", function(event){

        // the default action is to refresh the page
        event.preventDefault();

        $(".card-body").empty();
        $("#five-day-cards").empty();

        // grab the text inside the input field
        var searchCity = $("input").val();
        
        var cities = [];
        cities.push(searchCity);
        

        // set the queryURL with the proper search query 
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&units=imperial&appid=b5540c4c5b50c563c63c9a4c1e188656";

        // Make an ajax call to request the desired information for the city
        $.ajax({   
            url: queryURL,
            method: "GET",
            dataType: 'json',
            success: function (response1) {
                // console.log(response1);

                // Make a second ajax call to get the UV Index
               $.ajax({ 
                    url: 'http://api.openweathermap.org/data/2.5/uvi?appid=b5540c4c5b50c563c63c9a4c1e188656&lat=' + response1.coord.lat + '&lon=' + response1.coord.lon + '',
                    method: "GET",
                    dataType: 'json',
                    success: function (response2) {

                        // Create the city button on the left column
                        var cityButtonEl = generateButton(response1.name);

                        // Append the city button to the left column
                        $(".btn-group-vertical").append(cityButtonEl);

                        // Make a third ajax call to get the 5 days forecast
                        $.ajax({ 
                            url: 'http://api.openweathermap.org/data/2.5/forecast?q='+ response1.name +'&units=imperial&appid=b5540c4c5b50c563c63c9a4c1e188656',
                            method: "GET",
                            dataType: 'json',
                            success: function (response3) {

                                // console.log(response3);
                                // console.log(response3.list);
                                // console.log(response3.list[0].dt_txt);
                                // console.log(moment(response3.list[0].dt_txt).format('HH'));
                                 

                                // Check current hour
                                var currentHour = moment().format('HH');
                                // console.log(currentHour);
                                
                                var fiveDayArray = [];

                                for(var i=0; i<response3.list.length; i++) {
                                    // Get the hour of the day in the proper format
                                    var dayHour = moment(response3.list[i].dt_txt).format('HH');
                                    // If the hour is 6 am, get the element in the array
                                    if(dayHour === "06") {
                                        fiveDayArray.push(response3.list[i]);
                                    }

                                }

                                fiveDayForecast = [];

                                for(var i=0; i<fiveDayArray.length; i++){

                                    var forecast = {
                                        date: moment(fiveDayArray[i].dt_txt).format('MM/DD/YYYY'),
                                        icon: fiveDayArray[i].weather[0].icon,
                                        temp: fiveDayArray[i].main.temp,
                                        humidity: fiveDayArray[i].main.humidity    
                                    }

                                    fiveDayForecast.push(forecast);
                                }
                                var cityData = {
                                    name: response1.name,
                                    icon: response1.weather[0].icon,
                                    temp: response1.main.temp,
                                    humidity: response1.main.humidity,
                                    wind: response1.wind.speed,
                                    uv: response2.value
                                }
                                let merge = {
                                    cityData: cityData, 
                                    fiveDayForecast: fiveDayForecast
                                };
                                // console.log(merge);

                                localStorage.setItem(response1.name, JSON.stringify(merge));

                                cityName = cities.pop();
                                cityObj = JSON.parse(localStorage.getItem(cityName));

                                cardBodyEl = generateCardBody(cityObj.cityData);
                                $("#displaycity").append(cardBodyEl);

                                // Create the 5 day forecast elements and add the content
                                for (const dayForecast of cityObj.fiveDayForecast) {
                                    fiveDayForecastEl = generateFiveDay(dayForecast);
                                    // Append the 5 cards
                                    $("#five-day-cards").append(fiveDayForecastEl);
                                }
                                

                            } // end of success response 3
                        
                        }); // end of ajax call 3

                    } // end of success response 2

                }); // end of ajax call 2

            } // end of success response 1

        }); // end of ajax call 1

    }); // end of on click function

    $(".btn-group-vertical").on("click", function(event){
        $(".card-body").empty();
        $("#five-day-cards").empty();
        event.preventDefault();
        var name = event.target.id;
        
        cityObj = JSON.parse(localStorage.getItem(name));

        cardBodyEl = generateCardBody(cityObj.cityData);
        $("#displaycity").append(cardBodyEl);

        // Create the 5 day forecast elements and add the content
        for (const dayForecast of cityObj.fiveDayForecast) {
            fiveDayForecastEl = generateFiveDay(dayForecast);
            // Append the 5 cards
            $("#five-day-cards").append(fiveDayForecastEl);
        }
        
    })
        
}); // End of document ready  