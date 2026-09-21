function updateGreeting() {
    const hour = new Date().getHours();
    const greeting = document.getElementById("greeting");
    if (hour >= 4 && hour < 12) {
        greeting.innerHTML = "<span class='h2' style='float: left; margin: -21px 4px -10px 0;'>g</span>ood morning";
    } else if (hour >= 12 && hour < 19) {
        greeting.innerHTML = "<span class='h2' style='float: left; margin: -21px 4px -10px 0;'>g</span>ood afternoon";
    } else {
        greeting.innerHTML = "<span class='h2' style='float: left; margin: -21px 4px -10px 0;'>g</span>ood evening";
    }
}
function updateFunTitle() {
    const titles = [
        "not actually a party",
        "open 24 hours",
        "a realm of purple",
        "a soapbox of sorts",
        "come here often?",
        "make websites, not war",
        "create art, not war",
        "yet another web corner",
        "i hope you like purple",
        "cringe culture is dead",
        "reclaim teh interwebz",
        "powered by stackoverflow",
        "this site uses no cookies",
        "#1 webkit hater",
        "#1 safari hater",
        "internet participation award",
        "a web-browsing rest stop",
        "my home on teh interwebz",
        "your home on teh interwebz",
        "a shout into the void",
        "a cry into the dark",
        "dear internet stranger,",
        "greetings, traveller",
        "welcome, stranger",
        "howdy, surfer of the web",
        "hello, voyager",
        "one of the sites of all time",
        "independent webber",
        "something in cyberspace",
        "your internet is working",
        "feature, not a bug",
        "scrapers begone",
        "beware of the cat",
        "beware of the hyena",
        "human generated",
        "this came from my brain",
        "i prompted my brain for this",
        "inspiration is an act of love",
        "lonely webmasters near you",
        "lonely furries near you",
        "<span style='color: #f00'>f</span><span style='color: #fa0'>i</span><span style='color: #ff0'>l</span><span style='color: #0b0'>l</span><span style='color: #66f'>e</span><span style='color: #a0f'>d</span> <span style='color: #ff0'>w</span><span style='color: #fff'>i</span><span style='color: #a0f'>t</span><span style='color: #555'>h</span> <span style='color: #89f'>p</span><span style='color: #f88'>r</span><span style='color: #fff'>i</span><span style='color: #f88'>d</span><span style='color: #89f'>e</span>",
        "better than doomscrolling",
        "use code AIVI for 20% off",
        "commit and sync",
        "headpats accepted here",
        "covered in bite marks",
        "you're my favorite visitor btw",
        "all i got was this lousy title",
        "you going up or down?",
        "are you a cop?",
        "you seem cool",
        "what are you looking at?",
        "who do you think you are?",
        "home of many a blåhaj",
        "i ran out of title ideas",
        "welcome to the purple zone",
        "you can make a website too",
        "don't be a gatekeeper",
        "don't be a second-hand thinker",
        "slop is not welcome here"
    ];
    setInterval(() => {
        document.getElementById("funTitle").innerHTML = titles[Math.floor(Math.random() * titles.length)];
    }, 10000);
    // document.getElementById("funTitle").innerHTML = titles[titles.length - 1];
}