// Include this in every html file as this is what handles the website theme. DO. NOT. FORGET.
const Enum = {
    LIGHT: 1,
    DARK : 2
}
let theme = localStorage.getItem("Theme")
// This is necessary in case there isn't a set theme, I only noticed this
// was an issue when the dark theme wasn't being applied to the settings cog
// when there isn't a set theme
if (theme == null) {
    theme = Enum.DARK
    localStorage.setItem("Theme", theme)
}
const ThemeChange = new Event("ThemeChange")
changetheme(theme)
function changetheme(theme, set) {
    let html = document.documentElement
    html.dispatchEvent(ThemeChange)
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
