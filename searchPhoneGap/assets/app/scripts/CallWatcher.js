function CallContext() {
 	
	CallWatcher.watch(function(result) {
				console.log("Result" + result.incoming);
    			if(result.incoming==2) {
    				var incoming = { type : 'incomingcall'};
    				incoming.number = result.number;
					recipes.dispatchEvent(incoming);}
				else if(result.incoming==1) {
    				var incoming = { type : 'offhook'};
    				incoming.number = result.number;
					recipes.dispatchEvent(incoming);}
				else if(result.incoming == 0) {
					console.log("Cutcall dispatched");
					var incoming = { type : 'cutcall'};
    				incoming.number = result.number;
					recipes.dispatchEvent(incoming);}
	})
}
var CallWatcher = {
	watch: function(callback) {
		return cordova.exec(function(result) {
			CallWatcher.incoming = result.incoming;
			CallWatcher.number = result.number;
			if(callback) {
				callback(result);
			}

		}, CallWatcher.fail, "CallWatcher", "watch", []);
	},
	incoming: false,
	number: ""
}