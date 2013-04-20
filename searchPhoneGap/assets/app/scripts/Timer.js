// Accepts a string of date and time when to trigger the event
// eg. of accepted full string "April 6,2013 10:20:00" 
// or 10:20:00

function at(time,callback){
    var now = new Date();
    var flag = false;
    var at = new Date(time)
    if (!(at.getTime() === at.getTime())) {
	at = new Date(now.toDateString() + " " + time);
	flag = true;
    }
    var millisecs = at - now;
    if (millisecs <= 0 && flag) {
	millisecs += 86400000;
    }
    console.log("Millisecs " + millisecs);
    if (millisecs > 0) {
	setTimeout(callback,millisecs);
    }
}
