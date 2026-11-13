// Only on the English pages at the root: sends visitors whose browser prefers one of the
// other languages to that version. Nothing is stored. Skipped for "?lang=en" (language menu)
// and for clicks within the site, so a chosen language sticks.
(function () {
  var paths = { de: "/de/", fr: "/fr/", it: "/it/", es: "/es/", pt: "/pt-br/", nl: "/nl/", pl: "/pl/" };
  try {
    if (/[?&]lang=/.test(location.search)) return;
    if (document.referrer && new URL(document.referrer).host === location.host) return;
    var langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""];
    for (var i = 0; i < langs.length; i++) {
      var code = String(langs[i]).toLowerCase().slice(0, 2);
      if (code === "en") return;
      if (paths[code]) {
        var sub = location.pathname.indexOf("/privacy") === 0 ? "privacy/" : "";
        location.replace(paths[code] + sub + location.hash);
        return;
      }
    }
  } catch (e) { /* stay on the English page */ }
})();
