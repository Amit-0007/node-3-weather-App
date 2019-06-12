const request = require('request');

const geoCode = (adress, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1IjoiYW1pdC0wMDciLCJhIjoiY2p3bmY1d24zMWdlMDN6cDY2NHlraTJtdyJ9.IEGePhqKP9Eqg8c1NHlMXA'
    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('unaUnable to connect to server', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })

        }
    })
}
module.exports = geoCode