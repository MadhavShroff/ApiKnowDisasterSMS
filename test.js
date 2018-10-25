var http = require('http');

var authKey = `244589AX3oNa6cBo5bd1d7bc`

message1 = "Hi! Thanks for using KnowDisaster. You have successfully been registered.\n You will now recieve disaster relief info, like directions to the nearest Relief Camps or Shelters along with the Contact details of emergency relief teams, ie. phone numbers of Govt. and non-Govt relief agencies. To opt out, please visit KnowDisasterApp.azurewebsites.net/optOut. To know more, visit KnowDisasterApp.azurewebsites.net";

str = ''
http.get(`http://api.msg91.com/api/sendhttp.php?country=91&sender=KNODIS&route=4&mobiles=9000822514&authkey=244589AX3oNa6cBo5bd1d7bc&message=${message1}`,  (resp) => {
        resp.on("data", function (data) { str += data; });
        resp.on("end", async () => {
            console.log(str);
        });
    });