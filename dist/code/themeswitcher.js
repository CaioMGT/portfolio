window.addEventListener("load", () => {
    let button = document.getElementById('theme-switcher')
    if (theme == Enum.LIGHT) {
        button.classList.remove("normal")
        button.classList.add("active")
        button.firstElementChild.classList.add("active")
        button.firstElementChild.classList.remove("normal")
    }
    button.addEventListener("click", () => {
        // tbh I don't remember why I did this way
        if (button.classList.contains("active")) {
            console.log("Switching theme to dark mode")
            button.firstElementChild.classList.remove("active")
            button.firstElementChild.classList.add("normal")
            button.classList.remove("active")
            button.classList.add("normal")
            // The second argument is set to true so it saves it to localStorage
            changetheme(Enum.DARK, true)
        } else {
            console.log("Switching theme to light mode")
            button.firstElementChild.classList.add("active")
            button.firstElementChild.classList.remove("normal")
            button.classList.remove("normal")
            button.classList.add("active")
            // The second argument is set to true so it saves it to localStorage
            changetheme(Enum.LIGHT, true)
        }
    })
})