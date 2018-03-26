const yargs = require('yargs');
const axios = require('axios');

const argv = yargs.options(
{
	a:
	{
		demand: true,
		alias: 'address',
		describe: 'Address to fetch weather for',
		string: true
	}
})
.help()
.alias('help', 'h')
.argv;

var encodedAddress = encodeURIComponent(argv.address);

var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyCY5oUT3AvP25D9qDiXQEH1Nril0KQa078`;

axios.get(geocodeURL).then((response) => {
	if(response.data.status === 'ZERO_RESULTS'){
		throw new Error('Unable to find that address.');
	}

	var lat = response.data.results[0].geometry.location.lat;
	var lng = response.data.results[0].geometry.location.lng;
	var weatherURL = `https://api.darksky.net/forecast/1b213eccde41fb93b16a5f753ca3546b/${lat},${lng}`;	
	console.log(response.data.results[0].formatted_address);
	return axios.get(weatherURL);	
}).then((response) => {
	var temperature = response.data.currently.temperature;
	var apparentTemperature = response.data.currently.apparentTemperature;
	console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
}).catch((e) => {
	if(e.code === 'ENOTFOUND'){
		console.log('Unable to connect to APIO servers.');
	} else {
		console.log(e.message);
	}
});
