// Preview
const apiUrl = "https://api.caiomgt.com/";
const postId = new URL(document.location).searchParams.get("edit");
const editBox = document.getElementById("editBox");
const previewBox = document.getElementById("previewBox");
const shadowOpen = previewBox.attachShadow({ mode: "open" });
editBox.addEventListener("input", function () {
  previewBox.shadowRoot.innerHTML = marked.parse(editBox.value);
  console.log("changin input");
});
let editing = false;
if (postId != null) {
  editing = true;
  fetch(apiUrl + "getPost", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: postId }),
  }).then(function (response) {
    response.json().then(function (json) {
      console.log(json);
      editBox.value = json.post.content;
      document.getElementById("title").value = json.post.title;
      document.getElementById("desc").value = json.post.desc;
    });
  });
}
// Submit stuff
const getSHA256Hash = async (input) => {
  const textAsBuffer = new TextEncoder().encode(input);
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", textAsBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hash = hashArray
    .map((item) => item.toString(16).padStart(2, "0"))
    .join("");
  return hash;
};
document.getElementById("submit").addEventListener("click", function () {
  const title = document.getElementById("title").value;
  const desc = document.getElementById("desc").value;
  const content = editBox.value;
  const postDate = new Date();
  let id;
  if (editing) {
    getSHA256Hash(localStorage.getItem("password")).then(function (password) {
      const json = JSON.stringify({
        id: postId,
        content: content,
        auth: password,
      });
      fetch(apiUrl + "updatePost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: json,
      }).then((val) => {
        val.json().then(function (json) {
          console.log(json);
          document.getElementById("popup").classList.add("open");
        });
      });
    });
  } else {
    fetch(apiUrl + "getPosts").then(function (val) {
      val.json().then(function (json) {
        id = json.post.length;
        console.log("post id will be " + id);
        getSHA256Hash(localStorage.getItem("password")).then(function (
          password
        ) {
          const json = JSON.stringify({
            id: id,
            title: title,
            desc: desc,
            content: content,
            postDate: postDate,
            auth: password,
          });
          console.log(json);
          fetch(apiUrl + "publishPost", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: json,
          }).then((val) => {
            val.json().then(function (json) {
              console.log(json);
              document.getElementById("popup").classList.add("open");
            });
          });
        });
      });
    });
  }
});
