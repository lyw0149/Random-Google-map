var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "map.html" );
});

/*
var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
*/
var port = 8081;
var io = require('socket.io').listen(app.listen(port));

//This generates random color code.
function randomColor() {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
};

function randomStyleGenerator() {

    var styles = [
      {
        featureType: 'water',
        stylers: [
          { color: randomColor() }
        ]
      },{
        featureType: 'administrative',
        elementType: 'labels.text.stroke',
        stylers: [
          { color: randomColor() },
          { weight: 6 }
        ]
      },{
        featureType: 'administrative',
        elementType: 'labels.text.fill',
        stylers: [
          { color: randomColor() }
        ]
      },{
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
          { color: randomColor() },
          { lightness: -40 }
        ]
      },{
        featureType: 'road.local',
        elementType: 'geometry.fill',
        stylers: [
          { color: randomColor() }
        ]
      },{
        featureType: 'transit.station',
        stylers: [
          { weight: 9 },
          { hue: randomColor() }
        ]
      },{
        featureType: 'road.highway',
        elementType: 'labels.icon',
        stylers: [
          { visibility: 'off' }
        ]
      },{
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [
          { lightness: 100 }
        ]
      },{
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
          { lightness: -100 }
        ]
      },{
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
          { visibility: 'on' },
          { color: '#f0e4d3' }
        ]
      },{
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
          { color: randomColor() },
          { lightness: -25 }
        ]
      }
    ];
    return styles;
};

io.sockets.on('connection', function (socket) {
	
	setInterval( function() {
		var styles = randomStyleGenerator();
		socket.emit('message', {msg: styles});
	}, 1000);
});

console.log("Listening on port " + port);