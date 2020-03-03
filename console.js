(function (params) {
    
    function write(t, parent) {
        const newP = document.createElement("p");
        newP.innerText = t;
        parent.appendChild(newP);
    }

    function input(e) {
        const form = e.target;
        const inField = form.elements.input;
        const promptText = form.querySelector("label").innerText;
        write(promptText + inField.value, form.closest(".wrapper").querySelector(".scroll"));
        inField.value = "";
        window.scrollTo(0, document.body.scrollHeight);
        e.preventDefault();
    }

    function setLineWidth(width) {
        document.querySelector(".wrapper").style.width = width + "ch";
        const l = document.querySelector("label").innerText.length;
        document.querySelector("input").setAttribute("maxlength", width - l);
        document.querySelector("input").style.width = (width - l) + "ch";
    }

    function stagePrompt(p) {
        params.stagedPrompt = p;
    }

    function updatePrompt() {
        document.querySelector("label").innerText = params.stagedPrompt;
    }

    function inputFocus(e) {
        if (e.target.nodeName === "HTML" || e.target.nodeName === "BODY") {
            document.querySelector("input").focus();
        }
    }

    document.querySelectorAll(".input-form").forEach((f) => f.addEventListener("submit", input));
    window.addEventListener("click", inputFocus);
    stagePrompt("test-prompt> ");
    updatePrompt();
    setLineWidth(80);
})({});