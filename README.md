# Weather Dashboard

This weather dashboard uses server-side APIs to get up-to-date weather information for a specific city.
In this case, we use the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities.
In the background, we make requests with specific parameters to a URL to retrieve the data from another application's API.
This weather dashboard runs in the browser and it dynamically updates HTML and CSS with Javascript.
The information retrived for a specific city is saved in `localStorage` to store the data and make it persistent.
This weather dashboard is perfect for a person traveling domestically or internationally that want to see the weather outlook for multiple cities.
This weather dashboard allows a traveler to plan a trip accordingly.

## Features:

* This weather dashboard has form inputs.
* When the user searchs for a city, it is presented with current and future conditions for that city.
* The city presented is added to the search history.
* The view of current weather conditions for a city shows:
    * the city name, 
    * the date, 
    * an icon representation of weather conditions, 
    * the temperature, 
    * the humidity, 
    * the wind speed, and 
    * the UV index.
* The view of the UV index is presented with a color that indicates whether the conditions are: 
    * favorable, 
    * moderate, or 
    * severe.
* The view of future weather conditions for a city shows a 5-day forecast that displays: 
    * the date, 
    * an icon representation of weather conditions, 
    * the temperature, and 
    * the humidity
* When the user clicks on a city in the search history, the current and future conditions for that city are shown.
* When the user opens the weather dashboard, the last searched city forecast is shown.

## Screenshot:

[`Screenshot Weather Dashboad`](https://github.com/tomaspz/weather-dashboard/blob/master/assets/img/screenshot_weather-dashboard.png)

## URL of the deployed application:

https://tomaspz.github.io/weather-dashboard/

## URL of the GitHub repository:

https://github.com/tomaspz/weather-dashboard

