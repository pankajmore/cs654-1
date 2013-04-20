/**
 * HeadsetWatcher plugin for Cordova/Phonegap
 *
 * Copyright (c) Triggertrap Ltd. 2012. All Rights Reserved.
 * Available under the terms of the MIT License.
 * 
 */
function HeadsetContext() {
 	var hPlugged = { type: 'headsetplug' } ;
	var hUnplugged = { type : 'headsetunplug'};	
	HeadsetWatcher.watch(function(result) {
    			if(result.plugged) {
    				console.log("Received Event: headsetplug");
					recipes.dispatchEvent(hPlugged);
    			} else {
    				console.log("Received Event: headsetunplug");
      				recipes.dispatchEvent(hUnplugged);
    		}})
}
var HeadsetWatcher = {
	watch: function(callback) {
		return cordova.exec(function(result) {
			HeadsetWatcher.plugged = result.plugged;
			if(callback) {
				callback(result);
			}

		}, HeadsetWatcher.fail, "HeadsetWatcher", "watch", []);
	},
	plugged: false
}