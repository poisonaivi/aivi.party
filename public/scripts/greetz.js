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
        "open 24 hours",
        "a realm of purple",
        "a soapbox of sorts",
        "do you come here often?",
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
        "hello, voyager",
        "one of the sites of all time",
        "independent webber",
        "somewhere in cyberspace",
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
        "filled with pride",
        // "<span style='color: #f00'>f</span><span style='color: #fa0'>i</span><span style='color: #ff0'>l</span><span style='color: #0b0'>l</span><span style='color: #66f'>e</span><span style='color: #a0f'>d</span> <span style='color: #ff0'>w</span><span style='color: #fff'>i</span><span style='color: #a0f'>t</span><span style='color: #555'>h</span> <span style='color: #89f'>p</span><span style='color: #f88'>r</span><span style='color: #fff'>i</span><span style='color: #f88'>d</span><span style='color: #89f'>e</span>",
        "better than doomscrolling",
        "use code AIVI for 20% off",
        "don't forget to git commit",
        "headpats accepted here",
        "covered in bite marks",
        "you're my favorite visitor btw",
        "all i got was this lousy title",
        "you going up or down?",
        "are you a cop?",
        "you seem cool",
        "you seem alright",
        "what are you looking at?",
        "who do you think you are?",
        "home of many a blåhaj",
        "i ran out of title ideas",
        "welcome to the purple zone",
        "you can make a website too",
        "don't be a gatekeeper",
        "don't be a second-hand thinker",
        "slop is not welcome here",
        "go and make something cool",
        "go and do something fun",
        "how are you doing?",
        "look what the cat dragged in",
        "thanks for visiting",
        "what time is it again?",
        "what day is it again?",
        "what year is it again?",
        "make yourself at home",
        "don't mind the mess",
        "i gotta head to class",
        "do not consume in large quantities"
    ];
    document.getElementById("funTitle").innerHTML = "";
    nextTitle(titles[Math.floor(Math.random() * titles.length)]);
    // nextTitle(titles[titles.length - 1]);
    setInterval(() => {
        nextTitle(titles[Math.floor(Math.random() * titles.length)]);
    }, 10000);
}

function nextTitle(title) {
    let currentTitle = document.getElementById("funTitle");
    let caret = document.getElementById("funTitleCaret");
    if (document.hasFocus()) {
        caret.style = "none";
        currentTitle.innerHTML = currentTitle.innerHTML.substring(0, currentTitle.innerHTML.length - 1);
        setTimeout(() => {
            let deleteInterval = setInterval(() => {
                currentTitle.innerHTML = currentTitle.innerHTML.substring(0, currentTitle.innerHTML.length - 1);
                if (!document.hasFocus() || currentTitle.innerHTML.length == 0) {
                    clearInterval(deleteInterval);
                    caret.style.animation = "blink 1s steps(1) infinite";
                    setTimeout(() => {
                        caret.style.animation = "none";
                        let printInterval = setInterval(() => {
                            currentTitle.innerHTML = title.substring(0, currentTitle.innerHTML.length + 1);
                            if (!document.hasFocus() || currentTitle.innerHTML.length == title.length) {
                                clearInterval(printInterval);
                                caret.style.animation = "blink 1s steps(1) infinite";
                                currentTitle.innerHTML = title;
                            }
                        }, 100);
                    }, 800);
                }
            }, 50);
        }, 600);
    } else {
        currentTitle.innerHTML = title;
    }
}