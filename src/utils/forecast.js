const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=9c9181e5e957303b3d7a334b915e58ae&query='+latitude+','+longitude+'&units=m'

    request({url, json: true}, (error, {body}) =>{
        if(error){
            callback('Unable to connect to weather service...', undefined)
        }else if(body.error){
            callback('Unable to find location..')
        }else{
            callback(undefined, body.current.weather_descriptions[0]+'. It is currently '+ body.current.temperature + ' degrees celcius but it feels like '+body.current.feelslike+' degrees celcius.')
        }
    })

}

module.exports = forecast