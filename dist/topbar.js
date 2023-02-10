//This will be a custom component, since I want it to be easily re-usable in every page (maybe other than in the 404 page?)
class Topbar extends HTMLElement {
    constructor() {
        super()
        // Elements
        const shadow = this.attachShadow({ mode: "open" })
        const bar = document.createElement("div");
        bar.style.width = "100%"
        bar.style.height = "5%"
        // Logic
        
        // Parenting
        shadow.appendChild(bar) // Is this how I'm supposed to do this? I honestly have no idea
        
    }
}
customElements.define("top-nav", Topbar)