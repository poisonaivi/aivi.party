async function registerHit() {
    if (window.location.href.includes("://poi.sn/")) {
        try {
            const res = await fetch("https://poi.sn/api/hit-counter?a=add");
            if (!res.ok) {
                throw new Error("Failed to fetch.");
            }
        } catch (error) {
            console.error(error);
        }
    }
}
async function updateHits() {
    try {
        const res = await fetch("https://poi.sn/api/hit-counter");
        if (!res.ok) {
            throw new Error("Failed to fetch.");
        }
        const resJSON = await res.json();
        const hits = resJSON.hits;
        const hitsFixedLength = String(hits).padStart(8, '?');
        const hitsFormatted = hitsFixedLength.replaceAll("?", "<span class='text num pad'>?</span>");
        document.getElementById("hitcount").innerHTML = hitsFormatted;
    } catch (error) {
        console.error(error);
    }
}