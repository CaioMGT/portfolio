// I want this to be easily re-usable in every page (maybe other than in the 404 page?)
function createButton(text, href) {
    const button = document.createElement("a")
    button.innerText = text
    button.href = href
    button.className = "roboto text-black dark:text-white top-button"
    // Buttons shouldn't be very tall, but idk how to fix that without messing up the text. Should look how to fix this later.
    button.style = `
        padding-top: 8px;
        border-radius: 10px;
    `
    return button
}
let ready = false
class Topbar extends HTMLElement {
    static get observedAttributes() { return ['active-button']; }
    constructor() {
        super()
    }
    connectedCallback() {
        ready = true
        // Remember: only parent elements in connectedCallback
        const bar = document.createElement("div")
        bar.className = "bg-neutral-100 dark:bg-neutral-900 w-full popup flex flex-row-reverse gap-x-6"
        bar.style = `
            height: 40px
        `
        this.buttons = {}
        const aboutme = createButton("About Me", "/")
        aboutme.classList.add("mr-4")
        aboutme.classList.add("px-2")
        bar.appendChild(aboutme)
        this.buttons.aboutme = aboutme
        const portfolio = createButton("Portfolio", "/portfolio")
        bar.appendChild(portfolio)
        this.buttons.portfolio = portfolio
        if (this.hasAttribute("active-button")) {
            this.buttons[this.getAttribute('active-button')].classList.add("active")
        }
        // Do I need to clean up my elements on disconnectedCallback?
        this.appendChild(bar)
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (ready) {
            if (name == "active-button") {
                this.buttons[newValue].classList.add("active")
                this.buttons[oldValue].classList.remove("active")
            }
        }
    }
}
customElements.define("top-nav", Topbar)