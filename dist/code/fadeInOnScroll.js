function onIntersect(entries, observe) {
    entries.forEach((entry) => {
        // This is what determines whether the element is on screen
        // or not, it took me quite a while to figure it out...
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
    // This is what actually registers the elements to be observed. 
    // In this case, I'm using a for of loop to loop through
    // all elements with the "fade-in-section" class.
    let classes = document.getElementsByClassName("fade-in-section")
    for (item of classes) {
        observer.observe(item)
    }
})