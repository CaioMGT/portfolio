const postId = new URL(document.location).searchParams.get("id");
let post;
var day;
async function getPost() {
  console.log(postId);
  thing = await fetch("https://api.caiomgt.com/getPost", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ id: postId }),
  });
  const json = await thing.json();
  post = json.post;
}
getPost().then(function () {
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
});
