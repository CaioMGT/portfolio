window.addEventListener("load", () => {
    let button = document.getElementById('theme-switcher')
    if (theme == Enum.LIGHT) {

        button.classList.remove("normal")
        button.classList.add("active")
    }
    button.addEventListener("click", () => {
        if (button.classList.contains("active")) {
            console.log("Switching theme to dark mode")
            button.classList.remove("active")
            button.classList.add("normal")
            changetheme(Enum.DARK, true)
        } else {
            console.log("Switching theme to light mode")
            button.classList.remove("normal")
            button.classList.add("active")
            changetheme(Enum.LIGHT, true)
        }
    })
})