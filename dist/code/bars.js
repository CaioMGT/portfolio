// I want this to be easily re-usable in every page (maybe other than in the 404 page?)
let settings
function createButton(text, href) {
    const button = document.createElement("a")
    button.innerText = text
    button.href = href
    button.className = "roboto text-black dark:text-white top-button px-2 py-2"
    // Buttons shouldn't be very tall, but idk how to fix that without messing up the text. Should look how to fix this later.
    button.style.borderRadius = "15px"
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
        bar.className = "bg-neutral-100 dark:bg-neutral-900 w-full popup flex flex-row-reverse gap-x-6 roboto"
        bar.style = `
            height: 40px;
            position: -webkit-sticky; /* safari */
            position: sticky;
            top: 0;
            `
        settings = document.createElement("img")
        settings.src = "./svg/cog.svg"
        settings.classList.add("mr-4")
        settings.addEventListener("click", () => {
            location.replace("/settings")
        })
        updateSettings()
        document.documentElement.addEventListener("ThemeChange", updateSettings)
        this.buttons = {}
        const aboutme = createButton("About Me", "/")
        bar.appendChild(settings)
        bar.appendChild(aboutme)
        this.buttons.aboutme = aboutme
        const portfolio = createButton("Portfolio", "/portfolio")
        bar.appendChild(portfolio)
        this.buttons.portfolio = portfolio
        if (this.hasAttribute("active-button")) {
            this.buttons[this.getAttribute('active-button')].classList.add("activeTop")
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
function createContainer(img, text, clickable, link) {
    const container = document.createElement("div")
    const logo = document.createElement("img")
    logo.src = img
    logo.style.display = "inline"
    logo.style.height = "25px"
    logo.style.width = "25px"
    const desc = document.createElement("h1")
    desc.innerText = text
    desc.style.display = "inline"
    desc.classList.add("ml-1")
    desc.classList.add("mr-2")
    if (clickable) {
        logo.addEventListener("click", function() {
            window.open(link, '_blank')
        })
        desc.addEventListener("click", function() {
            window.open(link, '_blank')
        })
        logo.style.cursor = "pointer"
        desc.style.cursor = "pointer"
    }
    container.appendChild(logo)
    container.appendChild(desc)
    return [container, logo, desc]
}
class BottomBar extends HTMLElement {
    static get observedAttributes() { return ['bottom']}
    constructor() {
        super()
    }
    connectedCallback() {
        const bar = document.createElement("div")
        bar.className = "bg-neutral-100 dark:bg-neutral-900 w-full flex flex-row-reverse gap-x-6 roboto text-black dark:text-white mt-10"
        bar.style.height = "100px;"
        if (this.hasAttribute("bottom")) {
            bar.style.position = "absolute" 
            bar.style.bottom = "0px"
        }
        const contact = document.createElement("div")
        contact.className = "flex flex-col h-auto roboto content-center items-center"
        contact.innerText = "Contact:"
        const discord = createContainer("./svg/discord.svg", "capetaanal#2008")
        const githubContainer = createContainer("./svg/gituhb-dark.svg", "CaioMGT", true, "https://github.com/CaioMGT")
        if (theme == Enum.DARK) {
            githubContainer[1].src = "./svg/github-white.svg"
        } else {
            githubContainer[1].src = "./svg/github-dark.svg"
        }
        document.documentElement.addEventListener("ThemeChange", function(){
            if (theme == Enum.DARK) {
                githubContainer[1].src = "./svg/github-white.svg"
            } else {
                githubContainer[1].src = "./svg/github-dark.svg"
            }
        })
        contact.appendChild(discord[0])
        contact.appendChild(githubContainer[0])
        bar.appendChild(contact)
        this.appendChild(bar)
    }
}
customElements.define("bottom-bar", BottomBar)