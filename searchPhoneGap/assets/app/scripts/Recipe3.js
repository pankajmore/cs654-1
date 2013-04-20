this.on('incomingsms',function(e){
	var number = "+919532835045";
	console.log("Number "+e.number + " Message "+e.message);
	if (e.number == number) {console.log("Number matched")};
	if (e.message.toLowerCase() == "where are you?") {console.log("Message matched")};
	if (e.number == number && e.message.toLowerCase() == "where are you?" ) {
		console.log("Message match success");
		trigger.location.current(function(position){ 
			console.log("Getting gps coordinates");
			alert("Latitude: "+position.coords.latitude+" Longitude: "+position.coords.longitude);})
			//trigger.sms.send(e.number,"Latitude: "+position.coords.latitude+" Longitude: "+position.coords.longitude)})
		}});