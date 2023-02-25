function onIntersect(entries, observe) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            if (!entry.target.classList.contains("is-visible")) {
                entry.target.classList.add("is-visible")
            }
        } else {
            if (entry.target.classList.contains("is-visible")) {
                entry.target.classList.remove("is-visible")
            }
        }
    })
}
let observer = new IntersectionObserver(onIntersect, {threshold:0.2})
window.addEventListener("load", function(){
    let classes = document.getElementsByClassName("fade-in-section")
    for (item of classes) {
        observer.observe(item)
    }
})