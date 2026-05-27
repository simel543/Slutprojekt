// Enkel kontroll av svar med färgmarkering (grönt = korrekt, rött = felvalt)
(function () {
  function clearStyles(name) {
    const inputs = document.querySelectorAll('input[name="' + name + '"]');
    inputs.forEach((input) => {
      const label = input.closest("label") || input.parentElement;
      if (label) {
        label.style.backgroundColor = "";
        label.style.color = "";
      }
    });
  }

  function markQuestion(name, correctValue) {
    const inputs = document.querySelectorAll('input[name="' + name + '"]');
    inputs.forEach((input) => {
      const label = input.closest("label") || input.parentElement;
      if (!label) return;
      if (input.value === correctValue) {
        label.style.backgroundColor = "#c8e6c9";
        label.style.color = "#000";
      } else {
        if (input.checked && input.value !== correctValue) {
          label.style.backgroundColor = "#ffcdd2";
          label.style.color = "#000";
        } else {
          label.style.backgroundColor = "";
          label.style.color = "";
        }
      }
    });
  }

  function setupQuiz(buttonId, answers, resultId) {
    const btn = document.getElementById(buttonId);
    if (!btn) return;
    btn.addEventListener("click", function () {
      for (const q in answers) {
        clearStyles(q);
      }

      let score = 0;
      for (const q in answers) {
        const input = document.querySelector('input[name="' + q + '"]:checked');
        if (input && input.value === answers[q]) score++;
        markQuestion(q, answers[q]);
      }
      const resultEl = document.getElementById(resultId);
      if (resultEl) resultEl.textContent = "Du fick " + score + " av 3 rätt.";
    });
  }

  // Koppla quiz-knappar till svarsättningarna
  setupQuiz("checkanalytisk", { q1: "b", q2: "b", q3: "c" }, "resultanalytisk");
  setupQuiz("checkmaterial", { q1: "a", q2: "a", q3: "b" }, "resultmaterial");
  setupQuiz("checkbindning", { q1: "b", q2: "b", q3: "b" }, "resultbindning");
  setupQuiz("checkreaktion", { q1: "b", q2: "c", q3: "c" }, "resultreaktion");
  setupQuiz("checkkaraktär", { q1: "b", q2: "a", q3: "b" }, "resultkaraktär");
  setupQuiz("checkstruktur", { q1: "b", q2: "b", q3: "b" }, "resultstruktur");
  setupQuiz("checkstoto", { q1: "b", q2: "c", q3: "a" }, "resultstoto");

  // Hjälpfunktion för sanering av text
  function rensaText(text) {
    return String(text).replace(/</g, "").replace(/>/g, "").trim();
  }

  // Hantera övningsformulär (om det finns i HTML)
  const ovningsformular = document.getElementById("ovningsformular");
  const ovningsfalt = document.getElementById("ovningsfalt");
  const ovningsresultat = document.getElementById("ovningsresultat");

  if (ovningsformular) {
    ovningsformular.addEventListener("submit", (event) => {
      event.preventDefault();
      const sakerText = rensaText(ovningsfalt ? ovningsfalt.value : "");

      if (sakerText === "") {
        if (ovningsresultat)
          ovningsresultat.textContent =
            "Skriv ett område som du vill öva mer på.";
        return;
      }

      if (ovningsresultat)
        ovningsresultat.textContent = `Du vill öva mer på: ${sakerText}`;
      if (ovningsfalt) ovningsfalt.value = "";
    });
  }
})();
