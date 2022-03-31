import { BKValues } from '../../scripts/types';

interface MessageValues {
  bookmarks: BKValues[];
  isExpired: boolean;
}

const worker = new Worker('/bookmarks.ww.min.js');
const body = document.querySelector('body');
const table = document.querySelector('section.bk-table');
const tableName = body.getAttribute('data-table');
const tableList = document.querySelector(
  `ul[data-category="${tableName?.toLowerCase()}"]`
);
const loader = document.querySelector('svg#loader');
const fragment = document.createDocumentFragment();

const loadBookmarkToDOM = bookmark => {
  // create element
  const wrap = document.createElement('li');
  const title = document.createElement('a');
  const creator = document.createElement('p');
  const tags = document.createElement('p');

  // set attributes
  wrap.classList.add(
    'bk-cell',
    'border-solid',
    'duration-200',
    'ease-in-out',
    'grid',
    'grid-rows-1',
    'm-0',
    'p-0',
    'transition-all',
    'w-full'
  );
  title.classList.add(
    'col-start-1',
    'focus:no-underline',
    'hove:no-underline',
    'm-0',
    'no-underline',
    'p-0',
    'px-2',
    'w-full',
    'whitespace-nowrap'
  );
  title.setAttribute('title', bookmark.title);
  title.setAttribute('href', bookmark.url);
  title.setAttribute('target', '_blank');
  title.setAttribute('rel', 'noopener noreferrer');
  creator.classList.add('col-start-2', 'm-0', 'p-0', 'px-2', 'w-full');
  tags.classList.add(
    'col-start-3',
    'm-0',
    'overflow-hidden',
    'p-0',
    'px-2',
    'w-full',
    'whitespace-nowrap'
  );
  tags.setAttribute('title', bookmark.tags);

  // add content
  title.textContent = bookmark.title || bookmark.tweet;
  creator.textContent = bookmark.creator || bookmark.subreddit;
  tags.textContent = bookmark.tags.join(', ');

  // add to fragment
  wrap.appendChild(title);
  wrap.appendChild(creator);
  wrap.appendChild(tags);
  fragment.appendChild(wrap);
};

if (window.Worker) {
  const dbVersion = localStorage.getItem('Bookmarks');
  const tableVersion = localStorage.getItem(tableName);

  worker.postMessage({
    dbVersion: dbVersion ? parseInt(dbVersion) : 1,
    table: {
      name: tableName,
      version: tableVersion ? parseInt(tableVersion) : Date.now(),
      new: !tableVersion,
    },
  });

  worker.onmessage = (evt: MessageEvent<MessageValues>) => {
    // remove loader
    loader.remove();

    // show ui
    table.setAttribute('data-loaded', 'true');

    // generate bookmark elements
    for (const item of evt.data.bookmarks) {
      loadBookmarkToDOM(item);
    }

    // add to DOM
    tableList.appendChild(fragment);

    // set db and table versions
    localStorage.setItem('Bookmarks', evt.data.dbVersion);

    if (evt.data.isExpired) {
      localStorage.setItem(tableName, Date.now());
    }
  };
}
