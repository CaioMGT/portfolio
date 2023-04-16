// Preview
const editBox = document.getElementById("editBox");
const previewBox = document.getElementById("previewBox");
const shadowOpen = previewBox.attachShadow({ mode: "open" });
editBox.addEventListener("input", function () {
  previewBox.shadowRoot.innerHTML = marked.parse(editBox.value);
  console.log("changin input");
});
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
  fetch("https://api.caiomgt.com/getPosts").then(function (val) {
    val.json().then(function (json) {
      console.log(json);
      let big = 0;
      for (post in json.post) {
        if (big < post.id) {
          big = post.id;
        }
      }
      id = big++;
      console.log("post id will be " + id);
      getSHA256Hash(localStorage.getItem("password")).then(function (password) {
        const json = JSON.stringify({
          id: id,
          title: title,
          desc: desc,
          content: content,
          postDate: postDate,
          auth: password,
        });
        console.log(json);
        fetch("https://api.caiomgt.com/publishPost", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: json,
        }).then((val) => {
          val.json().then(function (json) {
            console.log(json);
          });
        });
      });
    });
  });
});
