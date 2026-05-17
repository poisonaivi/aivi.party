async function registerHit() {
    if (window.location.href.includes("://aivi.party/")) {
        try {
            const res = await fetch("https://aivi.party/services/hit-counter?a=add");
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
        const res = await fetch("https://aivi.party/services/hit-counter");
        if (!res.ok) {
            throw new Error("Failed to fetch.");
        }
        const resJSON = await res.json();
        const hits = resJSON.hits;
        document.getElementById("hitcount").innerHTML = hits;
    } catch (error) {
        console.error(error);
    }
}