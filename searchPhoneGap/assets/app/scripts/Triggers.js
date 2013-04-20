/*
Copyright (C) 2011 by Pierre-Yves Orban

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

cordova.define("cordova/plugin/triggers", function(require, exports, module) {
    var exec = require('cordova/exec');
    
    /**
     * Check if the device has a possibility to send and receive SMS
     */
    var Sms = function() {};
    var Device = function () {};
    var Loc = function () {};
    var Flight = function () {};
    function Media() {
    	this.my_media = null;};
    var succCallback = function(c) { console.log("Success "+c); };
    var failCallback = function(c) { console.log("Fail "+c); };
    
    //
    
    Media.prototype.play = function playAudio(src) {
            // Create Media object from src
            //my_media = new Media(src, onSuccess, onError)

            // Play audio
            //my_media.play();

        }
    Flight.prototype.on = function(successCallback,failureCallback) {
	var s = succCallback
	var f = failCallback
	if (successCallback) { s = successCallback };
	if (failureCallback) { f = failureCallback };
	return exec(s, f, 'FlightPlugin', 'on', []);
    }
    
    Flight.prototype.off = function (successCallback,failureCallback) {
	var s = succCallback
	var f = failCallback
	if (successCallback) { s = successCallback };
	if (failureCallback) { f = failureCallback };
	return exec(s, f, 'FlightPlugin', 'off', []);
    }
    Loc.prototype.current = function(callback,error){
	if(!error){
            error =  function() {console.log("Getting location failed")};
	}
	navigator.geolocation.getCurrentPosition(callback, error);
    }
    
    Device.prototype.flight = new Flight();
    
    Device.prototype.adjust= function(level, successCallback,failureCallback) {
	var s = succCallback
	var f = failCallback
	if (successCallback) { s = successCallback };
	if (failureCallback) { f = failureCallback };
	return exec(s, f, 'Setvolume', 'adjust', [level]);
    }
    //
    
    Device.prototype.silent = function(successCallback,failureCallback) {
	var s = succCallback
	var f = failCallback
	if (successCallback) { s = successCallback };
	if (failureCallback) { f = failureCallback };
	return exec(s, f, 'RingerPlugin', 'silent', []);
    }
    Device.prototype.normal = function(successCallback,failureCallback) {
	var s = succCallback
	var f = failCallback
	if (successCallback) { s = successCallback };
	if (failureCallback) { f = failureCallback };
	return exec(s, f, 'RingerPlugin', 'normal', []);
    }
    Device.prototype.vibrate = function(successCallback,failureCallback) {
	var s = succCallback
	var f = failCallback
	if (successCallback) { s = successCallback };
	if (failureCallback) { f = failureCallback };
	return exec(s, f, 'RingerPlugin', 'vibrate', []);
    }
    Device.prototype.play =  function(src) {
            // Create Media object from src
            var my_media = new Media(src, function(){console.log("playAudio():Audio Success");}, function(e){console.log("Failure")});

            // Play audio
            my_media.play();
            console.log("Music play function");

        	}
    Sms.prototype.isSupported = function(successCallback,failureCallback) {
	var s = succCallback
	var f = failCallback
	if (successCallback) { s = successCallback };
	if (failureCallback) { f = failureCallback };
	return exec(s, f, 'SmsSendingPlugin', 'HasSMSPossibility', []);
    }
    Sms.prototype.send = function(phone, message, successCallback,failureCallback) {
	var s = succCallback
	var f = failCallback
	if (successCallback) { s = successCallback };
	if (failureCallback) { f = failureCallback };
	return exec(s, f, 'SmsSendingPlugin', 'SendSMS', [phone, message]);
    }
    var Trigger = function() {};
    Trigger.prototype.sms = new Sms();
    Trigger.prototype.device = new Device();
    //Trigger.prototype.location = new Loc();
    //Trigger.prototype.media = new Media();
    var trigger = new Trigger();
    module.exports = trigger;
});
