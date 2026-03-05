async function loadElement(filename, elementid) {
    try {
        if (filename == null || filename.length == 0) {
            throw new Error("filename not specified.");
        }
        if (elementid == null || elementid.length == 0) {
            throw new Error("elementid not specified.");
        }
        const element = document.getElementById(elementid);
        if (element == null) {
            throw new Error("elementid does not exist within the document.");
        }
        const res = await fetch("/elements/" + filename);
        if (!res.ok) {
            element.innerHTML = "<span class='danger'>Element failed to load.</span>";
            throw new Error("Failed to fetch element.");
        }
        element.innerHTML = await res.text();
    } catch (error) {
        console.error(error);
    }
}

async function registerHit() {
    try {
        const res = await fetch("https://aivi.party/services/hit-counter");
        if (!res.ok) {
            throw new Error("Failed to fetch.");
        }
        const resJSON = await res.json();
        const hits = resJSON.hits;
        console.log(hits);
    } catch (error) {
        console.error(error);
    }
}

function updateGreeting() {
    const hour = new Date().getHours();
    const greeting = document.getElementById("greeting");
    if (hour >= 4 && hour < 12) {
        greeting.innerHTML = "good morning,";
    } else if (hour >= 12 && hour < 19) {
        greeting.innerHTML = "good afternoon,";
    } else {
        greeting.innerHTML = "good evening,";
    }
}

function updateFunTitle() {
    const titles = [
        "not actually a party",
        "open for maintenance",
        "lorem ipsum or something",
        "population: 1",
        "open 24 hours",
        "a realm of purple",
        "a soapbox of sorts",
        "come here often?",
        "make websites, not war",
        "yet another web corner",
        "take a moment and relax",
        "i hope you like purple",
        "cringe culture is dead",
        "reclaim the internet",
        "css fears me",
        "powered by stackoverflow",
        "this site uses no cookies",
        "#1 webkit hater",
        "a quiet corner of the internet",
        "200 ok",
        "internet participation award",
        "a web-browsing rest stop",
        "my home on the internet",
        "a shout into the void",
        "dear internet stranger,",
        "@everyone",
        "greetings, traveller",
        "welcome, stranger",
        "howdy, surfer of the web",
        "one of the sites of all time",
        "independent webber",
        "{funTitle}",
        "~$ cat intro.txt",
        "something in cyberspace"
    ];
    // document.getElementById("funTitle").innerHTML = titles[titles.length - 1];
    document.getElementById("funTitle").innerHTML = titles[Math.floor(Math.random() * titles.length)];
}

async function updateDiscord() {
    const presenceLabel = document.getElementById("presenceLabel");
    const presenceIcon = document.getElementById("presenceIcon");
    const statusLabel = document.getElementById("statusLabel");
    const statusDateLabel = document.getElementById("statusDateLabel");
    const discordSection = document.getElementById("discordSection");
    try {
        const res = await fetch("https://aivi.party/services/discord-status");
        if (!res.ok) {
            presenceLabel.innerHTML = "api error";
            presenceLabel.className = "danger";
            presenceIcon.className = "icon inline-left danger";
            presenceIcon.src = "/assets/icons/error.png";
            statusLabel.innerHTML = "<small>status unavailable</small>"
            statusDateLabel.innerHTML = "";
            discordSection.className = "danger";
            throw new Error("Failed to fetch.");
        }
        const resJSON = await res.json();
        const presence = resJSON.data.discord_status;
        if (presence == "online") {
            presenceLabel.innerHTML = "online";
            presenceLabel.className = "success";
            presenceIcon.className = "icon inline-left success";
            presenceIcon.src = "/assets/icons/online.png";
            discordSection.className = "success";
        } else if (presence == "idle") {
            presenceLabel.innerHTML = "idle";
            presenceLabel.className = "warning";
            presenceIcon.className = "icon inline-left warning";
            presenceIcon.src = "/assets/icons/idle.png";
            discordSection.className = "warning";
        } else if (presence == "dnd") {
            presenceLabel.innerHTML = "do not disturb";
            presenceLabel.className = "danger";
            presenceIcon.className = "icon inline-left danger";
            presenceIcon.src = "/assets/icons/dnd.png";
            discordSection.className = "danger";
        } else if (presence == "offline") {
            presenceLabel.innerHTML = "offline";
            presenceLabel.className = "danger";
            presenceIcon.className = "icon inline-left danger";
            presenceIcon.src = "/assets/icons/offline.png";
            discordSection.className = "danger";
        }
        if (resJSON.data.activities.length != 0) {
            const status = resJSON.data.activities['0'].state;
            const statusDate = resJSON.data.activities['0'].created_at;
            const clockOptions = {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
            }, formatter = new Intl.DateTimeFormat([], clockOptions);
            statusLabel.innerHTML = status;
            statusDateLabel.innerHTML = formatter.format(new Date(statusDate));
        } else {
            statusLabel.innerHTML = "<small>no status set rn :3</small>"
            statusDateLabel.innerHTML = "";
        }
    } catch (error) {
        console.error(error);
    }
    setTimeout("updateDiscord()", 10000);
}

