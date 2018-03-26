const request = require('request');

var getWeather = (lat, lng, callback) =>
{
	request({
		url: `https://api.darksky.net/forecast/1b213eccde41fb93b16a5f753ca3546b/${lat},${lng}`,
		json: true
	}, (error, response, body) =>
	{
		if(!error && response.statusCode === 200)
		{
			callback(undefined, 
			{
				temperature: body.currently.temperature,
				apparentTemperature: body.currently.apparentTemperature
			});
		}
		else
		{
			callback('Unable to fetch weather.');
		}
	});
};

module.exports.getWeather = getWeather;