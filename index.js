window.onload = () => {
    let button = document.getElementById('theme-switcher')
    button.addEventListener("click", () => {
        console.log("Switching theme")
        if (theme == theme_enum.LIGHT) {
            theme = theme_enum.DARK
            changetheme(theme_enum.DARK, true)
            button.innerText = "Enable Light Mode"
        } else {
            theme = theme_enum.LIGHT
            changetheme(theme_enum.LIGHT, true)
            button.innerText = "Enable Dark Mode"
        }
    })
}
const theme_enum = {
    LIGHT: 1,
    DARK : 2
}
let theme = localStorage.getItem("Theme")
changetheme(theme)


function changetheme(theme, set) {
    let html = document.getElementById("html")
    if (set) {
        localStorage.setItem("Theme", theme)
    }
    if (theme == theme_enum.LIGHT) {
        html.className = ""
    } else {
        html.className = "dark"
    }
}
