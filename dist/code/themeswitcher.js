let button = document.getElementById("theme-switcher");
if (theme == Enum.LIGHT) {
  addToggle(button, true, function (active) {
    if (active) {
      changetheme(Enum.LIGHT, true);
    } else {
      changetheme(Enum.DARK, true);
    }
  });
} else {
  addToggle(button, false, function (active) {
    if (active) {
      changetheme(Enum.LIGHT, true);
    } else {
      changetheme(Enum.DARK, true);
    }
  });
}
