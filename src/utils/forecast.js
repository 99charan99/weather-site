const request = require('request')


const forecast = (lat,long,callback) =>{
    const url = "http://api.weatherstack.com/current?access_key=c121441416036c0f362eb6bb85e56ca7&query="+ lat +","+long+"&units=f"

    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("Error getting data from api",undefined)
        }else if(response.body.error){
            callback(response.body.error.type,undefined)
        }
        else{
        callback(undefined,response.body.current. weather_descriptions+". It is currently "+response.body.current.temperature  +" f but it feels like "+ response.body.current.feelslike + " f")
        }
    })
}

module.exports = forecast
