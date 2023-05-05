const portuguese = document.getElementById("portuguese-switcher");
addToggle(portuguese, lang == "pt" ? true : false, function (val) {
  console.log(
    "val is " + val + ", and as such, changing to " + (val == true)
      ? "pt"
      : "en"
  );
  changeLang(val == true ? "pt" : "en");
});
