var printButton = document.getElementById("print-resume-button");
var shouldAutoPrint = new URLSearchParams(window.location.search).get("print") === "1";
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
