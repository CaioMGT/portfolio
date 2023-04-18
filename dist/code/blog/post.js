const postId = new URL(document.location).searchParams.get("id");
let post;
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
});
