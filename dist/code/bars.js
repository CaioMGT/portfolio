// I want this to be easily re-usable in every page (maybe other than in the 404 page?)
let settings
function createButton(text, href, order) {
    const button = document.createElement("a")
    button.innerText = text
    button.href = href
    button.className = "roboto text-black dark:text-white top-button px-2 py-2"
    button.style.borderRadius = "12px"
    button.tabIndex = order
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
    // I'm inverting the colors on dark theme so the icon is more visible.
    // By inverting it, the cog becomes white so it doesn't blend in anymore
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
        let tabIndex = 1
        const bar = document.createElement("div")
        bar.className = "w-full popup flex flex-row-reverse gap-x-6 roboto "
        bar.style = `
            height: 40px;
            position: -webkit-sticky; /* safari */
            /*position: sticky;*/
            z-index:100;
            top: 0;
            `
        settings = document.createElement("img")
        settings.src = "/svg/cog.svg"
        settings.classList.add("mr-4")
        settings.classList.add("pt-1", "pb-1")
        settings.tabIndex = tabIndex
        settings.alt = "Settings"
        tabIndex++
        settings.addEventListener("click", () => {
            location.replace("/settings")
        })
        // To understand why, read the comment in updateSettings
        updateSettings()
        document.documentElement.addEventListener("ThemeChange", updateSettings)
        this.buttons = {}
        const aboutme = createButton("About Me", "/", tabIndex)
        tabIndex++

        this.buttons.aboutme = aboutme
        const portfolio = createButton("Portfolio", "/portfolio", tabIndex)
        tabIndex++
        bar.appendChild(settings)
        bar.appendChild(aboutme)
        bar.appendChild(portfolio)
        settings.addEventListener("keydown", function(event) {
            if (event.key == "Enter") {
                location.replace("/settings")
            }
        })
        this.buttons.portfolio = portfolio
        // This (and attributeChangedCallback) change what button is highlighted.
        // It actually isn't automatic, I have to manually set the active-button
        // per page. If someone knows a better way, hit me up on discord.
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
    container.style.width = "200px" //hopefully this won't break in small screens
    container.style.textAlign = "left"
    const logo = document.createElement("img")
    logo.src = img
    logo.style.display = "inline"
    logo.style.height = "25px"
    logo.style.width = "25px"
    logo.alt=""
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
    return container
}
// Since the bottom bar will probably have multiple complex divs,
// I chose to separate each one into their own function,
// so the connectedCallback doesn't get too crowded.
function contactInfo(bar) {
    const contact = document.createElement("div")
    contact.className = "flex flex-col h-auto roboto content-center items-center z-index:100"
    contact.innerText = "Contact:"
    const discord = createContainer("/svg/discord.svg", "capetaanal#1984")
    const github = createContainer("/svg/github-dark.svg", "CaioMGT", true, "https://github.com/CaioMGT")
    const email = createContainer("/svg/email.svg", "caio@caiomgt.com", true, "mailto:caio@caiomgt.com")
    if (theme == Enum.DARK) {
        github.children[0].src = "/svg/github-white.svg"
        email.children[0].style.filter = "invert(100%)"
    } else {
        github.children[0].src = "/svg/github-dark.svg"
        email.children[0].style.filter = ""
    }
    document.documentElement.addEventListener("ThemeChange", function(){
        if (theme == Enum.DARK) {
            github.children[0].src = "/svg/github-white.svg"
            email.children[0].style.filter = "invert(100%)"
        } else {
            github.children[0].src = "/svg/github-dark.svg"
            email.children[0].style.filter = ""
        }
    })
    window.addEventListener("resize", function(){
        if (document.body.getBoundingClientRect().height <= window.innerHeight) {
            bar.style.position = "absolute"
            bar.style.bottom = "0px"
        } else {
            bar.style.position = "static"
        }
    })
    contact.appendChild(discord)
    contact.appendChild(github)
    contact.appendChild(email)
    return contact
}
const facts = [
    "I made this website to challenge myself and learn HTML and CSS, It's been a blast!", 
    "Have any feedback? Tell me in my Discord DMs! I accept any friend requests.",
    "This website is built from the ground up manually, using TailwindCSS",
    "I can't tie my shoes!",
    "The age on the About Me page automatically updates when it's my birthday!",
    "I try to add new things often, check back every once in a while :)",
    "I had no prior experience making websites before this",
    "My timezone is GMT -3",
    "NullPointerException... just kidding",
    "This is a fact!",
    "This isn't a fact. (or is it?)",
    "I live in Brazil.",
    "I'm taking you to Brazil",
    "This website is entirely open source. \n If you want to check out the code behind it, the github is \n https://github.com/CaioMGT/caiomgt.github.io",
    "I'm not entirely sure why I made this",
    "These facts aren't confirmed true.",
    "I don't know what I'm doing!",
    "If you see this, type 'banana' in my discord dms",
    "Made in Brazil!",
    "I am very picky about what I eat",
    "I don't have a life!",
    "Procastination is a big issue for me",
    "Brazil",
    "If I could, I would move to Canada",
    "My eye color changes between green and blue",
    "Found any bugs? Be sure to tell me in my dms",
    "I am not healthy",
    "My computer only has integrated graphics",
    "I wish I had a CNC machine or a 3D printer",
    "We ran out of facts"
]
facts[facts.length] = "There are currently " + (facts.length + 1) + " fun facts." // I have to add this one in after because I can't access the array's length while it's being declared
facts[facts.length] = "There is a " + Math.floor((1 / facts.length) * 100) + "% chance of getting this fact"
function rand(max) {
    return Math.floor(Math.random() * max) 
}

class BottomBar extends HTMLElement {
    constructor() {
        super()
    }
    connectedCallback() {
        const bar = document.createElement("div")
        bar.className = "bg-neutral-100 dark:bg-neutral-900 w-full flex flex-row-reverse gap-x-6 roboto text-black dark:text-white mt-10"
        bar.style.height = "100px;"
        const contact = contactInfo(bar)
        bar.appendChild(contact)
        const info = document.createElement("h1")
        info.innerText = "Fun Fact:\n" + facts[rand(facts.length)]
        info.classList.add("text-center")
        bar.appendChild(info)
        this.appendChild(bar)
        if (document.body.getBoundingClientRect().height <= window.innerHeight) {
            bar.style.position = "absolute"
            bar.style.bottom = "0px"
            bar.classList.add("popdown")
        }
    }
}
customElements.define("bottom-bar", BottomBar)