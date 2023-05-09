// This is a comma separated list (with no spaces) of all supported languages.
// if you want to add another, make sure to add it to this list.
// Make sure that the language name matches the folder name you have in translations,
// after that, bump the version number under ver.json and change the one in
// /en/global.json accordingly, so the cache gets invalidated.
const languages = "en,pt";
// --------------------------------------Do not modify past this--------------------------------------
let languageCount = 0;
let loadedLanguages = 0;
let languagesLoaded = false;
const elements = [];
let lang = localStorage.getItem("lang") || "en";
let cacheJSON = localStorage.getItem("cache");
let cache = JSON.parse(cacheJSON);
const translations = {};
// Always call this function to fetch translations
// I was going to make it hard-coded but decided that
// It's best if you can decide what files to use
// per page, so you won't have to cram everything
// into the same json file.
async function checkCache(json, fileName) {
  if (loadedLanguages != languageCount) {
    console.log(
      "Waiting for lang files to load \n This may cause text to not appear temporarily."
    );
    await waitFor(() => languagesLoaded == true);
    checkCache(json, cache, fileName);
    return;
  }
  const ver = cache["en"]["global.json"]["version"];
  console.log(
    "cache's version is " + ver + ", uncached version is " + json.version
  );
  if (json.version > ver || ver == undefined) {
    console.log("invalidating cache");
    fetchTranslations(fileName, true);
    changeLang(lang);
  }
}
function fetchTranslations(fileName, ignoreCache) {
  if (ignoreCache) {
    cacheJSON = undefined;
    cache = undefined;
    loadedLanguages = 0;
    languageCount = 0;
    languagesLoaded = false;
  }
  for (currentLang of languages.split(",")) {
    console.log("iterating thru " + currentLang);
    let globalCached;
    let fileCached;
    let global;
    let file;
    if (!(cacheJSON == undefined)) {
      const langIndex = cache[currentLang];
      if (!(langIndex == undefined)) {
        // There is something cached for this language
        global = langIndex["global.json"];
        file = langIndex[fileName];
        if (!(global == undefined)) {
          globalCached = true;
        }
        if (!(file == undefined)) {
          fileCached = true;
        }
      }
    }
    languageCount += 2;
    const actualLang = currentLang;
    if (!fileCached) {
      fetch("translations/" + actualLang + "/" + fileName).then(function (val) {
        val.json().then(function (json) {
          console.log(
            "fetching cache for " + fileName + " in lang " + actualLang
          );
          translations[actualLang] = { ...translations[actualLang], ...json };
          if (cache == undefined) {
            console.log("undefined cache");
            cache = {};
          }
          if (cache[actualLang] == undefined) {
            console.log("undefined cache lang");
            cache[actualLang] = {};
          }
          cache[actualLang][fileName] = json;
          localStorage.setItem("cache", JSON.stringify(cache));
          loadedLanguages++;
          if (loadedLanguages == languageCount) {
            languagesLoaded = true;
            console.log("all languages loaded!");
          }
        });
      });
    } else {
      // is cached, use cache instead.
      console.log(fileName + " is cached, using cache");
      translations[lang] = { ...translations[lang], ...file };
      loadedLanguages++;
      if (loadedLanguages == languageCount) {
        languagesLoaded = true;
        console.log("all languages loaded!");
      }
    }

    if (!globalCached) {
      fetch("translations/" + actualLang + "/global.json").then(function (val) {
        val.json().then(function (json) {
          console.log("fetching cache for global.json in lang " + actualLang);
          translations[actualLang] = { ...translations[actualLang], ...json };
          if (cache == undefined) {
            console.log("undefined cache");
            cache = {};
          }
          if (cache[actualLang] == undefined) {
            console.log("undefined cache lang");
            cache[actualLang] = {};
          }
          cache[actualLang]["global.json"] = json;
          localStorage.setItem("cache", JSON.stringify(cache));
          loadedLanguages++;
          if (loadedLanguages == languageCount) {
            languagesLoaded = true;
            console.log("all languages loaded!");
          }
        });
      });
    } else {
      // is cached, use cache instead.
      console.log("global.json is cached, using cache");
      translations[currentLang] = { ...translations[currentLang], ...global };
      loadedLanguages++;
      if (loadedLanguages == languageCount) {
        languagesLoaded = true;
        console.log("all languages loaded!");
      }
    }
  }
  fetch("translations/ver.json").then(function (res) {
    res.json().then(function (json) {
      console.log("checking cache");
      checkCache(json, fileName);
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
  if (loadedLanguages != languageCount) {
    console.log(
      "Waiting for lang files to load \n This may cause text to not appear temporarily."
    );
    await waitFor(() => languagesLoaded == true);
    update(transText);
    return;
  }
  string = translations[lang][transText.id];
  if (string == null) {
    console.log(
      "Could not find translation key " +
        transText.id +
        " in language " +
        lang +
        ", falling back to english."
    );
    string = translations["en"][transText.id];
  }
  transText.innerText = string;
}
// Call this function to change the current language.
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
