const request = require('request')

const forecastDisplay = (longitude, latitude, callback) => {
    const url = "https://api.darksky.net/forecast/1dc277c3a40a0aed2251a39e536f8d51/" + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
    
    request({url, json:true}, (error,{body}) => {
        if(error){
            callback('idinahoi',undefined)
        }else if(body.error ){
            callback('Idinahoi cykab lyat klasjeflkjsdapij;lk',undefined)
        }
        else{
            callback(undefined, body.daily.data[0].summary + 'It is currently ' + body.currently.summary + ' at a temperature of ' + body.currently.temperature)
        }
    })    

}
//when accessing APIs, the whole Json API key (when you click on the URL) is the body, then to access, you go to .(something)
//e.g when you want to access currently, time, you go to response.body.currently.time

module.exports = forecastDisplay
