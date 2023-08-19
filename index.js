const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const { error } = require("console");
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
const apiKey = 'e475e6dee2b06c910e4381b9f35a3e38';
var city;
var weather;

app.get('/', (req, res) => {
    res.render('index', { hello: 'Hello niggaer' });
});

app.post("/", (req, res) => {
    city = req.body.city;
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    axios.get(url).then(response => {
        console.log("Climate is " + response.data.weather[0].main + " and temperature is " + Math.round((response.data.main.temp) - 273.15) + " degree celcius");
        weather = {
            climate: response.data.weather[0].main,
            temp: Math.round((response.data.main.temp) - 273.15),
        };
        res.redirect('/weather');
    }).catch(err => {
        console.error(err);
        res.status(500).send("Error - fetching weather data");
    });

});

app.get('/weather', (req, res) => {
    res.json(weather);
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
