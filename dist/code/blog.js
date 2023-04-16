async function summonPosts() {
  const postList = (
    await (await fetch("https://api.caiomgt.com/getPosts")).json()
  ).post;
  const box = document.getElementById("postBox");
  for (post of postList) {
    if (post.id != null) {
      // for some reason the response is returning a random prototype
      // along with the posts so i have to do this.
      const postThing = createPostPreview(post);
      console.log(postThing);
      box.appendChild(postThing);
    }
  }
}
async function checkIfAdmin(password) {
  const hash = await getSHA256Hash(password);
  console.log(hash);
  const response = await fetch("https://api.caiomgt.com/validatePassword", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ auth: hash }),
  });
  console.log(response.body);
  const json = await response.json();
  console.log(json);
  return json.auth;
}
const getSHA256Hash = async (input) => {
  const textAsBuffer = new TextEncoder().encode(input);
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", textAsBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hash = hashArray
    .map((item) => item.toString(16).padStart(2, "0"))
    .join("");
  return hash;
};
function createPostPreview(post) {
  const bg = document.createElement("div");
  const title = document.createElement("h2");
  title.className = "title";
  title.innerText = post.title;
  bg.appendChild(title);
  return bg;
}
summonPosts();

if (localStorage.getItem("password")) {
  checkIfAdmin(localStorage.getItem("password")).then((thing) => {
    if (thing) {
      // Is admin, un-hide create / delete post buttons.
      document.getElementById("createPost").classList.remove("hidden");
    } else {
      console.log("not your mom");
    }
  });
}
