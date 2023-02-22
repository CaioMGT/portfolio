// I want this to be easily re-usable in every page (maybe other than in the 404 page?)
let settings
function createButton(text, href) {
    const button = document.createElement("a")
    button.innerText = text
    button.href = href
    button.className = "roboto text-black dark:text-white top-button px-2 py-2"
    // Buttons shouldn't be very tall, but idk how to fix that without messing up the text. Should look how to fix this later.
    button.style = `
        border-radius: 15px;
    `
    button.addEventListener("click", () => {
        if (currentButton) {
            currentButton.classList.remove("activeTop")
            button.classList.add("activeTop")
            currentButton = button
        }
    })
    return button
}
function updateSettings() {
    // I'm inverting the colors on dark theme so the icon is more visible
    if (theme == Enum.DARK) {
        settings.style = "filter: invert(100%); cursor: pointer;"
    } else {
        settings.style = "cursor: pointer;"
    }
}
let currentButton
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
        settings = document.createElement("img")
        settings.src = "./svg/cog.svg"
        settings.classList.add("mr-4")
        settings.addEventListener("click", () => {
            location.replace("/settings")
        })
        updateSettings()
        document.getElementsByTagName("html")[0].addEventListener("ThemeChange", updateSettings)
        this.buttons = {}
        const aboutme = createButton("About Me", "/")
        bar.appendChild(settings)
        bar.appendChild(aboutme)
        this.buttons.aboutme = aboutme
        const portfolio = createButton("Portfolio", "/portfolio")
        bar.appendChild(portfolio)
        this.buttons.portfolio = portfolio
        if (this.hasAttribute("active-button")) {
            this.buttons[this.getAttribute('active-button')].classList.add("active")
            currentButton = this.buttons[this.getAttribute('active-button')]
        }
        // Do I need to clean up my elements on disconnectedCallback?
        this.appendChild(bar)
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (ready) {
            if (name == "active-button") {
                this.buttons[newValue].classList.add("activeTop")
                this.buttons[oldValue].classList.remove("activeTop")
                currentButton = this.buttons[newValue]
            }
        }
    }
}
customElements.define("top-nav", Topbar)