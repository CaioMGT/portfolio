window.onload = () => {
    let button = document.getElementById('theme-switcher')
    if (theme == Enum.DARK) {
        button.innerText = "Enable Light Mode"
    } else {
        button.innerText = "Enable Dark Mode"
    }
    button.addEventListener("click", () => {
        console.log("Switching theme")
        if (theme == Enum.LIGHT) {
            theme = Enum.DARK
            changetheme(Enum.DARK, true)
            button.innerText = "Enable Light Mode"
        } else {
            theme = Enum.LIGHT
            changetheme(Enum.LIGHT, true)
            button.innerText = "Enable Dark Mode"
        }
    })
}