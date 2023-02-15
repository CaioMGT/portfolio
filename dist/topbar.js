// I want this to be easily re-usable in every page (maybe other than in the 404 page?)
function createButton(text, href) {
    const button = document.createElement("a")
    button.innerText = text
    button.href = href
    button.className = "text-right roboto text-black dark:text-white"
    return button
}
class Topbar extends HTMLElement {
    constructor() {
        super()
    }
    connectedCallback() {
        // Remember: only parent elements in connectedCallback
        const bar = document.createElement("div")
        bar.className = "bg-neutral-100 dark:bg-neutral-900 w-full popup"
        bar.style = `
            height: 5vh
        `
        const aboutme = createButton("About Me", "/")
        bar.appendChild(aboutme)
        // Do I need to clean up my elements on disconnectedCallback?
        this.appendChild(bar)
    }
}
customElements.define("top-nav", Topbar)