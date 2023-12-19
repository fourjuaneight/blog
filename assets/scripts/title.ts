const siteTitle: HTMLSpanElement | null = document.querySelector('#site-title');
const date = new Date().toISOString().replace(/T.*/g, '');

const dateHex = (date: string) =>
  date
    .match(/\d{2,4}/g)
    .map(Number)
    .map(char => char.toString(16))
    .join('');

if (siteTitle) {
  const hex = dateHex(date);

  siteTitle.setAttribute('data-loaded', 'true');
  siteTitle.setAttribute('data-text', hex);
  siteTitle.innerText = hex;
}
