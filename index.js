// export default {
//     async fetch(request) {
//         return await fetch("https://aivi.party/404", request)
//     },
//   };

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    var path = url.pathname.toString().slice(1).split("/");
    var response;
    var contentType;

    if (path[0] == "services") {
        try {
            if (path[1] == "last-played") {
                const res = await fetch("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=am3thystx&api_key=e7e7db3733ebd1413a1466b1ab6117de&format=json&limit=1");
                if (!res.ok) {
                    throw new Error("Failed to fetch.");
                }
                const resJSON = await res.json();
                return new Response(JSON.stringify(resJSON), {
                    headers: {
                        "content-type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        // "Access-Control-Allow-Origin": "aivi.party",
                    },
                });
            } else if (path[1] == "discord-status") {
                const res = await fetch("https://api.lanyard.rest/v1/users/802178124342493224");
                if (!res.ok) {
                    throw new Error("Failed to fetch.");
                }
                const resJSON = await res.json();
                return new Response(JSON.stringify(resJSON), {
                    headers: {
                        "content-type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        // "Access-Control-Allow-Origin": "aivi.party",
                    },
                });
            } else {
                return pageNotFound();
            }
        } catch (error) {
            console.error(error);
        }
    } else {
        return pageNotFound();
    }
  }
};

async function pageNotFound() {
    const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=0.35">
            <link rel="stylesheet" href="/styles.css">
            <title>404 Page Not Found</title>
        </head>
        <body>
            <div class="contentColumn" style="text-align: center;">
                <div style="height: 100px;"></div>
                <div class="card">
                    <div style="height: 120px;"></div>
                    <div style="scale: 3;">
                        <h1 class="flickering">404</h1>
                    </div>
                    <div style="height: 50px;"></div>
                    <h2>Page Not Found!</h2>
                    <div style="height: 120px;"></div>
                    <p>You find yourself standing before a deep, dark hole in the internet.</p>
                    <p>Are you lost? <a href="https://aivi.party/"><u>Let's go home.</u></a></p>
                    <noscript class="caption">You should enable JavaScript. <a href="https://javascript.amethystx.net/" target="_blank"><u>Learn more.</u></a></noscript>
                    <div style="height: 60px;"></div>
                </div>
            </div>
        </body>
        </html>`;
    return new Response(html, {
        headers: {
            "content-type": "text/html;charset=UTF-8",
        },
    });
}