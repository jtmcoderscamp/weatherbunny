import "./userInterface/weather-presentation.css";
import LocationSource from "./locationSource/LocationSource";
import WeatherSource from "./weatherSource/WeatherSource";
import WeatherPresentation from "./userInterface/WeatherPresentation";
import CityInputForm from "./userInterface/CityInputForm";

export default class App {
    static get WEATHER_CONTAINER() {
        return document.querySelector('.weather-presentation-container');
    }

    async start() {
        const weather = await this._checkWeather();

        this._addEventListenerOnDocumentReady(weather, this._onDocumentReady);
    }

    _addEventListenerOnDocumentReady(weather, callback) {
        if (document.readyState === "complete" || document.readyState === "interactive") {
            setTimeout(callback(weather), 1);
        } else {
            document.addEventListener("DOMContentLoaded", callback(weather));
        }
    }

    _onDocumentReady(weather) {
        let weatherPresentation = new WeatherPresentation(App.WEATHER_CONTAINER, weather);
        let cityInputForm = new CityInputForm(weatherPresentation);
    }

    async _checkWeather() {
        const weatherAPI = new WeatherSource('https://api.openweathermap.org/data/2.5/', '953349aaa2569f9cd4821f8c2ffda23a');
        const location = await this._checkLocation();
        
        return weatherAPI.getCurrentWeather(location);
    }

    async _checkLocation() {
        const locationSource = new LocationSource();

        return locationSource.checkLocation();
    }
}