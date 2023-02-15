// I want this to be easily re-usable in every page (maybe other than in the 404 page?)
class Topbar extends HTMLElement {
    constructor() {
        super()
    }
    connectedCallback() {
        // Remember: only parent elements in connectedCallback
        const div = document.createElement("div")
        div.className = "bg-neutral-100 dark:bg-neutral-900 w-full popup"
        div.style = `
            height: 5vh
        `
        this.appendChild(div)
    }
}
customElements.define("top-nav", Topbar)