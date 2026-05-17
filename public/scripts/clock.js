function updateClockTime() {
    const date = new Date();
    const clockOptions = {
        timeZone: 'America/New_York',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }, formatter = new Intl.DateTimeFormat([], clockOptions);
    var time = formatter.format(date);
    var hours = time.slice(0, 2);
    var minutes = time.slice(3, 5);
    var seconds = time.slice(6, 8);
    var milliseconds = date.getMilliseconds();
    document.getElementById("localTime").innerHTML = hours + ":" + minutes + ":" + seconds;
    try {
        document.getElementById("unixTime").innerHTML = Date.now().toString().slice(0, -3);
    } catch {}
	setTimeout("updateClockTime()", 1000 - milliseconds % 1000 );
}
function updateBeatTime() {
    const date = new Date();
    const clockOptions = {
        timeZone: 'Europe/Berlin',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }, formatter = new Intl.DateTimeFormat([], clockOptions);
    var milliseconds = date.getMilliseconds();
    var time = formatter.format(date);
    var timeInMs = parseInt(time.slice(0, 2)) * 3600000 + parseInt(time.slice(3,5)) * 60000 + parseInt(time.slice(6,8)) * 1000 + milliseconds;
    var centibeats = Math.floor(timeInMs / 864).toString().padStart(5, "0");
    var beats = centibeats.slice(0, 3) + "." + centibeats.slice(3, 5);
    document.getElementById("beatTime").innerHTML = beats;
    setTimeout("updateBeatTime()", 864 - timeInMs % 864 );
}