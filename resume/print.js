var printButton = document.getElementById("print-resume-button");
var shouldAutoPrint = new URLSearchParams(window.location.search).get("print") === "1";
var resumeSkipLink = document.querySelector(".resume-skip-link");
if (resumeSkipLink) {
    resumeSkipLink.addEventListener("click", function () {
        var resumeContent = document.getElementById("resume-content");
        if (resumeContent) {
            window.setTimeout(function () {
                resumeContent.focus({ preventScroll: true });
            }, 0);
        }
    });
}
if (printButton instanceof HTMLButtonElement) {
    printButton.addEventListener("click", function () {
        window.print();
    });
}
if (shouldAutoPrint) {
    window.addEventListener("load", function () {
        window.print();
    }, { once: true });
}
