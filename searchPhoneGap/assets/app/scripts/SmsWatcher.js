function SmsContext() {
    var incoming = { type : 'incomingsms'};
    SmsWatcher.watch(function(result) {
	incoming.number = result.number;
	incoming.message = result.message;
	recipes.dispatchEvent(incoming);
	console.log("Sms received event");
    	});
    console.log("Sms watcher added");
}
var SmsWatcher = {
    watch: function(callback) {
	return cordova.exec(function(result) {
	    SmsWatcher.number = result.number;
	    SmsWatcher.message = result.message;
	    if(callback) {
		callback(result);
	    }
	    
	}, SmsWatcher.fail, "SmsWatcher", "watch", []);
    },
    message: "",
    number: ""
}
