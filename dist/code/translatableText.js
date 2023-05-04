const elements = [];
let lang = localStorage.getItem("lang") || "en";
let en;
let pt;
// Always call this function to fetch translations
// I was going to make it hard-coded but decided that
// It's best if you can decide what files to use
// per page, so you won't have to cram everything
// into the same json file.
function fetchTranslations(enPath, ptPath) {
  fetch(enPath).then(function (val) {
    val.json().then(function (json) {
      en = json;
    });
  });
  fetch(ptPath).then(function (val) {
    val.json().then(function (json) {
      pt = json;
    });
  });
}
// Gotta do this since it takes time to fetch the json files.
// Can't just await everything since this isn't a module
// and that would just error
function waitFor(conditionFunction) {
  const poll = (resolve) => {
    if (conditionFunction()) resolve();
    else setTimeout((_) => poll(resolve), 400);
  };

  return new Promise(poll);
}
async function update(transText) {
  let string;
  if (en == undefined || pt == undefined) {
    console.log(
      "Waiting for lang files to load \n This may cause text to not appear temporarily."
    );
    await waitFor(() => !(en == undefined) && !(pt == undefined));
    update(transText);
    return;
  }
  if (lang == "en") {
    string = en[transText.id];
  } else if (lang == "pt") {
    string = pt[transText.id];
  }
  transText.innerText = string;
}
// Call this function to change the current language.
// Accepted values are 'en' or 'pt'
function changeLang(Lang) {
  lang = Lang;
  localStorage.setItem("lang", lang);
  elements.forEach(function (element) {
    update(element);
  });
}
class transText extends HTMLElement {
  constructor() {
    super();
  }
  async connectedCallback() {
    elements.push(this);
    this.innerText = "Waiting for translations to load.";
    update(this);
  }
}
customElements.define("trans-text", transText);
