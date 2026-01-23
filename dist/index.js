var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// index.js
var index_default = {
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
              // "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Origin": "aivi.party"
            }
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
              // "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Origin": "aivi.party"
            }
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
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>404 Not Found</title>
        <script src="app.js"><\/script>
        <link rel="stylesheet" href="main.css">
    </head>
    <body>
        <main>
            <div style="height: 100px;"></div>
            <section class="danger" style="text-align: center;">
                <div style="height: 100px;"></div>
                <h1>404</h1>
                <h3><i>Not Found</i></h3>
                <div style="height: 50px;"></div>
                <p>You stand before a deep chasm in the Internet.</p>
                <br>
                <p><a href="/index.html">Go home?</a></p>
                <div style="height: 100px;"></div>
            </section>
            <footer class="main" id="footer"><script>loadElement("footer.html", "footer");<\/script></footer> 
        </main>
    </body>
    </html>`;
  return new Response(html, {
    headers: {
      "content-type": "text/html;charset=UTF-8"
    }
  });
}
__name(pageNotFound, "pageNotFound");
export {
  index_default as default
};
//# sourceMappingURL=index.js.map