async function updateLastfm() {
    const titleLabel = document.getElementById("titleLabel");
    const artistLabel = document.getElementById("artistLabel");
    const albumLabel = document.getElementById("albumLabel");
    const musicSection = document.getElementById("musicSection");
    const artFilter = document.getElementById("artFilter");
    const linkLabel = document.getElementById("linkLabel");
    const playingLabel = document.getElementById("playingLabel");
    const musicIcon = document.getElementById("musicIcon");
    try {
        const res = await fetch("https://aivi.party/services/last-played");
        if (!res.ok) {
            titleLabel.innerHTML = "";
            artistLabel.innerHTML = "<span class='danger'><img class='icon inline-left' src='/assets/icons/error.png'>api error</span>";
            albumLabel.innerHTML = "";
            musicSection.style.removeProperty("background-image");
            artFilter.hidden = true;
            musicSection.className = "danger";
            linkLabel.removeAttribute("href");
            playingLabel.innerHTML = "last played";
            musicIcon.style.animation = "none";
            throw new Error("Failed to fetch.");
        }
        const resJSON = await res.json();
        const latest = resJSON.recenttracks.track[0];
        var title = latest.name;
        var artist = latest.artist["#text"];
        var album = latest.album["#text"];
        const albumArt = latest.image[2]["#text"];
        const link = latest.url;
        try {
            var playing = latest.date.uts;
        } catch (error) {
            var playing = "y";
        }
        if (title != titleLabel.innerText.replace(/(\r\n|\n|\r)/gm, "")) {
            if (title.length > 14) {
                title = "<marquee style='mask-image: linear-gradient(90deg, #0000, #fff 10%, #fff 90%, #0000);'>" + title + "</marquee>";
            }
            titleLabel.innerHTML = title;
        }
        if (artist != artistLabel.innerText.replace(/(\r\n|\n|\r)/gm, "")) {
            if (artist.length > 29) {
                artist = "<marquee scrollamount='4' style='mask-image: linear-gradient(90deg, #0000, #fff 10%, #fff 90%, #0000);'>" + artist + "</marquee>";
            }
            artistLabel.innerHTML = artist;
        }
        if (album != albumLabel.innerText.replace(/(\r\n|\n|\r)/gm, "")) {
            if (album.length > 29) {
                album = "<marquee scrollamount='4' style='mask-image: linear-gradient(90deg, #0000, #fff 10%, #fff 90%, #0000);'>" + album + "</marquee>";
            }
            albumLabel.innerHTML = album;
        }
        // hash for no-album-art image
        if (albumArt.includes("2a96cbd8b46e442fc41c2b86b821562f")) {
            musicSection.style.removeProperty("background-image");
            artFilter.hidden = true;
        } else {
            musicSection.style.backgroundImage = "url(" + albumArt + ")";
            artFilter.hidden = false;
        }
        linkLabel.href = link;
        if (playing == "y") {
            playingLabel.innerHTML = "playing now";
            musicIcon.style.animation = "bounce 1s steps(1) infinite";
            musicSection.className = "important";
        } else {
            const timeSince = Math.floor(new Date().getTime() / 1000) - parseInt(playing);
            if (timeSince <= 3600) {
                var timeFormatted = Math.floor(timeSince / 60);
                if (timeFormatted == 1)
                    timeFormatted = "a minute ago";
                else
                    timeFormatted += " minutes ago";
            } else if (timeSince <= 86400) {
                var timeFormatted = Math.floor(timeSince / 3600);
                if (timeFormatted == 1)
                    timeFormatted = "an hour ago";
                else
                    timeFormatted += " hours ago";
            } else {
                var timeFormatted = Math.floor(timeSince / 86400);
                if (timeFormatted == 1)
                    timeFormatted = "a day ago";
                else
                    timeFormatted += " days ago";
            }
            playingLabel.innerHTML = "played " + timeFormatted;
            musicIcon.style.animation = "none";
            musicSection.removeAttribute("class");
        }
    } catch (error) {
        console.error(error);
    }
    setTimeout("updateLastfm()", 10000);
}

async function updateCommitInfo() {
    try {
        const res = await fetch("https://api.github.com/repos/poisonaivi/aivi.party/commits/6.0");
        if (!res.ok) {
            document.getElementById("changelogCommitId").innerHTML = "<span class='danger'>API   ERROR</span>";
            throw new Error("Failed to fetch.");
        }
        const resJSON = await res.json();
        const date = new Date(resJSON.commit.committer.date);
        document.getElementById("commitDate").innerHTML = document.getElementById("changelogCommitDate").innerHTML = "." + date.getUTCFullYear().toString().slice(2, 4) + "." + (date.getUTCMonth() + 1) + "." + (date.getUTCDate());
        document.getElementById("commitId").innerHTML = " • " + resJSON.sha.slice(0, 7).toUpperCase();
        document.getElementById("changelogCommitId").innerHTML = resJSON.sha.toUpperCase();
    } catch (error) {
        console.error(error);
    }   
}

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