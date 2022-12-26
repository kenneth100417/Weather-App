const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const cors = require('cors')




const app = express()
const port = process.env.PORT || 3000

app.use(cors())

//define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Kenneth Gisalan'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Kenneth Gisalan'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help',
        name: 'Kenneth Gisalan'
    })
})


app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'Provide an address!'
        })
    }
    

    geocode(req.query.address, (error, { latitude, longitude, location } = {} ) =>{
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) =>{
            if(error){
                return res.send({error})
            }

            res.send({ 
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) =>{
    if(!req.query.search){
        return res.send({
            error: 'Provide search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Kenneth Gisalan',
        errorMessage: 'Help Article not found!'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Kenneth Gisalan',
        errorMessage: 'Page not Found!'
    })
})

app.listen(port, () =>{
    console.log('Server is up on port '+ port)
})