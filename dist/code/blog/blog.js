let isAdmin = false;
let postsLoaded = false;
let domLoaded = false;
let postList;
async function getPosts() {
  postList = (await (await fetch("https://api.caiomgt.com/getPosts")).json())
    .post;
}
function summonPosts(list) {
  const box = document.getElementById("postBox");
  box.innerText = "";
  for (post of list) {
    if (post._id != null) {
      // for some reason the response is returning a random prototype
      // along with the posts so i have to do this.
      const postThing = createPostPreview(post);
      box.appendChild(postThing);
    }
  }
  updateBottomBarPos();
}
getPosts().then(function () {
  postsLoaded = true;
  console.log("loaded posts. is dom loaded? " + domLoaded);
  if (domLoaded) {
    summonPosts(postList);
  }
});
window.addEventListener("load", function () {
  domLoaded = true;
  console.log("loaded dom. is posts loaded? " + postsLoaded);
  if (postsLoaded) {
    summonPosts(postList);
  }
});
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
async function deletePost(postId) {
  const response = await fetch("https://api.caiomgt.com/removePost", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      id: postId,
      auth: await getSHA256Hash(localStorage.getItem("password")),
    }),
  });
  const json = await response.json();
  return json.auth;
}
function createPostPreview(post) {
  const bg = document.createElement("div");
  const title = document.createElement("a");
  title.className = "title";
  title.innerText = post.title;
  title.href = "/blog/post?id=" + post._id;
  const desc = document.createElement("h2");
  desc.innerText = post.desc;
  desc.style.fontSize = "medium";
  desc.style.fontWeight = "300";
  desc.style.fontWeight = "300";
  title.appendChild(desc);
  bg.appendChild(title);
  if (isAdmin) {
    console.log("is admin, creating delete button");
    const del = document.createElement("button");
    del.innerText = "Delete";
    del.style.fontSize = "medium";
    del.className = "deleteButton";
    del.onclick = function () {
      if (deletePost(post._id)) {
        bg.parentNode.removeChild(bg);
      }
    };
    bg.appendChild(del);
  }
  return bg;
}

if (localStorage.getItem("password")) {
  checkIfAdmin(localStorage.getItem("password")).then((thing) => {
    if (thing) {
      // Is admin, un-hide create / delete post buttons.
      isAdmin = true;
      for (element of document.getElementsByClassName("hidden")) {
        console.log(element);
        element.classList.remove("hidden");
      }
    } else {
      console.log("not your mom");
    }
  });
}
