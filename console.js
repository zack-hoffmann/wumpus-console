(function (params) {
    function input(e) {
        console.log(e);
        const form = e.target;
        const inField = form.elements.input;
        const promptText = form.closest(".prompt").querySelector(".text").innerText;
        const newP = document.createElement("p");
        newP.innerText = promptText + inField.value;
        inField.value = "";
        form.closest(".wrapper").querySelector(".scroll").appendChild(newP);
        window.scrollTo(0, document.body.scrollHeight);
        e.preventDefault();
    }

    function setLineWidth(width) {
    }

    document.querySelectorAll(".input-form").forEach((f) => f.addEventListener("submit", input));
})({});