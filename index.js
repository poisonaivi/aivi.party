export default {
    async fetch(request, env, ctx) {
        const { id: versionId, tag: versionTag, timestamp: versionTimestamp } = env.version;

        // Create a JSON response with version information
        const versionInfo = {
            versionId,
            versionTag,
            versionTimestamp: new Date(versionTimestamp).toLocaleString()
        };

        // Set CORS headers
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://aivi.party',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
        });

        return new Response(JSON.stringify(versionInfo), {
            headers: headers,
        });
    },
};