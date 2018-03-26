var request = require('request');

var geocodeAddress = (address) => {

	return new Promise((resolve, reject) => {
		var encodedAddress = encodeURIComponent(address);

		request(
		{
			url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyCY5oUT3AvP25D9qDiXQEH1Nril0KQa078`,
			json: true
		}, (error, response, body) =>
		{
			if(error)
			{
				reject('Unable to connect to Google servers.');
			}
			else if(body.status === 'ZERO_RESULTS')
			{
				reject('Unable to find that address.');
			}
			else if(body.status === 'OK')
			{
				resolve(
				{
					address: body.results[0].formatted_address,
					latitude: body.results[0].geometry.location.lat,
					longitude: body.results[0].geometry.location.lng
				});
				// console.log(`Address: ${body.results[0].formatted_address}`);
				// console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
				// console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
			}
		});
	});

	
};

geocodeAddress('123456890').then((location) => {
	console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
	console.log(errorMessage);
})