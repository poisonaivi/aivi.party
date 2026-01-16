export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        // Check for the specific endpoint you want
        if (url.pathname === '/versiontest') {
            if (!env.version) {
                return new Response('Version metadata not available.', { status: 500 });
            }

            const { id: versionId, tag: versionTag, timestamp: versionTimestamp } = env.version;
            const versionInfo = {
                versionId,
                versionTag,
                versionTimestamp: new Date(versionTimestamp).toLocaleString()
            };

            const headers = new Headers({
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Content-Type': 'application/json',
            });

            return new Response(JSON.stringify(versionInfo), { headers });
        }

        // Handle other requests (e.g., static assets)
        return await fetch(request); // This will fetch from your static assets
    },
};