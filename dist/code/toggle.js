let buttons = []
function addToggle(button, defaultValue, callback) {
    buttons[button] = callback
    console.log("adding event listener to " + button.localName)
    if (defaultValue) {
        button.firstElementChild.classList.add("active")
        button.firstElementChild.classList.remove("normal")
        button.classList.remove("normal")
        button.classList.add("active")
        buttons[button](true)
    } else {
        button.firstElementChild.classList.remove("active")
        button.firstElementChild.classList.add("normal")
        button.classList.remove("active")
        button.classList.add("normal")
        buttons[button](false)
    }
    callback(defaultValue)
    button.addEventListener("click", function(){
        if (button.classList.contains("active")) {
            button.firstElementChild.classList.remove("active")
            button.firstElementChild.classList.add("normal")
            button.classList.remove("active")
            button.classList.add("normal")
            buttons[button](false)
        } else {
            button.firstElementChild.classList.add("active")
            button.firstElementChild.classList.remove("normal")
            button.classList.remove("normal")
            button.classList.add("active")
            buttons[button](true)
        }
    })
}