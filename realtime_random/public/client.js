window.onload = function() {

	var socket = io.connect('http://localhost:8081');

	listeningMsg(socket);

	initMap();
};

function listeningMsg(socket) {
	socket.on('message', function (data) {
		changeMapStyle(data.msg);
	});
}