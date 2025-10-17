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
window.addEventListener("DOMContentLoaded", () => {
  // DOM-element
  const moonImage = document.getElementById("moonImage");
  const moonName = document.getElementById("moonName");
  const moonDate = document.getElementById("moonDate");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const randomBtn = document.getElementById("randomBtn");

  // Data: faser
  const phases = [
    { name: "Nymåne", file: "images/new-moon.png", start: 1, end: 7 },
    { name: "Första kvarteret", file: "images/first-quarter.png", start: 8, end: 14 },
    { name: "Fullmåne", file: "images/full-moon.png", start: 15, end: 21 },
    { name: "Sista kvarteret", file: "images/last-quarter.png", start: 22, end: 28 }
  ];

  // Variabel för aktuell dag
  let currentDay = 1;

  //Hjälpfunktion: hitta rätt fas för aktuell dag
  function getPhaseForDay(day) {
    return phases.find(phase => day >= phase.start && day <= phase.end);
  }

  // Uppdatera bild, namn, dag
  function renderMoon() {
    const phase = getPhaseForDay(currentDay);
    if (!phase) {
      console.error("Ingen fas hittades för dag:", currentDay);
      return;
    }
    moonImage.src = phase.file;
    moonImage.alt = phase.name;
    moonName.textContent = phase.name;
    moonDate.textContent = `Dag ${currentDay}`;
    console.log(`Visar ${phase.name} – Dag ${currentDay}`);
  }

  //klicka på knappar
  nextBtn.addEventListener("click", () => {
    currentDay++;
    if (currentDay > 28) currentDay = 1;
    renderMoon();
  });

  prevBtn.addEventListener("click", () => {
    currentDay--;
    if (currentDay < 1) currentDay = 28;
    renderMoon();
  });

  randomBtn.addEventListener("click", () => {
    currentDay = Math.floor(Math.random() * 28) + 1;
    renderMoon();
  });

  //Initiera sidan
  renderMoon();
});
