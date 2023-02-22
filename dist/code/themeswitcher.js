window.addEventListener("load", () => {
    let button = document.getElementById('theme-switcher')
    button.addEventListener("click", () => {
        if (theme == Enum.LIGHT) {
            console.log("Switching theme to dark mode")
            theme = Enum.DARK
            changetheme(Enum.DARK, true)
        } else {
            console.log("Switching theme to light mode")
            theme = Enum.LIGHT
            changetheme(Enum.LIGHT, true)
        }
    })
})