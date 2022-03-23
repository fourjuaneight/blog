const worker = new Worker('/bookmarks.ww.min.js');
const body = document.querySelector('body');
const tableName = body.getAttribute('data-table');

if (window.Worker) {
  worker.postMessage(tableName);

  worker.onmessage = (evt: MessageEvent<string>) => {
    localStorage.setItem(tableName, evt.data);
  };
}
