const request  = require('postman-request')


const geolocation = (address, callback) =>
{
const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic2F1cmFiaDU2OTIiLCJhIjoiY2thNXN5NWdvMDBhbjJzczNqNWI3bXk3byJ9.5j5z0wdE_iPOP3RSuc0xbA&limit=1'

request({
    url , json : true, 
},(error, {body}) =>
{
    if(error){
    callback("Web service not available", undefined)
    }
    else
    {
        if(body.features.length === 0)
        {
            callback("Incorrect request parameters", undefined)
        }
        else
            {
                callback(undefined, { 
                    longitude : body.features[0].center[0],
                    latitude : body.features[0].center[1],
                    location : body.features[0].place_name
                })
            }
    }
})
}

module.exports = geolocation