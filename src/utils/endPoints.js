// API endpoints
const httpMethods = {
    post: 'POST',
    get: 'GET',
    delete: 'DELETE',
    put: 'PUT',
};
export const ENDPOINTS = Object.freeze({
    getHourlyWeather:{
        url:'https://api.openweathermap.org/data/2.5/forecast',
        method: httpMethods.get
    },
    getCurrentWeather:{
        url:'https://api.openweathermap.org/data/2.5/weather',
        method: httpMethods.get
    },
});