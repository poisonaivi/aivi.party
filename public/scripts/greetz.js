function updateGreeting() {
    const hour = new Date().getHours();
    const greeting = document.getElementById("greeting");
    if (hour >= 4 && hour < 12) {
        greeting.innerHTML = "good morning";
    } else if (hour >= 12 && hour < 19) {
        greeting.innerHTML = "good afternoon";
    } else {
        greeting.innerHTML = "good evening";
    }
}
function updateFunTitle() {
    const titles = [
        "<span style='color: #f00'>f</span><span style='color: #fa0'>i</span><span style='color: #ff0'>l</span><span style='color: #0b0'>l</span><span style='color: #66f'>e</span><span style='color: #a0f'>d</span> <span style='color: #ff0'>w</span><span style='color: #fff'>i</span><span style='color: #a0f'>t</span><span style='color: #555'>h</span> <span style='color: #89f'>p</span><span style='color: #f88'>r</span><span style='color: #fff'>i</span><span style='color: #f88'>d</span><span style='color: #89f'>e</span>",
        "not actually a party",
        "open for maintenance",
        "lorem ipsum or something",
        "population: 1",
        "open 24 hours",
        "a realm of purple",
        "a soapbox of sorts",
        "come here often?",
        "make websites, not war",
        "make art, not war",
        "yet another web corner",
        "take a moment and relax",
        "i hope you like purple",
        "cringe culture is dead",
        "reclaim the internet",
        "powered by stackoverflow",
        "this site uses no cookies",
        "#1 webkit hater",
        "a quiet corner of the internet",
        "200 ok",
        "internet participation award",
        "a web-browsing rest stop",
        "my home on the internet",
        "a shout into the void",
        "dear internet stranger,",
        "@everyone",
        "greetings, traveller",
        "welcome, stranger",
        "howdy, surfer of the web",
        "one of the sites of all time",
        "independent webber",
        "$ cat intro.txt",
        "something in cyberspace",
        "your internet is working",
        "feature, not a bug",
        "scrapers begone",
        "beware of cat",
        "beware of hyena",
        "human generated",
        "inspiration is an act of love",
        "lonely webmasters near you",
        "lonely furries near you",
        "better than doomscrolling",
        "thanks for checking me out",
        "don't read my blog",
        "commit and sync",
        "headpats accepted here"
    ];
    // document.getElementById("funTitle").innerHTML = titles[titles.length - 1];
    document.getElementById("funTitle").innerHTML = titles[Math.floor(Math.random() * titles.length)];
}