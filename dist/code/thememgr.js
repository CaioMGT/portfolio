// Include this in every html file as this is what handles the website theme. DO. NOT. FORGET.
const Enum = {
    LIGHT: 1,
    DARK : 2
}
let theme = localStorage.getItem("Theme")
const event = new Event("ThemeChange")
changetheme(theme)
function changetheme(theme, set) {
    let html = document.getElementsByTagName("html")[0]
    html.dispatchEvent(event)
    if (set) {
        localStorage.setItem("Theme", theme)
    }
    // It's fine to do it this way since the html element has no other classes
    if (theme == Enum.LIGHT) {
        html.className = ""
        theme = Enum.LIGHT
    } else {
        html.className = "dark"
        theme = Enum.DARK
    }
}
