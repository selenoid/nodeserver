var dispatcher = require('httpdispatcher');

//Lets require/import the HTTP module
var http = require('http');

//Lets define a port we want to listen to
const PORT=8080; 


//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});

//Lets use our dispatcher
function handleRequest(request, response){
    try {
        //log the request on console
        console.log("request: "+request.url);
        //Disptach
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

//For all your static (js/css/images/etc.) set the directory name (relative path).
dispatcher.setStatic('resources');

//A sample GET request    
dispatcher.onGet("/page1", function(req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
	
	var retval = {};
	var arr = ["ibrahim", "emre", "selen"];
	for (var i=0; i< arr.length; i++)
	{
		var item = arr[i];
		retval[item] = item;
	}
	
	var json = JSON.stringify(retval);
    res.end(json);
});    


dispatcher.onGet("/page2", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Page Two');
});  

//A sample POST request
dispatcher.onPost("/post1", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain','Access-Control-Allow-Origin': 'http://localhost:50188'});
	
	var retval = {};
    
    var itemsBoxEl0 = [0,0,0,0,0];
    var itemsBoxEl1 = [1];
    var itemsBoxEl2 = [2,2,2,2,2];
    var itemsBoxEl3 = [3,3,3,3,3];
    var itemsBoxEl4 = [4,4,4,4];
    var itemsBoxEl5 = [5];
    var itemsBoxEl6 = [6,6,6,6];
    var itemsBoxEl7 = [7,7,7];
    
    var itemBox = itemsBoxEl0.concat(itemsBoxEl1).concat(itemsBoxEl2).concat(itemsBoxEl3).concat(itemsBoxEl4).concat(itemsBoxEl5).concat(itemsBoxEl6).concat(itemsBoxEl7);
    
    function getRandomNumber() {
        return itemBox[(Math.floor(Math.random() * itemBox.length))];
    }

    function getRoll() {
        var nuRoll = [];

        function checkRoll() {
            if ((nuRoll.indexOf(1) > -1) || (nuRoll.indexOf(5) > -1)) {
				console.log("index:"+nuRoll.indexOf(1));
                return 0
            } else {
                return 1;
            }
        }

        function getNewRandom() {
            addElement();
        }

        function addElement() {
            var rnum = getRandomNumber();
            if (rnum == 5 || rnum == 1) {
                if (checkRoll() > 0) {
                    nuRoll[nuRoll.length] = rnum;
                } else {
                    getNewRandom();
                }
            } else {
                nuRoll[nuRoll.length] = rnum;
            }
        }

        for (var n = 0; n < 3; n++) {
            addElement();
        }

        return nuRoll;
    }
    
    retval["d"] = [[getRoll(), getRoll(), getRoll(), getRoll(), getRoll()].join(',')];
    var jsondata = JSON.stringify(retval);
	
	console.log("j:" +jsondata);
	
    res.end(jsondata);
});