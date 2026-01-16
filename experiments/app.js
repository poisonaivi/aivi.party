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
        const res = await fetch("elements/" + filename);
        if (!res.ok) {
            element.innerHTML = "<span class='danger'>Element failed to load.</span>";
            throw new Error("Failed to fetch element.");
        }
        element.innerHTML = await res.text();
    } catch (error) {
        console.error(error);
    }
}

async function updateDiscord() {
    try {
        const res = await fetch("https://api.lanyard.rest/v1/users/802178124342493224");
        if (!res.ok) {
            document.getElementById("presence").innerHTML = document.getElementById("status").innerHTML = "Unknown";
            throw new Error("Failed to fetch.");
        }
        const resJSON = await res.json();
        document.getElementById("presence").innerHTML = resJSON.data.discord_status;
        if (resJSON.data.activities.length != 0) {
            document.getElementById("status").innerHTML = resJSON.data.activities['0'].state;
        } else {
            document.getElementById("status").innerHTML = "No status set.";
        }
    } catch (error) {
        console.error(error);
    }            
}

async function updateLastfm() {
    try {
        const res = await fetch("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=am3thystx&api_key=c1797de6bf0b7e401b623118120cd9e1");
        if (!res.ok) {
            document.getElementById("song").innerHTML = "Unknown";
            throw new Error("Failed to fetch.");
        }
        const resText = await res.text();
        const p = new DOMParser();
        const resXML = p.parseFromString(resText,"text/xml");
        document.getElementById("song").innerHTML = resXML.getElementsByTagName("name")[0].childNodes[0].nodeValue;
    } catch (error) {
        console.error(error);
    }
}