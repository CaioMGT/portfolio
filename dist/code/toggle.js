let buttons = [];
function addToggle(eee, defaultValue, callback) {
  buttons[eee.id] = callback;
  console.log("adding event listener to " + eee.localName);
  if (defaultValue) {
    eee.firstElementChild.classList.add("active");
    eee.firstElementChild.classList.remove("normal");
    eee.classList.remove("normal");
    eee.classList.add("active");
  } else {
    eee.firstElementChild.classList.remove("active");
    eee.firstElementChild.classList.add("normal");
    eee.classList.remove("active");
    eee.classList.add("normal");
  }
  buttons[eee.id](defaultValue);
  eee.addEventListener("click", function () {
    if (eee.classList.contains("active")) {
      eee.firstElementChild.classList.remove("active");
      eee.firstElementChild.classList.add("normal");
      eee.classList.remove("active");
      eee.classList.add("normal");
      buttons[eee.id](false);
    } else {
      eee.firstElementChild.classList.add("active");
      eee.firstElementChild.classList.remove("normal");
      eee.classList.remove("normal");
      eee.classList.add("active");
      buttons[eee.id](true);
    }
  });
}
