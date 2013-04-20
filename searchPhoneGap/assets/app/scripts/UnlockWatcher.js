function UnlockContext() {
    var incoming = { type : 'unlock'};
    UnlockWatcher.watch(function(result) {
	recipes.dispatchEvent(incoming);
    	});
    console.log("Unlock watcher added");
}
var UnlockWatcher = {
    watch: function(callback) {
	return cordova.exec(function(result) {
	    if(callback) {
		callback(result);
	    }
	    
	}, UnlockWatcher.fail, "UnlockWatcher", "watch", []);
    }
}
