function accMenuOpen() {
    document.getElementById("acc-menu").style.visibility = "visible";
}
function accMenuClose() {
    document.getElementById("acc-menu").style.visibility = "hidden";
}
function accRecall() {
    optionIds = ["novfx", "contrast", "monofont"];
    options = [false, false, false];
    for (let i = 0; i < options.length; i++) {
        if (localStorage.getItem(optionIds[i])) {
            options[i] = true;
        }
    }
}
function accUpdateCheckboxes() {
    for (let i = 0; i < options.length; i++) {
        if (options[i]) {
            document.getElementById(optionIds[i]).checked = true;
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
    const mainEle = document.querySelector("main:not(.accessory)");
    const root = document.querySelector(":root");
    mainFont = "";
    if (options[0]) {
        root.style.setProperty('--crt-filter', 'none');
        root.style.setProperty('--crt-mask', 'none');
    } else {
        root.style.setProperty('--crt-filter', 'var(--d-crt-filter)');
        root.style.setProperty('--crt-mask', 'var(--d-crt-mask)');
    }
    if (options[1]) {
        root.style.setProperty('--border', '#858');
        root.style.setProperty('--small-text', '#888');
        root.style.setProperty('--text-b', '#222');
        root.style.setProperty('--link-b', '#102');
        root.style.setProperty('--accent-b', '#202');
        root.style.setProperty('--success-b', '#021');
        root.style.setProperty('--warning-b', '#221');
        root.style.setProperty('--danger-b', '#201');
    } else {
        root.style.setProperty('--border', 'var(--d-border)');
        root.style.setProperty('--small-text', 'var(--d-small-text)');
        root.style.setProperty('--text-b', 'var(--d-text-b)');
        root.style.setProperty('--link-b', 'var(--d-link-b)');
        root.style.setProperty('--accent-b', 'var(--d-accent-b)');
        root.style.setProperty('--success-b', 'var(--d-success-b)');
        root.style.setProperty('--warning-b', 'var(--d-warning-b)');
        root.style.setProperty('--danger-b', 'var(--d-danger-b)');
    }
    if (options[2]) {
        mainFont = "acc-monospace";
    }
    mainEle.style.fontFamily = mainFont;
}
function accLoaded() {
    accUpdateCheckboxes();
    document.getElementById("accessibility").hidden = false;
    document.getElementById("acc-menu").style.fontFamily = mainFont;
}

loadElement("accMenu.html", "accessibility");
var options;
var optionIds;
var mainFont;
accRecall();
accApply();