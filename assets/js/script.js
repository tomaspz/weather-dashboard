$(function () {
    
    $("#basic-text1").on("click", function(event){

        // the default action is to refresh the page
        event.preventDefault();
    
        // grab the text inside the input field
        var searchCity = $("input").val();
        // var cityLat =
        // var cityLong = 

        // set the queryURL with the proper search query 
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=b5540c4c5b50c563c63c9a4c1e188656";
        // var uvIndex = "http://api.openweathermap.org/data/2.5/uvi?appid=b5540c4c5b50c563c63c9a4c1e188656&lat=" + response.coord.lat + "&lon=" + response.coord.lon + "";

        // create an ajax call to request the desired information for the city

        $.ajax({   
            url: queryURL,
            method: "GET",
            dataType: 'json',
            success: function (response1) {
                console.log(response1);
               $.ajax({ 
                    url: 'http://api.openweathermap.org/data/2.5/uvi?appid=b5540c4c5b50c563c63c9a4c1e188656&lat=' + response1.coord.lat + '&lon=' + response1.coord.lon + '',
                    method: "GET",
                    dataType: 'json',
                    success: function (response2) {
                     console.log(response2);
                     
                     
                    }
               });
            }
        });
        
    

        //         // // Create the elements to display in the card
        //         // var cardHeaderEl = $("<h5 class='card-title' data-city='citi-name'>"  + response.name +  " (<span> " + moment().format('l') + " </span>)<span><i>" + response.weather.icon + "</i></span></h5>");

        //         // var cardBodyEl = $("<div class='weather-info'><p class='temp'>Temperature: " + Math.floor((response.main.temp * 9/5) - 459.67) + " ºF</p><p class='hum'>Humidity: " + response.main.humidity + "%</p><p class='wind'>Wind Speed: " + response.wind.speed + " MPH</p><p class='uv>UV Index: <span><button id='uvindex' type='button' class='btn text-white'>" + ultraviolet + "</button></span></p></div>");

        //         // // Append elements
        //         // $(".card-body").append(cardHeaderEl, cardBodyEl);
        //     });
        // }

        // $.ajax({
        //     url: queryURL,
        //     method: "GET"
        //   }).then(function(response){
            // console.log(response.name);
            
            // Get the UV index URL + make an ajax call + get the uv index

            // $.ajax({
            //     url: uvIndex,
            //     method: "GET"
            //   }).then(function(uv){
            //     return uv.value;
            // });

        

            
            
        
            
            
        

    });

}); // End of document. ready




/*  
    $.when( getCityInfo(searchCity),
            getUVInfo(lat, lon)
          ).done(function(searchCityArg, latArg, lonArg){
        var allResponses = [].concat(searchCityArg[0]).concat(latArg[0]).concat(lonArg[0]);
        showTweets(allResponses);
          });
    
   
    
    var getCityInfo = function(city){
        var url='https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=b5540c4c5b50c563c63c9a4c1e188656';
        return $.get(url, {count:5}, null, 'jsonp');
    }
    
    var getUVInfo = function(lat, lon){
        $.each(tweets, function(){
            $("#tweets").append( '<li class="'+ this.user.screen_name+'">' +
                                 this.user.screen_name +': ' + this.text + '</li>' );
        });
    };
    
*/
