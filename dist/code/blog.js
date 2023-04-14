async function summonPosts() {
    const postList= (await (await fetch("https://api.caiomgt.com/getPosts")).json()).post;
    console.log(postList)
    const box = document.getElementById("postBox")
    for (post of postList) {
        if (post.id != null) {
            // for some reason the response is returning a random prototype
            // along with the posts so i have to do this.
            const postThing = createPostPreview(post)
            console.log(postThing)
            box.appendChild(postThing)
        }
    }
}
async function checkIfAdmin(password) {
    const response = await fetch("https://api.caiomgt.com/validatePassword", {method: "POST", headers:{"Content-Type": "application/json"}, body:JSON.stringify({auth: password})})
    console.log(response.body)
    const json = await response.json()
    return json.auth 
}
function createPostPreview(post) {
    const bg = document.createElement("div")
    const title = document.createElement("h2")
    title.className = "title"
    title.innerText = post.title
    bg.appendChild(title)
    return bg
}
summonPosts()

if (localStorage.getItem("password")) {
    checkIfAdmin(localStorage.getItem('password')).then((thing) => {
        if (thing){
            console.log("your mom")
        } else {
            console.log("not your mom")
        }
    })
}
