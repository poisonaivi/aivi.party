export default {
    async fetch(request, env, ctx) {
        // Check if env.version is defined
        if (!env.version) {
            return new Response('Version metadata not available.', { status: 500 });
        }

        // Destructure version metadata
        const { id: versionId, tag: versionTag, timestamp: versionTimestamp } = env.version;

        // Create a JSON response with version information
        const versionInfo = {
            versionId,
            versionTag,
            versionTimestamp: new Date(versionTimestamp).toLocaleString()
        };

        // Set CORS headers
        const headers = new Headers({
            'Access-Control-Allow-Origin': 'https://aivi.party/',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Content-Type': 'application/json',
        });

        return new Response(JSON.stringify(versionInfo), {
            headers: headers,
        });
    },
};