const request  = require('postman-request')

const weather = (latitude, longitude, callback) =>
{
    const url = 'http://api.weatherstack.com/current?access_key=26c6de6ab1db5d452cab197e8c3119b0&query='+latitude+','+longitude

request ({
    url, json : true
},(error,{body}) => {
    if(error){
        callback("Web service not available", undefined)
    }
    else
    {
        if(body.error)
        {
            callback("Incorrect request parameters", undefined)
        }
        else
            {
                callback(undefined, {
                    summary : 'It is '+ body.current.weather_descriptions[0]+', and the temperature is '+
                    body.current.temperature + ' and it feels like ' +
                    body.current.feelslike + '. { Data recorded at '+ body.location.name + '@' + body.location.localtime +' }'
                })
        }
    }
})
}

module.exports = weather