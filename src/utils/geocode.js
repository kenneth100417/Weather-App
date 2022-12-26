const request = require('request')


const geocode = (address, callback) =>{
    const url = 'http://api.positionstack.com/v1/forward?access_key=779030278f8838a0dba9070df64a8340&query=' + encodeURIComponent(address)

    request({url: url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to Location Services...', undefined)
        } else if (body.data.length === 0){
            callback('Unable to find location...', undefined)
        }else{
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].name+', '+body.data[0].country,
            })
        }
    })
}


module.exports = geocode
