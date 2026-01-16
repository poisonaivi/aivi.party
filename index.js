export default {
    async fetch(request, env, ctx) {
        const { id: versionId, tag: versionTag, timestamp: versionTimestamp } = env.version;

        // Log version information to the console
        console.log("Cloudflare Worker Version Info:");
        console.log(`Version ID: ${versionId}`);
        console.log(`Version Tag: ${versionTag}`);
        console.log(`Timestamp: ${new Date(versionTimestamp).toLocaleString()}`);

        // Optionally, return a simple response
        return new Response("Version information logged to console.", {
            headers: { 'Content-Type': 'text/plain' },
        });
    },
};