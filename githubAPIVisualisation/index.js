//Express Library import
const express = require('express');

//Axios library import, allows HTTP requests
const axios = require('axios');

//Dotenv library import, ensures code kept secret
const dotenv = require('dotenv');
dotenv.config();

//Client ID and specific client secret
//received when authorisation registered
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

//Express application creation, used to manage files
//inside public directory
const app = express();
app.use(express.static(__dirname + '/public'));

app.get('/oauth/redirect', (req, res) => {
	//Req.query object that has params we want -> code param.
	const requestToken = req.query.code;
	axios({
		//POST request call
		method: 'post',
		//Call to the Github authentication API, with the client ID, client secret made
		// and request token
		url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
		//Change content type header to JSON
		headers: {
			accept: 'application/json'
		}
	}).then((response) => {
		//Take access token from response
		const accessToken = response.data.access_token;
		//Transfer to main graph page
		res.redirect(`/home.html?access_token=${accessToken}`);
	});
});
//Server set to port 8080 local host
app.listen(8080);
