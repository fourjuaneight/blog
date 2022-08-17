const body: HTMLBodyElement | null = document.querySelector('body');
const gandalf: HTMLImageElement | null =
  document.querySelector('img.party-mode');
let isPartyTime: boolean = false;

if (gandalf) {
  gandalf.addEventListener('click', () => {
    body?.setAttribute('data-party', !isPartyTime);
    gandalf.setAttribute('data-active', !isPartyTime);
    isPartyTime = !isPartyTime;
  });
}
