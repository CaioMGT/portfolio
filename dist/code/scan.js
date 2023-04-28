const audio = document.createElement("audio");
audio.src = "/audio/scan.wav";
const button = document.getElementById("scan");
const scanned = false;
button.addEventListener("click", function () {
  if (!scanned) {
    const text = document.getElementById("text");
    text.classList.remove("hidden");
    button.hidden = true;
    audio.play();
    audio.addEventListener("ended", function () {
      setTimeout(function () {
        const val = Math.random();
        if (val <= 0.5) {
          // bad
          text.innerText =
            "Fail. GridPrint mismatch. Hold in place and await further instructions. \n (you done goofed)";
        } else {
          // good
          text.innerText =
            "Clear... Thank you for your cooperation Employ. You are clear to proceed.";
        }
      }, 2000);
    });
  }
});
