const express = require('express');
const app = express();
const mongoose = require('mongoose');
const https = require('https')

const dburl = process.env.MONGODB_URL || 'mongodb://cfd-account:lTaqvuxCfztEPLrfIfW69MRm2o74qEFeGtH4j19Byn90z7jgGTUZCueKJynPTXuArHnuqdd1ivc2bWUEcEGiGQ==@cfd-account.documents.azure.com:10255/?ssl=true&replicaSet=globaldb';
var str = "Not Connected";
var SMSAuthKey = process.env.SMS_AUTH_KEY || '244589AX3oNa6cBo5bd1d7bc';

// ******************* Connecting to database : 

mongoose.connect(dburl, { useNewUrlParser: true }).then( () => {
	console.log('Connected');
	str = 'Connected';
}).catch(err => {
	console.log("Connection to Mongo Failed");
	str = 'Not Connected';
});

const nameAndLocationObject = mongoose.Schema({
	number: String, 
	location: String,
	lat: String,
	long: String,
});

message1 = "Hi! Thanks for using KnowDisaster. You have been registered successfully. You will now recieve disaster relief info, like directions to the nearest Relief Camps or Shelters along with the Contact details of emergency relief teams, ie. phone numbers of Govt. and non-Govt relief agencies, at the time of a crisis. Do update your location as frequestly as possible. Get real time disaster occourance probabilities and Current weather info, and directions to relief centres at KnowDisasterApp.azurewebsites.net. To opt out, please visit KnowDisasterApp.azurewebsites.net/optOut";

const NALO = mongoose.model('nameAndLocationObject', nameAndLocationObject);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
	res.send(`<h1>SMS API for KnowDisaster</h1></br><p>${str} to MongoDB`);
});

app.get('/api/sendMessage1/:id', (req, res) => {
	string = ''
	http.get(`http://api.msg91.com/api/sendhttp.php?country=91&sender=KNODIS&route=4&mobiles=${req.params.id}&authkey=244589AX3oNa6cBo5bd1d7bc&message=${message1}`,  (resp) => {
        resp.on("data", function (data) { string += data; });
        resp.on("end", async () => {
            console.log(string);
        });
    });
    res.send(string);
});


app.get('/api/show/', async (req, res) => {
	const someObj = await NALO.where({ '__v' : { $gte: 0 }});
	res.send(`${someObj}`);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
})
