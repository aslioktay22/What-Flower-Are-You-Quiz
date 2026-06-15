const flowerResults = {
  sunflower: {
    name: "Sunflower — The Radiant Soul",
    description:
      "You shine with warmth wherever you go. People feel safe, welcomed, and uplifted around you."
  },
  wisteria: {
    name: "Wisteria — The Dreaming Wanderer",
    description:
      "Your mind floats toward wonder, imagination, and quiet adventure."
  },
  bleedingHeart: {
    name: "Bleeding Heart — The Tender Romantic",
    description:
      "You feel deeply and sincerely. You understand emotions in a rare, intuitive way."
  },
  lilyOfTheValley: {
    name: "Lily of the Valley — The Passionate Enigma",
    description:
      "Soft on the surface, intense underneath. Loyal, artistic, and quietly powerful."
  },
  moonflower: {
    name: "Moonflower — The Tranquil Thinker",
    description:
      "Calm, observant, and thoughtful — a peaceful presence in a chaotic world."
  },
  spiderlily: {
    name: "Spiderlily — The Shadowed Realist",
    description:
      "Sharp, pragmatic, and slightly dark-humored. You see truth clearly and act decisively."
  }
}

const resultPages = {
  sunflower: "../Results/sunflower.html",
  wisteria: "../Results/wisteria.html",
  bleedingHeart: "../Results/bleedingheart.html",
  lilyOfTheValley: "../Results/lilyofthevalley.html",
  moonflower: "../Results/moonflower.html",
  spiderlily: "../Results/spiderlily.html"
};

// =======================
// ANSWER → FLOWER MAPS
// (Index order MUST match <li>s)
// =======================

const answerMappings = [
  // Q1
  ["sunflower", "wisteria", "bleedingHeart", "lilyOfTheValley", "moonflower", "spiderlily"],

  // Q2
  ["bleedingHeart", "sunflower", "lilyOfTheValley", "wisteria", "moonflower", "spiderlily"],

  // Q3
  ["sunflower", "spiderlily", "wisteria", "lilyOfTheValley", "moonflower", "bleedingHeart"],

  // Q4
  ["moonflower", "spiderlily", "bleedingHeart", "wisteria", "lilyOfTheValley", "sunflower"],

  // Q5
  ["bleedingHeart", "sunflower", "moonflower", "lilyOfTheValley", "spiderlily", "wisteria"],

  // Q6
  ["sunflower", "wisteria", "lilyOfTheValley", "moonflower", "bleedingHeart", "spiderlily"],

  // Q7
  ["bleedingHeart", "wisteria", "moonflower", "spiderlily", "lilyOfTheValley", "sunflower"],

  // Q8
  ["lilyOfTheValley", "bleedingHeart", "sunflower", "spiderlily", "wisteria", "moonflower"],

  // Q9
  ["wisteria", "sunflower", "bleedingHeart", "moonflower", "lilyOfTheValley", "spiderlily"],

  // Q10
  ["wisteria", "spiderlily", "bleedingHeart", "sunflower", "lilyOfTheValley", "sunflower", "moonflower"]
];

// =======================
// SELECTING ANSWERS
// =======================

// Add click behavior to all <li> choices
const allQuestions = document.querySelectorAll("section ul");

allQuestions.forEach((ul, qIndex) => {
  const choices = ul.querySelectorAll("li");

  choices.forEach((li, i) => {
    li.addEventListener("click", () => {
      // remove selection from other answers in same question
      choices.forEach(li2 => li2.classList.remove("selected"));

      // mark the clicked one
      li.classList.add("selected");
    });
  });
});

// =======================
// CALCULATE RESULT
// =======================

function calculateResult() {
  // Initialize all scores to 0
  const scores = {
    sunflower: 0,
    wisteria: 0,
    bleedingHeart: 0,
    lilyOfTheValley: 0,
    moonflower: 0,
    spiderlily: 0
  };

  allQuestions.forEach((ul, qIndex) => {
    const selected = ul.querySelector("li.selected");

    if (!selected) return; // user didn't answer the question

    const selectedIndex = Array.from(ul.children).indexOf(selected);
    const flowerKey = answerMappings[qIndex][selectedIndex];

    scores[flowerKey] += 1;
  });

  return scores;
}

// =======================
// FIND TOP RESULT
// =======================

function findBestFlower(scores) {
  let bestKey = null;
  let bestScore = -1;

  for (const key in scores) {
    if (scores[key] > bestScore) {
      bestScore = scores[key];
      bestKey = key;
    }
  }

  return bestKey;
}

// =======================
// SHOW RESULT ON PAGE
// =======================

document.getElementById("submit-btn").addEventListener("click", () => {

  // Check for unanswered questions
  const unanswered = [];

  allQuestions.forEach((ul, index) => {
    const selected = ul.querySelector("li.selected");
    if (!selected) {
      unanswered.push(index + 1); // store 1-based question index
    }
  });

  // If any are unanswered, stop and alert
  if (unanswered.length > 0) {
    alert(
      "Please answer all questions before seeing your flower result.\n\n" +
      "You still need to answer: Question(s) " + unanswered.join(", ")
    );
    return; // STOP HERE
  }

  // All questions answered — now calculate result normally
  const scores = calculateResult();
  const bestFlower = findBestFlower(scores);

  const targetUrl = resultPages[bestFlower];

  if (targetUrl) {
    window.location.href = targetUrl;
  } else {
    alert("Oops — I couldn't find a result page for that flower.");
  }

});