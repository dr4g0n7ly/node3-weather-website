const request = require('request')
const express = require('express')
const { append } = require('express/lib/response')
const path = require('path')

const app = express()
const hbs = require('hbs')
const { query } = require('express')

// const locationURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZHI0ZzBuN2x5IiwiYSI6ImNreXZ4ODN1MjAzMmIzMnFscG1zNnljMnUifQ.F7SJXTOep1RUWgFHDBJqAA&limit=1'
// const weatherURL = 'http://api.weatherstack.com/current?access_key=6bb1599dcea070e793013da418e5b431&query=37.8267,-122.4233'

// request({url:locationURL, json:true}, (error, response) => {
//     if(error) {
//         console.log(error)
//     } else {
//         const data = response.body.features[0].center
//         console.log('latitude: ' + data[1])
//         console.log('longitude: ' + data[0])
//     }
// })

// request({url:weatherURL, json:true}, (error, response) => {
//     if(error) {
//         console.log(error)
//     } else {
//         const data = response.body.current
//         console.log('\ntemperature: ' + data.temperature)
//     }
// })

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('main', {
        title: 'weather',
        name: 'nishanth pilli'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about page',
        name: 'nishanth pilli',
        age: 19,
        occupation: 'student'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'nishanth pilli',
        title: 'help page',
        text: 'hello people! this is text'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'address not provided'
        })
    }
    const locationURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + req.query.address + '.json?access_token=pk.eyJ1IjoiZHI0ZzBuN2x5IiwiYSI6ImNreXZ4ODN1MjAzMmIzMnFscG1zNnljMnUifQ.F7SJXTOep1RUWgFHDBJqAA&limit=1'
    console.log(req.query.address)
    console.log(locationURL)
    request({url:locationURL, json:true}, (error, response) => {
        if(error) {
            console.log(error)
            return res.send({
                error: error
            })
        }
        const data = response.body.features[0].center

        const weatherURL = 'http://api.weatherstack.com/current?access_key=6bb1599dcea070e793013da418e5b431&query=' + data[1] + ',' + data[0]
        request({url:weatherURL, json:true}, (error, response) => {
            if(error) {
                console.log(error)
                return res.send({
                    error: error
                })
            } else {
                const wdata = response.body
                return res.send({
                    location: wdata.location.name,
                    latitude: data[1],
                    longitude: data[0],
                    description: wdata.current.weather_descriptions,
                    temperature: wdata.current.temperature,
                    humidity: wdata.current.humidity,
                    wind: wdata.current.wind_speed
                })
            }
        })
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000\n')
})