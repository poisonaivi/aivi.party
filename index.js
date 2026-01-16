export default {
    async fetch(request, env, ctx) {
        const { id: versionId, tag: versionTag, timestamp: versionTimestamp } = env.version;

        // Set CORS headers
        const headers = new Headers({
            'Access-Control-Allow-Origin': 'https://[your-website]', // Replace with your website URL
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        });

        // Handle preflight request
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                headers: headers,
                status: 204, // No content
            });
        }

        // Create a JSON response with version information for GET requests
        const versionInfo = {
            versionId,
            versionTag,
            versionTimestamp: new Date(versionTimestamp).toLocaleString()
        };

        headers.set('Content-Type', 'application/json'); // Add content type header

        return new Response(JSON.stringify(versionInfo), {
            headers: headers,
        });
    },
};