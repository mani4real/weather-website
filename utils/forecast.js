const request = require("request")

const forecast = (longitude, latitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=749d9ff2370058d07b90ce6c195aeeff&query=" + latitude + ',' + longitude + "&units=m"
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service!")
        } else if (body.error) {
            callback("Unable to find location")
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. but it feels like " +
                body.current.feelslike + " degrees out. " + "The humidity is currently " + body.current.humidity + ".")
        }
    })
}

module.exports = forecast