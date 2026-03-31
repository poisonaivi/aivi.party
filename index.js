export default {
    async fetch(request, env, ctx) {
        const { search, pathname } = new URL(request.url);
        var path = pathname.toString().slice(1).split("/");
        if (path[0] == "services") {
            try {
                if (path[1] == "last-played") {
                    const res = await fetch("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=am3thystx&api_key=e7e7db3733ebd1413a1466b1ab6117de&format=json&limit=1");
                    if (!res.ok) {
                        throw new Error("Response from Last.fm was not OK.");
                    }
                    const resJSON = await res.json();
                    return new Response(JSON.stringify(resJSON), {
                        headers: {
                            "content-type": "application/json",
                            // "Access-Control-Allow-Origin": "aivi.party",
                            "Access-Control-Allow-Origin": "*",
                        },
                    });
                } else if (path[1] == "discord-status") {
                    const res = await fetch("https://api.lanyard.rest/v1/users/802178124342493224");
                    if (!res.ok) {
                        throw new Error("Response from Lanyard was not OK.");
                    }
                    const resJSON = await res.json();
                    return new Response(JSON.stringify(resJSON), {
                        headers: {
                            "content-type": "application/json",
                            // "Access-Control-Allow-Origin": "aivi.party",
                            "Access-Control-Allow-Origin": "*",
                        },
                    });
                } else if (path[1] == "hit-counter") {
                    var hits = await env.hitCounter.get('aivi.party');
                    hits = parseInt(hits);
                    if (search.includes("?a=add")) {
                        hits = hits + 1;
                        await env.hitCounter.put('aivi.party', hits);
                    }
                    return new Response(JSON.stringify({hits: hits}), {
                        headers: {
                            "content-type": "application/json",
                            "Access-Control-Allow-Origin": "aivi.party",
                            // "Access-Control-Allow-Origin": "*",
                        },
                    });
                    // list all key-value pairs
                    // const allKeys = await env.KV.list();
                    // delete a key-value pair
                    // await env.KV.delete('KEY');
                } else {
                    return pageNotFound();
                }
            } catch (error) {
                console.error(error);
            }
        } else if (path[0] == "blog") {
            return blogNotFound();
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
        <meta name="viewport" content="width=device-width, initial-scale=0.38">
        <title>404 Not Found</title>
        <script src="/app.js"></script>
        <link rel="stylesheet" href="/main.css">
        <link rel="icon" href="/assets/aivi-logo-2026-pix.png">
    </head>
    <body>
        <div id="accessibility" hidden><script defer src="/elements/accScript.js"></script></div>
        <main>
            <header id="header"><script defer src="/elements/headerScript.js"></script></header>
            <section class="danger" style="text-align: center;">
                <div style="height: 100px;"></div>
                <div style="width: fit-content; margin: 0 auto;">
                    <h1 class="num bg danger">???</h1>
                    <h1 class="num">404</h1>
                </div>
                <h3><i>Resource Not Found</i></h3>
                <div style="height: 80px;"></div>
                <p>You arrive at a deep chasm in the Internet.<br>If anything's down there, it definitely wasn't meant for you.</p>
                <br>
                <p><a href="/index.html"><img class="icon inline-left" src="/assets/icons/arrow-l.png">Head home?</a></p>
                <br>
                <p><small>Or, if you feel like it, <a href="/guestbook.html">tell me how you got here</a>.</small></p>
                <div style="height: 100px;"></div>
            </section>
            <footer id="footer"><script>loadElement("footer.html", "footer");</script></footer> 
        </main>
    </body>
    </html>`;
    return new Response(html, {
        status: 404,
        headers: {
            "content-type": "text/html;charset=UTF-8",
        }
    });
}

async function blogNotFound() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=0.38">
        <title>404 Not Found</title>
        <link rel="stylesheet" href="/blog/blog.css">
    </head>
    <body>
        <main>
            <div>
                <section class="nav"><div class="back"><a href="/blog/index.html">&larr; Back</a></div><a href="/blog/0001.html">&lt;&lt; First</a> | ??? | <a href="/blog/last.html">Last &gt;&gt;</a></section>
                <section style="text-align: center;">
                    <div style="height: 50px;"></div>
                    <h1 class="important">404</h1>
                    <h2 class="important"><i>Not Found</i></h2>
                    <div style="height: 60px;"></div>
                    <p>The blog post you requested has not been written yet!</p>
                    <p>You can still check out the <a href="/blog/last.html">latest post</a> or <a href="/blog/index.html">go home</a>.</p>
                    <div style="height: 80px;"></div>
                </section>
            </div>
        </main>
    </body>
    </html>`;
    return new Response(html, {
        status: 404,
        headers: {
            "content-type": "text/html;charset=UTF-8",
        }
    });
}