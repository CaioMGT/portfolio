window.addEventListener("load", () => {
    let button = document.getElementById('theme-switcher')
    if (theme == Enum.DARK) {
        button.innerText = "Enable Light Mode"
    } else {
        button.innerText = "Enable Dark Mode"
    }
    button.addEventListener("click", () => {
        if (theme == Enum.LIGHT) {
            console.log("Switching theme to dark mode")
            theme = Enum.DARK
            changetheme(Enum.DARK, true)
            button.innerText = "Enable Light Mode"
        } else {
            console.log("Switching theme to light mode")
            theme = Enum.LIGHT
            changetheme(Enum.LIGHT, true)
            button.innerText = "Enable Dark Mode"
        }
    })
})