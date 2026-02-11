loadElement("header.html", "header");
const path = window.location.pathname.replace(".html", "").replace("/", "");
setTimeout(() => {
    document.getElementById(path).classList.add("selected");
}, 250);

