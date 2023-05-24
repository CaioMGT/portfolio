const apiUrl = "https://api.caiomgt.com/";
const postId = new URL(document.location).searchParams.get("id");
let post;
var day;
let domLoaded = false;
let postLoaded = false;
function populatePage() {
  document.title = post.title;
  document.getElementById("title").innerText = post.title;
  const date = new Date(post.postDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  const dateString =
    day + "/" + month + "/" + date.getFullYear() + " at " + hour + ":" + minute;
  document.getElementById("date").innerText = dateString;
  const box = document.getElementById("postBox");
  box.attachShadow({ mode: "open" });
  box.innerText = "";
  box.shadowRoot.innerHTML = marked.parse(post.content);
  const codeStyle = document.createElement("link");
  codeStyle.rel = "stylesheet";
  if (theme == Enum.DARK) {
    codeStyle.href =
      "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github-dark.min.css";
  } else {
    codeStyle.href =
      "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github.min.css";
  }
  const postStyle = document.createElement("link");
  postStyle.rel = "stylesheet";
  postStyle.href = "/post.css";
  updateBottomBarPos();
  let blocks = box.shadowRoot.querySelectorAll("pre code");
  for (let i = 0; i < blocks.length; i++) {
    hljs.highlightElement(blocks[i]);
  }
  box.shadowRoot.appendChild(postStyle);
  box.shadowRoot.appendChild(codeStyle);
}
async function getPost() {
  console.log(postId);
  thing = await fetch(apiUrl + "getPost", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ id: postId }),
  });
  const json = await thing.json();
  post = json.post;
  postLoaded = true;
}
getPost().then(function () {
  console.log("loaded post. dom loaded? " + domLoaded);
  if (domLoaded) {
    populatePage();
  }
});
window.addEventListener("load", function () {
  domLoaded = true;
  console.log("loaded dom. post loaded? " + postLoaded);
  if (postLoaded) {
    populatePage();
  }
});
