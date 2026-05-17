async function updateDiscord() {
    const presenceLabel = document.getElementById("presenceLabel");
    const presenceIcon = document.getElementById("presenceIcon");
    const statusLabel = document.getElementById("statusLabel");
    const discordSection = document.getElementById("discordSection");
    try {
        const res = await fetch("https://aivi.party/services/discord-status");
        if (!res.ok) {
            presenceLabel.innerHTML = "STATUS";
            presenceLabel.className = "danger";
            presenceIcon.className = "icon inline-left danger";
            presenceIcon.src = "/assets/branding/discord.png";
            statusLabel.innerHTML = "<small class='danger'><img class='icon inline-left' src='/assets/icons/error.png'>api error</small>"
            discordSection.className = "danger";
            throw new Error("Failed to fetch.");
        }
        const resJSON = await res.json();
        const presence = resJSON.data.discord_status;
        if (presence == "online") {
            presenceLabel.innerHTML = "ONLINE";
            presenceLabel.className = "success";
            presenceIcon.className = "icon inline-left success";
            presenceIcon.src = "/assets/icons/status-online.png";
            discordSection.className = "success";
        } else if (presence == "idle") {
            presenceLabel.innerHTML = "IDLE";
            presenceLabel.className = "warning";
            presenceIcon.className = "icon inline-left warning";
            presenceIcon.src = "/assets/icons/status-idle.png";
            discordSection.className = "warning";
        } else if (presence == "dnd") {
            presenceLabel.innerHTML = "DO NOT DISTURB";
            presenceLabel.className = "danger";
            presenceIcon.className = "icon inline-left danger";
            presenceIcon.src = "/assets/icons/status-dnd.png";
            discordSection.className = "danger";
        } else if (presence == "offline") {
            presenceLabel.innerHTML = "OFFLINE";
            presenceLabel.className = "danger";
            presenceIcon.className = "icon inline-left danger";
            presenceIcon.src = "/assets/icons/status-offline.png";
            discordSection.className = "danger";
        }
        if (resJSON.data.activities.length != 0) {
            const status = resJSON.data.activities['0'].state.replace("<", "&lt;").replace(">", "&gt;");
            statusLabel.innerHTML = "&quot;" + status + "&quot;";
        } else {
            statusLabel.innerHTML = "<small>*the keeper is silent now*</small>";
        }
    } catch (error) {
        console.error(error);
    }
    setTimeout("updateDiscord()", 10000);
}
async function updateLastfm() {
    const titleLabel = document.getElementById("titleLabel");
    const artistLabel = document.getElementById("artistLabel");
    const albumImage = document.getElementById("albumImage");
    const musicSection = document.getElementById("musicSection");
    const linkLabel = document.getElementById("linkLabel");
    const playingLabel = document.getElementById("playingLabel");
    const musicIcon = document.getElementById("musicIcon");
    try {
        const res = await fetch("https://aivi.party/services/last-played");
        if (!res.ok) {
            titleLabel.innerHTML = "";
            artistLabel.innerHTML = "<span class='danger'><img class='icon inline-left' src='/assets/icons/error.png'>api error</span>";
            albumImage.hidden = true;
            musicSection.className = "danger";
            linkLabel.removeAttribute("href");
            playingLabel.innerHTML = "LAST PLAYED";
            musicIcon.style.animation = "none";
            throw new Error("Failed to fetch.");
        }
        const resJSON = await res.json();
        const latest = resJSON.recenttracks.track[0];
        var title = latest.name;
        var artist = latest.artist["#text"];
        const albumArt = latest.image[2]["#text"];
        const link = latest.url;
        try {
            var playing = latest.date.uts;
        } catch (error) {
            var playing = "y";
        }
        if (title != titleLabel.innerText.replace(/(\r\n|\n|\r)/gm, "")) {
            // 14 char for h3
            // 29 char for p
            // 37 char for small
            if (title.length > 29) {
                title = "<marquee scrollamount='6' style='mask-image: linear-gradient(90deg, #0000, #fff 10%, #fff 90%, #0000);'>" + title + "</marquee>";
            }
            titleLabel.innerHTML = title;
        }
        if (artist != artistLabel.innerText.replace(/(\r\n|\n|\r)/gm, "")) {
            if (artist.length > 37) {
                artist = "<marquee scrollamount='5' style='mask-image: linear-gradient(90deg, #0000, #fff 10%, #fff 90%, #0000);'>" + artist + "</marquee>";
            }
            artistLabel.innerHTML = artist;
        }
        // hash for no-album-art image
        if (albumArt.includes("2a96cbd8b46e442fc41c2b86b821562f")) {
            albumImage.hidden = true;
        } else {
            albumImage.src = albumArt;
            albumImage.hidden = false;
        }
        linkLabel.href = link;
        if (playing == "y") {
            playingLabel.innerHTML = "PLAYING NOW";
            playingLabel.className = "important";
            musicIcon.style.animation = "bounce 1s steps(1) infinite";
            musicSection.className = "important";
        } else {
            const timeSince = Math.floor(new Date().getTime() / 1000) - parseInt(playing);
            if (timeSince <= 3600) {
                var timeFormatted = Math.floor(timeSince / 60);
                if (timeFormatted == 1)
                    timeFormatted = "A MINUTE AGO";
                else
                    timeFormatted += " MINUTES AGO";
            } else if (timeSince <= 86400) {
                var timeFormatted = Math.floor(timeSince / 3600);
                if (timeFormatted == 1)
                    timeFormatted = "AN HOUR AGO";
                else
                    timeFormatted += " HOURS AGO";
            } else {
                var timeFormatted = Math.floor(timeSince / 86400);
                if (timeFormatted == 1)
                    timeFormatted = "A DAY AGO";
                else
                    timeFormatted += " DAYS AGO";
            }
            playingLabel.innerHTML = "PLAYED " + timeFormatted;
            playingLabel.className = "text";
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
        document.getElementById("changelogCommitDate").innerHTML = "." + date.getUTCFullYear().toString().slice(2, 4) + "." + (date.getUTCMonth() + 1) + "." + (date.getUTCDate());
        document.getElementById("changelogCommitId").innerHTML = resJSON.sha.toUpperCase();
    } catch (error) {
        console.error(error);
    }   
}