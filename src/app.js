const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("../utils/geocode.js")
const forecast = require("../utils/forecast.js")

const app = express()
const publicDirectoryPath = express.static(path.join(__dirname, '../public'))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set("views", viewsPath)
app.use(publicDirectoryPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render("index", {
        title: 'Weather App',
        name: 'Mani'
    })
})

app.get('/about', (req, res) => {
    res.render("about", {
        title: 'About Me',
        name: 'Mani'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide a search term!"
        })
    }
    console.log()
    geocode(req.query.address, (error, { latitude, longitude, place_name } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(longitude, latitude, (error, forcastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forcastData,
                location: place_name
            })
        })
    })
})

app.get('/help', (req, res) => {
    res.render("help", {
        title: 'Help',
        helpText: 'dope helpful text',
        name: 'Mani'
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "mani",
        errorMessage: "Help article not found!"
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "mani",
        errorMessage: "Page not found!"
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000")
})