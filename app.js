const express = require("express");
const https = require("https"); 
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");

})
app.post("/",function(req,res){
    const query = req.body.cityName;
    const apiKey = "ddd46e3595aecd70f533bf1ac64aa706";
    const unit = "metric" ;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    https.get(url, function(response){
    console.log(response.statusCode)
    response.on("data",function(data){
    const weatherData = JSON.parse(data)
    const tempe = weatherData.main.temp
    const desc = weatherData.weather[0].description
    const icon = weatherData.weather[0].icon
    const imgURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
    res.write("<p>The weather is currently "+ desc+"<p>");
    res.write("<h1>The temprature in "+query+" is "+ tempe +" degrees Celcius.</h1>");
    res.write("<img src="+imgURL+">");
    res.send();
    });

});
})





app.listen(3000, function(){
    console.log("Sv on in port 3000.")
})