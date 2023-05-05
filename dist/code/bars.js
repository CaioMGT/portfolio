// I want this to be easily re-usable in every page (maybe other than in the 404 page?)
let settings;
function createButton(text, href, order) {
  const button = document.createElement("a");
  button.innerText = text;
  button.href = href;
  button.className = "roboto text-black dark:text-white top-button px-2 py-2";
  button.style.borderRadius = "12px";
  button.tabIndex = order;
  button.addEventListener("click", () => {
    if (currentButton) {
      currentButton.classList.remove("activeTop");
      button.classList.add("activeTop");
      currentButton = button;
    }
  });
  return button;
}
function updateSettings() {
  // I'm inverting the colors on dark theme so the icon is more visible.
  // By inverting it, the cog becomes white so it doesn't blend in anymore
  if (theme == Enum.DARK) {
    settings.style = "filter: invert(100%); cursor: pointer;";
  } else {
    settings.style = "cursor: pointer;";
  }
}
let currentButton;
let ready = false;
class Topbar extends HTMLElement {
  static get observedAttributes() {
    return ["active-button"];
  }
  constructor() {
    super();
  }
  connectedCallback() {
    ready = true;
    // Remember: only parent elements in connectedCallback
    let tabIndex = 1;
    const bar = document.createElement("div");
    bar.className = "w-full popup flex flex-row-reverse gap-x-6 roboto ";
    bar.style = `
            height: 40px;
            position: -webkit-sticky; /* safari */
            /*position: sticky;*/
            z-index:100;
            top: 0;
            `;
    settings = document.createElement("img");
    settings.src = "/svg/cog.svg";
    settings.classList.add("mr-4");
    settings.classList.add("pt-1", "pb-1");
    settings.tabIndex = tabIndex;
    settings.alt = "Settings";
    tabIndex++;
    settings.addEventListener("click", () => {
      location.replace("/settings");
    });
    // To understand why, read the comment in updateSettings
    updateSettings();
    document.documentElement.addEventListener("ThemeChange", updateSettings);
    this.buttons = {};
    const aboutme = createButton("About Me", "/", tabIndex);
    tabIndex++;
    this.buttons.aboutme = aboutme;
    const portfolio = createButton("Portfolio", "/portfolio", tabIndex);
    tabIndex++;
    const blog = createButton("Blog", "/blog/index", tabIndex);
    this.buttons.blog = blog;
    bar.appendChild(settings);
    bar.appendChild(aboutme);
    bar.appendChild(portfolio);
    bar.appendChild(blog);
    settings.addEventListener("keydown", function (event) {
      if (event.key == "Enter") {
        location.replace("/settings");
      }
    });
    this.buttons.portfolio = portfolio;
    // This (and attributeChangedCallback) change what button is highlighted.
    // It actually isn't automatic, I have to manually set the active-button
    // per page. If someone knows a better way, hit me up on discord.
    if (this.hasAttribute("active-button")) {
      this.buttons[this.getAttribute("active-button")].classList.add(
        "activeTop"
      );
      currentButton = this.buttons[this.getAttribute("active-button")];
    }
    // Do I need to clean up my elements on disconnectedCallback?
    this.appendChild(bar);
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (ready) {
      if (name == "active-button") {
        this.buttons[newValue].classList.add("activeTop");
        this.buttons[oldValue].classList.remove("activeTop");
        currentButton = this.buttons[newValue];
      }
    }
  }
}
customElements.define("top-nav", Topbar);
function createContainer(img, text, clickable, link) {
  const container = document.createElement("div");
  container.style.width = "200px"; //hopefully this won't break in small screens
  container.style.textAlign = "left";
  const logo = document.createElement("img");
  logo.src = img;
  logo.style.display = "inline";
  logo.style.height = "25px";
  logo.style.width = "25px";
  logo.alt = "";
  const desc = document.createElement("h1");
  desc.innerText = text;
  desc.style.display = "inline";
  desc.classList.add("ml-1");
  desc.classList.add("mr-2");
  if (clickable) {
    logo.addEventListener("click", function () {
      window.open(link, "_blank");
    });
    desc.addEventListener("click", function () {
      window.open(link, "_blank");
    });
    logo.style.cursor = "pointer";
    desc.style.cursor = "pointer";
  }
  container.appendChild(logo);
  container.appendChild(desc);
  return container;
}
// Since the bottom bar will probably have multiple complex divs,
// I chose to separate each one into their own function,
// so the connectedCallback doesn't get too crowded.
function contactInfo(bar) {
  const contact = document.createElement("div");
  contact.className =
    "flex flex-col h-auto roboto content-center items-center z-index:100";
  contact.innerText = "Contact:";
  const discord = createContainer("/svg/discord.svg", "capetaanal#1984");
  const github = createContainer(
    "/svg/github-dark.svg",
    "CaioMGT",
    true,
    "https://github.com/CaioMGT"
  );
  const email = createContainer(
    "/svg/email.svg",
    "caio@caiomgt.com",
    true,
    "mailto:caio@caiomgt.com"
  );
  if (theme == Enum.DARK) {
    github.children[0].src = "/svg/github-white.svg";
    email.children[0].style.filter = "invert(100%)";
  } else {
    github.children[0].src = "/svg/github-dark.svg";
    email.children[0].style.filter = "";
  }
  document.documentElement.addEventListener("ThemeChange", function () {
    if (theme == Enum.DARK) {
      github.children[0].src = "/svg/github-white.svg";
      email.children[0].style.filter = "invert(100%)";
    } else {
      github.children[0].src = "/svg/github-dark.svg";
      email.children[0].style.filter = "";
    }
  });
  window.addEventListener("resize", function () {
    if (document.body.getBoundingClientRect().height <= window.innerHeight) {
      bar.style.position = "absolute";
      bar.style.bottom = "0px";
    } else {
      bar.style.position = "static";
    }
  });
  contact.appendChild(discord);
  contact.appendChild(github);
  contact.appendChild(email);
  return contact;
}
const facts = [
  "fact-1",
  "fact-2",
  "fact-3",
  "fact-4",
  "fact-5",
  "fact-6",
  "fact-7",
  "fact-8",
  "fact-9",
  "fact-10",
  "fact-11",
  "fact-12",
  "fact-13",
  "fact-14",
  "fact-15",
  "fact-16",
  "fact-17",
  "fact-18",
  "fact-19",
  "fact-20",
  "fact-21",
  "fact-22",
  "fact-23",
  "fact-24",
  "fact-25",
  "fact-26",
  "fact-27",
  "fact-28",
  "fact-29",
  "fact-30",
];
function rand(max) {
  return Math.floor(Math.random() * max);
}
function funFactBar() {
  const bar = document.createElement("div");
  bar.style.textAlign = "center";
  const info = document.createElement("trans-text");
  info.id = "fun-fact";
  const fact = document.createElement("trans-text");
  fact.id = facts[rand(facts.length)];
  bar.appendChild(info);
  bar.appendChild(document.createElement("br"));
  bar.appendChild(fact);
  return bar;
}
class BottomBar extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const bar = document.createElement("div");
    bar.className =
      "bg-neutral-100 dark:bg-neutral-900 w-full flex flex-row-reverse gap-x-6 roboto text-black dark:text-white mt-10";
    bar.style.height = "100px;";
    const contact = contactInfo(bar);
    bar.appendChild(contact);
    const funFact = funFactBar();
    bar.appendChild(funFact);
    this.appendChild(bar);
    if (document.body.getBoundingClientRect().height <= window.innerHeight) {
      bar.style.position = "absolute";
      bar.style.bottom = "0px";
      bar.classList.add("popdown");
    }
  }
}
customElements.define("bottom-bar", BottomBar);
