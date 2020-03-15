$(function () {
    
    $("#basic-text1").on("click", function(event){

        // the default action is to refresh the page
        event.preventDefault();
    
        // grab the text inside the input field
        var searchCity = $("input").val();

        // set the queryURL with the proper search query 
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=b5540c4c5b50c563c63c9a4c1e188656";

        // create a double ajax call to request the desired information for the city and the city uv index

        $.ajax({   
            url: queryURL,
            method: "GET",
            dataType: 'json',
            success: function (response1) {
                console.log(response1);

                // Make an ajax call to get the UV Index
               $.ajax({ 
                    url: 'http://api.openweathermap.org/data/2.5/uvi?appid=b5540c4c5b50c563c63c9a4c1e188656&lat=' + response1.coord.lat + '&lon=' + response1.coord.lon + '',
                    method: "GET",
                    dataType: 'json',
                    success: function (response2) {
                        console.log(response2);
                        // Create the card element to display in the body of the card
                        var cardBodyEl = $("<h5 class='card-title' data-city='citi-name'>"  + response1.name +  " (<span> " + moment().format('l') + " </span>)<img id='icon' src='http://openweathermap.org/img/wn/"+ response1.weather[0].icon +".png' alt='current weather icon'/></h5><div class='weather-info'><p class='temp'>Temperature: " + Math.floor((response1.main.temp * 9/5) - 459.67) + " ºF</p><p class='hum'>Humidity: " + response1.main.humidity + "%</p><p class='wind'>Wind Speed: " + response1.wind.speed + " MPH</p><p class='uv'>UV Index: <span><button id='uvindex' type='button' class='btn text-white'>" + response2.value + "</button></span></p></div>");

                        // Append element to the card
                        $("#displaycity").append(cardBodyEl);

                        // Save element in local storage
                        localStorage.setItem(response1.name, cardBodyEl);

                        // Create the city button on the left column
                        var cityButtonEl = $("<button type='button' class='btn btn-outline-info btn-block text-grey lighten-3'>"+ response1.name+"</button>");

                        // Append the city button to the left column
                        $(".btn-group-vertical").append(cityButtonEl);

                        // Make an ajax call to get the 5 days forecast
                        $.ajax({ 
                            url: 'http://api.openweathermap.org/data/2.5/forecast?q='+ response1.name +'&appid=b5540c4c5b50c563c63c9a4c1e188656&lat',
                            method: "GET",
                            dataType: 'json',
                            success: function (response3) {
                                console.log(response3);

                            } // end of success response 3
                            
                        }); // end of ajax call 3

                    } // end of success response 2

               }); // end of ajax call 2

            } // end of success response 1

        }); // end of ajax call 1

    }); // end of on click function
        
}); // End of document ready  