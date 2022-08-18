const body: HTMLBodyElement | null = document.querySelector('body');
const partyMode: HTMLButtonElement | null =
  document.querySelector('button.party-mode');
let isPartyTime: boolean = false;

if (partyMode) {
  partyMode.addEventListener('click', () => {
    body?.setAttribute('data-party', !isPartyTime);
    partyMode.setAttribute('data-active', !isPartyTime);
    isPartyTime = !isPartyTime;
  });
}
