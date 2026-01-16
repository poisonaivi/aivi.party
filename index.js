export default {
    async fetch(request, env, ctx) {
        const { id: versionId, tag: versionTag, timestamp: versionTimestamp } = env.version;

        // Create a JSON response with version information
        const versionInfo = {
            versionId,
            versionTag,
            versionTimestamp: new Date(versionTimestamp).toLocaleString()
        };

        return new Response(JSON.stringify(versionInfo), {
            headers: { 'Content-Type': 'application/json' },
        });
    },
};