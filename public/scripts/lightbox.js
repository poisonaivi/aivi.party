function showLightbox(thumbnailID) {
    const currentID = document.getElementById("fill-id").innerHTML;
    const currentIDtype = currentID.substring(4, 7);
    const currentIDnum = parseInt(currentID.substring(7));
    if (thumbnailID == "next") {
        if (!document.getElementById(currentIDtype + (currentIDnum + 1))) {
            const nextSectID = currentIDtype + (currentIDnum + 100 + "").substring(0, 2) + "01";
            if (!!document.getElementById(nextSectID)) {
                showLightbox(nextSectID);
            }
            return;
        }
        showLightbox(currentIDtype + (currentIDnum + 1));   
        return;
    } else if (thumbnailID == "prev") {
        if (!document.getElementById(currentIDtype + (currentIDnum - 1))) {
            const prevSectID = document.getElementById(currentIDtype + currentIDnum).getElementsByClassName("data-prevID")[0].innerText;
            if (!!document.getElementById(prevSectID)) {
                showLightbox(prevSectID);
            }
            return;
        }
        showLightbox(currentIDtype + (currentIDnum - 1));   
        return;
    } else if (!document.getElementById(thumbnailID)) {
        return;
    }
    const section = document.getElementById(thumbnailID);
    const lightbox = document.getElementById("lightbox");
    document.getElementById("fill-id").innerHTML = "ID: " + thumbnailID;
    if (thumbnailID.includes("art")) {
        const date = section.getElementsByClassName("data-date")[0].innerText;
        document.getElementById("fill-title").innerHTML = section.getElementsByClassName("title-bar")[0].innerText;
        document.getElementById("fill-date").innerHTML = date;
        document.getElementById("fill-medium").innerHTML = section.getElementsByClassName("data-medium")[0].innerText;
        document.getElementById("fill-description").innerHTML = section.getElementsByClassName("data-description")[0].innerHTML;
        document.getElementById("fill-alt").innerHTML = "ALT: " + section.getElementsByTagName("img")[0].alt;
        document.getElementById("fill-source").innerHTML = section.getElementsByClassName("data-source")[0].innerHTML;
        document.getElementById("fill-year").innerHTML = date.substring(date.length - 4);
        document.getElementById("lightboxImage").src = section.getElementsByClassName("thumbnailImage")[0].src;
    } else if (thumbnailID.includes("prj")) {
        const date = section.getElementsByClassName("data-date")[0].innerText;
        document.getElementById("fill-title").innerHTML = section.getElementsByClassName("data-title")[0].innerText;
        document.getElementById("fill-date").innerHTML = date;
        document.getElementById("fill-tools").innerHTML = section.getElementsByClassName("data-tools")[0].innerText;
        document.getElementById("fill-description").innerHTML = section.getElementsByClassName("data-description")[0].innerHTML;
        document.getElementById("fill-link").innerHTML = section.getElementsByClassName("data-link")[0].innerHTML;
        document.getElementById("fill-source").innerHTML = section.getElementsByClassName("data-source")[0].innerHTML;
        document.getElementById("fill-readme").innerHTML = section.getElementsByClassName("data-readme")[0].innerHTML;
        document.getElementById("fill-year").innerHTML = date.substring(date.length - 4);
        document.getElementById("lightboxImage").src = section.getElementsByClassName("thumbnailImage")[0].src;
    }
    lightbox.style.display = "block";
    clearParams();
    addParam("view", thumbnailID);
    setTimeout(() => {
        lightbox.style.opacity = 1;
        lightbox.style.backdropFilter = "blur(4px)";
        lightbox.querySelector("main").style.marginTop = "0";
    }, 0);
}
function hideLightbox() {
    document.getElementById("lightbox").hidden = true;
    lightbox.style.opacity = 0;
    lightbox.style.backdropFilter = "blur(0)";
    lightbox.querySelector("main").style.marginTop = "100%";
    clearParams();
    setTimeout(() => {
    lightbox.style.display = "none";
    }, 300);
}
function shareLightbox() {
    const urlString = window.location.href;
    try {
        navigator.clipboard.writeText(urlString);
        alert("link copied to clipboard!");
    } catch (error) {
        alert("failed to copy to clipboard\n\ntry copying the URL from the search bar.");
    }
}
function openSharedLightbox() {
    const urlString = window.location.href;
    let url = new URL(urlString);
    showLightbox(url.searchParams.get("view"));
}
function clearParams() {
    const urlString = window.location.href;
    const url = new URL(urlString);
    url.searchParams.delete("view");
    window.history.pushState("", "", url);
}
function addParam(parameter, value) {
    const urlString = window.location.href;
    let url = new URL(urlString);
    url.searchParams.append(parameter, value);
    window.history.pushState("", "", url);
}