function headerLoaded() {
    document.getElementById(path).classList.add("selected");
}
loadElement("header.html", "header");
const path = window.location.pathname.replace(".html", "").replace("index", "").replaceAll("/", "");
