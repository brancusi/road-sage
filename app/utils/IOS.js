export function openTab(url) {
  // Create link in memory
  var a = window.document.createElement("a");
  a.target = '_blank';
  a.href = url;

  // Dispatch fake click
  var e = window.document.createEvent("MouseEvents");
  e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  a.dispatchEvent(e);

  window.document.removeChild(a);
}
