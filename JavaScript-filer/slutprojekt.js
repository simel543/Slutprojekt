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
      // Mark correct option green
      if (input.value === correctValue) {
        label.style.backgroundColor = "#c8e6c9"; // ljusgrön
        label.style.color = "#000";
      } else {
        // Reset non-correct to neutral; if it is selected and wrong, mark red
        if (input.checked && input.value !== correctValue) {
          label.style.backgroundColor = "#ffcdd2"; // ljusröd
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
      // Clear previous styles for all questions in this quiz
      for (const q in answers) {
        clearStyles(q);
      }

      let score = 0;
      for (const q in answers) {
        const input = document.querySelector('input[name="' + q + '"]:checked');
        if (input && input.value === answers[q]) score++;
        // Mark each question after checking
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
})();
