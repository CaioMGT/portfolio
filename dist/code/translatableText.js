const elements = [];
let lang = localStorage.getItem("lang") || "en";
let en;
let pt;
fetch("en-us.json").then(function (val) {
  val.json().then(function (json) {
    en = json;
  });
});
fetch("pt-br.json").then(function (val) {
  val.json().then(function (json) {
    pt = json;
  });
});
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
    console.log("waiting for lang files to load");
    await waitFor(() => !(en == undefined) && !(pt == undefined));
    update(transText);
    return;
  }
  if (lang == "en") {
    string = en[transText.id];
  } else if (lang == "pt") {
    string = pt[transText.id];
  }
  console.log("string is " + string);
  transText.innerText = string;
}
function changeLang(Lang) {
  lang = Lang;
  console.log(elements);
  elements.forEach(function (element) {
    console.log("found element " + element);
    update(element);
  });
}
class transText extends HTMLElement {
  constructor() {
    super();
  }
  async connectedCallback() {
    elements.push(this);
    console.log("added to elements " + elements[this.id]);
    update(this);
  }
}
customElements.define("trans-text", transText);
