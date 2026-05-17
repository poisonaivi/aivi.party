async function loadElement(filename, elementid) {
    try {
        if (filename == null || filename.length == 0) {
            throw new Error("filename not specified.");
        }
        if (elementid == null || elementid.length == 0) {
            throw new Error("elementid not specified.");
        }
        const element = document.getElementById(elementid);
        if (element == null) {
            throw new Error("elementid does not exist within the document.");
        }
        const res = await fetch("/layout/" + filename);
        if (!res.ok) {
            element.innerHTML = "<span class='danger'>Element failed to load.</span>";
            throw new Error("Failed to fetch element.");
        }
        element.innerHTML = await res.text();
    } catch (error) {
        console.error(error);
    }
}