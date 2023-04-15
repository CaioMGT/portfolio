const previewBox = document.getElementById("previewBox")
const shadowOpen = previewBox.attachShadow({ mode: "open" });
document.getElementById("editBox").addEventListener("input", function(){
    previewBox.shadowRoot.innerHTML = marked.parse(document.getElementById("editBox").value)
    console.log("changin input")
})