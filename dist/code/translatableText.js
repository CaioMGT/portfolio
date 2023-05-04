const elements = [];
let lang = localStorage.getItem("lang") || "en";
let en = await (await fetch("en-us.json")).json();
let pt = await (await fetch("pt-br.json")).json();

function update(transText) {
  let string;
  if (lang == "en") {
    string = en[transText.id];
  } else {
    string = pt[transText.id];
  }
  console.log("string is " + string);
  transText.innerText = string;
}
export function changeLang(Lang) {
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
  connectedCallback() {
    elements[this.id] = this;
    console.log("added to elements " + elements[this.id]);
    update(this);
  }
}
customElements.define("trans-text", transText);
