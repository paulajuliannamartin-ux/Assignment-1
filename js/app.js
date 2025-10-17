/* app.js
- Håller den interaktiva logiken för att få hemsidan att fungera.
- Ska uppdatera bild, fasnamn, och datum baserat på användarens knapptryck.

Så fungerar kopplingarna mellan filerna:
- HTML: har elementen (images, hearder, text, och knappar).
- CSS: ger stil till de elementen på hemsidan.
- JavaSript: söker upp elementen via document.getElementById, och ändrar "properties" (t.ex. img.src, textContent).
*/

/* Bildfiler
Jag har sparat bilder i mappen "images/" med följande namn:
- new-moon.png
- first-quarter.png
- full-moon.png
- last-quarter.png
*/

/* Fick hjälp av ChatGPT med denna kod*/
const phases = [
  { key: 'new', name: 'Nymåne', file: 'images/new-moon.png', offsetDays: 0 },
  { key: 'first', name: 'Första kvarteret', file: 'images/first-quarter.png', offsetDays: 7 },
  { key: 'full', name: 'Fullmåne', file: 'images/full-moon.png', offsetDays: 14 },
  { key: 'last', name: 'Sista kvarteret', file: 'images/last-quarter.png', offsetDays: 21 }
];

/* Hämta element som hemsidan ska ändras. */
const moonImage = document.getElementById('moonImage');
const moonName = document.getElementById('moonName');
const moonDate = document.getElementById('moonDate');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const randomBtn = document.getElementById('randomBtn');


let currentIndex = 0;

/* Hjälpfunktion: formatera datum till 'D MMMM' på svenska. Fick hjälp med denna kod av ChatGPT prompting*/
function formatSwedishDate(dateObj) {
  const options = { day: 'numeric', month: 'long' };
  // Använd svenska lokaler; om inte tillgängligt kommer browser fallback användas.
  return dateObj.toLocaleDateString('sv-SE', options);
}

/* Räkna ut kommande datum för varje fas, skriven av mig och ChatGPT*/
function getDateForOffset(daysFromNow) {
  const today = new Date();
  // Räkna i lokal tid (användarens browser). Om du vill hårdkoda timezone använd serverlogik. Hjälpen med koden kom in här.
  const future = new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysFromNow);
  return future;
}

/* Funktion som renderar aktuell fas. Hjälp av ChatGPT */
function renderPhase(index) {
  const phase = phases[index];
  // Uppdatera bild och text i DOM
  moonImage.src = phase.file;
  moonImage.alt = `${phase.name} bild`;
  moonName.textContent = phase.name;

  // Beräkna och visa ett "kommande datum" för den här fasen
  const dateObj = getDateForOffset(phase.offsetDays);
  moonDate.textContent = formatSwedishDate(dateObj);
}

/* lyssnare för knappar, försökt koda mestadelen själv */
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + phases.length) % phases.length;
  renderPhase(currentIndex);
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % phases.length;
  renderPhase(currentIndex);
});

randomBtn.addEventListener('click', () => {
  currentIndex = Math.floor(Math.random() * phases.length);
  renderPhase(currentIndex);
});

/* Preload bilder för smidigare upplevelse, Hjälp av ChatGPT*/
function preloadImages(list) {
  list.forEach(p => {
    const img = new Image();
    img.src = p.file;
  });
}

/* Init vid sidladdning. Hjälp av ChatGPT */
window.addEventListener('DOMContentLoaded', () => {
  preloadImages(phases);
  renderPhase(currentIndex);
});

