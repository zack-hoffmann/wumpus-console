export default function (id) {
    const term = () => document.querySelector("#" + id + ".wumpus-console");
    const lines = () => term().querySelector(".lines");
    const prompt = () => term().querySelector(".prompt");
    const input = () => term().querySelector("input");

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
        term().style.width = w + "ch";
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
            stylesheet: "wumpterm.css",
            greeting: "Wumpus Terminal Alpha\nby Zack Hoffmann"
        },
        load: (p = {}) => {
            Object.assign($.vars, p);
            fetch($.vars.stylesheet).then(css => css.text()).then(sh => {
                const style = document.createElement("style");
                style.textContent = sh;
                document.head.appendChild(style);
            });
            window.addEventListener("click", clickFocusHandler);
            term().querySelector(".input-form").addEventListener("submit", inputHandler);
            setLineWidth($.vars.lineWidth);
            input().focus();
            write($.vars.greeting);
        }
    };

    return $;
}