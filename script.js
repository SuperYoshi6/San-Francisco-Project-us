let selectedColor = "yellow";
let markedHistory = []; // Array mit allen markierten Wörtern in Reihenfolge

function setColor(color) {
  selectedColor = color;
}

function makeWordsClickable() {
  document.querySelectorAll("p").forEach(p => {
    const words = p.textContent.trim().split(/\s+/); // trennt nur Wörter
    p.innerHTML = ""; // leeren

    words.forEach((word, index) => {
      const span = document.createElement("span");
      span.classList.add("clickable-word");

      // Leerzeichen hinten anhängen – außer beim letzten Wort
      span.textContent = index < words.length - 1 ? word + " " : word;

      p.appendChild(span);
    });
  });

  applyListeners();
}


function applyListeners() {
  let isTouching = false;

  document.addEventListener("mousedown", () => isTouching = true);
  document.addEventListener("mouseup", () => isTouching = false);
  document.addEventListener("touchstart", () => isTouching = true);
  document.addEventListener("touchend", () => isTouching = false);

  document.querySelectorAll(".clickable-word").forEach(span => {
    span.addEventListener("click", () => toggleMark(span));
    span.addEventListener("mouseover", () => {
      if (isTouching) toggleMark(span);
    });
    span.addEventListener("touchmove", e => {
      const touched = document.elementFromPoint(
        e.touches[0].clientX,
        e.touches[0].clientY
      );
      if (touched?.classList.contains("clickable-word")) {
        toggleMark(touched);
      }
    });
  });
}

// ✅ Markieren oder Entfernen + Historie aktualisieren
function toggleMark(span) {
  if (span.style.backgroundColor === selectedColor) {
    span.style.backgroundColor = "";
    markedHistory = markedHistory.filter(el => el !== span);
  } else {
    span.style.backgroundColor = selectedColor;
    markedHistory.push(span);
  }
}

// ✅ Radiergummi-Funktion: löscht zuletzt markiertes Wort
function undoLastMarking() {
  const last = markedHistory.pop(); // Letztes Element entfernen
  if (last) {
    last.style.backgroundColor = "";
  }
}

document.addEventListener("DOMContentLoaded", makeWordsClickable);
