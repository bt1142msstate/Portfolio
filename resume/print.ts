const printButton = document.getElementById("print-resume-button");
const shouldAutoPrint = new URLSearchParams(window.location.search).get("print") === "1";

if (printButton instanceof HTMLButtonElement) {
    printButton.addEventListener("click", () => {
        window.print();
    });
}

if (shouldAutoPrint) {
    window.addEventListener(
        "load",
        () => {
            window.print();
        },
        { once: true }
    );
}
