const request = require('request');

const forecast=(latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/c3ef23a0defbfcba15fbc4b00a25debd/'+latitude+','+longitude
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to server',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined, body.daily.data[0].summary +' '+'it is currently '+ body.currently.temperature+ '. The high today is'+body.daily.data[0].temperatureHigh +' and low is '+body.daily.data[0].temperatureLow +' degree out there. ' +'  '+body.currently.precipProbability+'% chance of rain'
            )
        }


    })
}
module.exports=forecast