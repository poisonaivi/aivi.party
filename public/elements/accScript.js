function accMenuOpen() {
    document.getElementById("acc-menu").style.visibility = "visible";
}

function accMenuClose() {
    document.getElementById("acc-menu").style.visibility = "hidden";
}

function accRecall() {
    optionIds = ["novfx", "desat", "contrast", "invert", "accfont", "sansfont", "seriffont", "monofont"];
    options = [false, false, false, false, false, false, false, false];
    for (let i = 0; i < options.length; i++) {
        if (localStorage.getItem(optionIds[i])) {
            options[i] = true;
            setTimeout(() => {
                document.getElementById(optionIds[i]).checked = true;
            }, 100);
        }
    }
}

function accChange() {
    for (let i = 0; i < options.length; i++) {
        if (document.getElementById(optionIds[i]).checked) {
            options[i] = true;
            localStorage.setItem(optionIds[i], true);
        } else {
            options[i] = false;
            localStorage.removeItem(optionIds[i]);
        }
    }
    accApply();
}

function accApply() {
    const mainEle = document.getElementsByTagName("main")[0];
    const root = document.querySelector(':root');
    var mainFilter = "";
    var mainMask = "";
    var mainFont = "";
    if (options[0]) {
        mainFilter += "brightness(1)";
        mainMask = "none";
    }
    if (options[1]) {
        mainFilter += "saturate(0.5)";
    }
    if (options[2]) {
        root.style.setProperty('--border', '#888');
        root.style.setProperty('--small-text', '#888');
        root.style.setProperty('--text-b', '#222');
        root.style.setProperty('--link-b', '#102');
        root.style.setProperty('--accent-b', '#202');
        root.style.setProperty('--success-b', '#020');
        root.style.setProperty('--warning-b', '#220');
        root.style.setProperty('--danger-b', '#200');
    } else {
        root.style.setProperty('--border', 'var(--d-border');
        root.style.setProperty('--small-text', 'var(--d-small-text');
        root.style.setProperty('--text-b', 'var(--d-text-b)');
        root.style.setProperty('--link-b', 'var(--d-link-b)');
        root.style.setProperty('--accent-b', 'var(--d-accent-b)');
        root.style.setProperty('--success-b', 'var(--d-success-b)');
        root.style.setProperty('--warning-b', 'var(--d-warning-b)');
        root.style.setProperty('--danger-b', 'var(--d-danger-b)');
    }
    if (options[3]) {
        mainFilter += "invert(1)";
    }
    if (options[4]) {
        mainFont = "OpenDyslexic";
    }
    if (options[5]) {
        mainFont = "sans-serif";
    }
    if (options[6]) {
        mainFont = "serif";
    }
    if (options[7]) {
        mainFont = "monospace";
    }
    mainEle.style.filter = mainFilter;
    mainEle.style.mask = mainMask;
    mainEle.style.fontFamily = mainFont;
    document.getElementById("acc-menu").style.fontFamily = mainFont;
}

loadElement("accMenu.html", "accessibility");
setTimeout(() => {
    document.getElementById("accessibility").hidden = false;
}, 400);
var options;
var optionIds;
accRecall();
accApply();
