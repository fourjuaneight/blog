// assets/workers/bookmarks.ts
var worker = new Worker("/bookmarks.ww.min.js");
var body = document.querySelector("body");
var tableName = body.getAttribute("data-table");
if (window.Worker) {
  worker.postMessage(tableName);
  worker.onmessage = (evt) => {
    localStorage.setItem(tableName, evt.data);
  };
}
