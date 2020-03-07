export default function (id) {
    const con = () => document.querySelector("#" + id + ".wumpus-console");
    const lines = () => con().querySelector(".lines");
    const prompt = () => con().querySelector(".prompt");
    const input = () => con().querySelector("input");

    const refresh = () => {
        prompt().innerText = $.vars.promptBuffer;
    }

    const write = (t) => {
        const newP = document.createElement("p");
        newP.innerText = t;
        lines().appendChild(newP);
        refresh();
    };

    const setLineWidth = (w) => {
        refresh();
        con().style.width = w + "ch";
        const l = prompt().innerText.length;
        input().setAttribute("maxlength", w - l);
        input().style.width = (w - l) + "ch";
    }

    const inputHandler = (e) => {
        e.preventDefault();
        write(prompt().innerText + input().value);
        input().value = "";
        window.scrollTo(0, document.body.scrollHeight);
    };
    const clickFocusHandler = (e) => {
        if (e.target.nodeName === "HTML" || e.target.nodeName === "BODY") {
            input().focus();
        }
    }

    const $ = {
        id: id,
        vars: {
            promptBuffer: "> ",
            lineWidth: 80,
            greeting: "Wumpus Console - Defaults Enabled"
        },
        load: (p = {}) => {
            Object.assign($.vars, p);
            fetch("wumpterm.css").then(css => css.text()).then(sh => {
                const style = document.createElement("style");
                console.log(sh);
                style.textContent = sh;
                document.head.appendChild(style);
            });
            window.addEventListener("click", clickFocusHandler);
            con().querySelector(".input-form").addEventListener("submit", inputHandler);
            setLineWidth($.vars.lineWidth);
            input().focus();
            write($.vars.greeting);
        }
    };

    return $;
}