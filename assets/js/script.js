$(function () {
    
    $("#basic-text1").on("click", function(event){

        // the default action is to refresh the page
        event.preventDefault();

        // grab the text inside the input field
        var searchCity = $("input").val();

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
                        // console.log(response2);
                        // Create the card element to display in the body of the card
                        var cardBodyEl = $("<h5 class='card-title' data-city='citi-name'>"  + response1.name +  " (<span> " + moment().format('l') + " </span>)<img id='icon' src='http://openweathermap.org/img/wn/"+ response1.weather[0].icon +".png' alt='current weather icon'/></h5><div class='weather-info'><p class='temp'>Temperature: " + response1.main.temp + " ºF</p><p class='hum'>Humidity: " + response1.main.humidity + "%</p><p class='wind'>Wind Speed: " + response1.wind.speed + " MPH</p><p class='uv'>UV Index: <span><button id='uvindex' type='button' class='btn text-white'>" + response2.value + "</button></span></p></div>");

                        // Append element to the card
                        $("#displaycity").append(cardBodyEl);

                        // Save element in local storage
                        localStorage.setItem(response1.name, cardBodyEl);

                        // Create the city button on the left column
                        var cityButtonEl = $("<button type='button' class='btn btn-outline-info btn-block text-grey lighten-3'>"+ response1.name+"</button>");

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

                                console.log(fiveDayArray);

                                for(var i=0; i<fiveDayArray.length; i++){

                                    // Create the 5 day forecast elements and add the content
                                    var fiveDayForecastEl = $("<div class='card weather-card'><div class='card-body pb-3'><h6 class='date'>"+ moment(fiveDayArray[i].dt_txt).format('MM/DD/YYYY') +"</h6><div id='icondiv' class='d-flex justify-content-between'><img src='http://openweathermap.org/img/wn/"+ fiveDayArray[i].weather[0].icon +".png'></i></div><p>Temp: "+fiveDayArray[i].main.temp+" </p><p>Humidity: " +fiveDayArray[i].main.humidity+"</p></div></div>");

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
        
}); // End of document ready  