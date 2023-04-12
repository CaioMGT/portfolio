let box = document.getElementById("postBox")
const getPosts = new XMLHttpRequest()
let postList
function createPostPreview(post) {
    const bg = document.createElement("div")
    const title = document.createElement("h2")
    title.className = ""
    title.innerText = post.title
    bg.appendChild(title)
    return bg
}
getPosts.open("POST", "https://api.caiomgt.com")
getPosts.send(JSON.stringify({"type": "list"}))
getPosts.onload = function() {
    postList = JSON.parse(getPosts.responseText).posts
    console.log(postList)
    for (post of postList) {
        if (post.id) {
            // for some reason the response is returning a random prototype
            // along with the posts so i have to do this.
            const postThing = createPostPreview(post)
            box.appendChild(postThing)
        }
    }
}