document.addEventListener("DOMContentLoaded", async () => {

const API = "https://github.com/Umkadjabborov/Kahoot-demo-web-site/server";


  /* =====================
     PLAYER + TOPIC
  ===================== */
  const playerName = localStorage.getItem("playerName");
  const topicId = localStorage.getItem("topicId");

  if (!playerName || !topicId) {
    window.location.href = "login.html";
    return;
  }

  /* =====================
     STATE
  ===================== */
  let score = 0;
  let locked = false;
  let questions = [];
  let currentIndex = 0;

  /* =====================
     ELEMENTS (AVVALGIDEK)
  ===================== */
  const cloudStart = document.getElementById("cloud-start");
  const cloudHappy = document.getElementById("cloud-happy");
  const cloudAngry = document.getElementById("cloud-angry");

  const sunStart = document.getElementById("sun-start");
  const sunHappy = document.getElementById("sun-happy");
  const sunAngry = document.getElementById("sun-angry");

  const rain = document.getElementById("rain");

  const questionEl = document.querySelector(".paper.big h2");
  const answerBtns = document.querySelectorAll(".paper.small");

  const scoreEl = document.getElementById("score");
  const timerEl = document.getElementById("timer");
  const playerLabel = document.getElementById("playerLabel");
  


  playerLabel.textContent = playerName;
  scoreEl.textContent = score;

  /* =====================
     TIMER (OLD)
  ===================== */
  let timerInterval;
  let timeLeft = 15;

  function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 15;
    timerEl.textContent = timeLeft;

    timerInterval = setInterval(() => {
      timeLeft--;
      timerEl.textContent = timeLeft;

      if (timeLeft === 0) {
        clearInterval(timerInterval);
        nextQuestion();
      }
    }, 1000);
  }

  /* =====================
     LOAD QUESTIONS (NEW)
  ===================== */
  async function startGame() {
    const res = await fetch(`${API}/api/questions/${topicId}`);
    questions = await res.json();
    loadQuestion();
  }

  function nextQuestion() {
    currentIndex++;
    loadQuestion();
  }

  /* =====================
     LOAD QUESTION (OLD+NEW)
  ===================== */
  function loadQuestion() {
    locked = false;
    startTimer();

    if (currentIndex >= questions.length) {
      finishGame();
      return;
    }

    const q = questions[currentIndex];
    questionEl.textContent = q.question;

    answerBtns.forEach((btn, i) => {
      btn.textContent = q.options[i];
      btn.classList.remove("correct-ui", "wrong-ui");
    });

    cloudStart.classList.remove("hidden");
    cloudHappy.classList.add("hidden");
    cloudAngry.classList.add("hidden");

    sunStart.classList.remove("hidden");
    sunHappy.classList.add("hidden");
    sunAngry.classList.add("hidden");

    rain.classList.add("hidden");
  }

  /* =====================
     ANSWER CLICK (OLD+NEW)
  ===================== */
  answerBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (locked) return;
      locked = true;
      clearInterval(timerInterval);

      cloudStart.classList.add("hidden");
      sunStart.classList.add("hidden");

      const correct =
        btn.textContent === questions[currentIndex].correctAnswer;

      if (correct) {
        score++;
        scoreEl.textContent = score;

        cloudHappy.classList.remove("hidden");
        sunHappy.classList.remove("hidden");
        rain.classList.remove("hidden");

        btn.classList.add("correct-ui");
      } else {
        cloudAngry.classList.remove("hidden");
        sunAngry.classList.remove("hidden");
        btn.classList.add("wrong-ui");
      }

      setTimeout(nextQuestion, 1500);
    });
  });

  /* =====================
     FINISH GAME (OLD STYLE)
  ===================== */
 async function finishGame() {
  clearInterval(timerInterval);

  document.querySelector(".hud").style.display = "none";
  document.querySelector(".cloud-wrapper").style.display = "none";
  document.querySelector(".answers").style.display = "none";

  questionEl.innerHTML = `
    🎉 ${playerName}<br>
    Siz <b>${score}</b> ball to‘pladingiz!
  `;

  document.querySelector(".paper.big").classList.add("final");

  // ✅ RESULT SAQLASH
  await fetch(`${API}/api/result`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: playerName,
      score: score,
      topic: localStorage.getItem("topicId")
    })
  });

  // ✅ RESTART TUGMASINI KO‘RSATISH
  restartBtn.classList.remove("hidden");

  // ✅ NATIJALARNI YUKLASH (agar bo‘lsa)
  loadResults();
}

const restartBtn  = document.getElementById("restartBtn");

restartBtn.addEventListener("click", () => {
  // topic saqlanib qolsin
  localStorage.removeItem("topicId");

  // login / topic sahifaga qaytadi
  window.location.href = "login.html";
});

  

async function loadResults() {
  const res = await fetch(`${API}/api/results`);
  const data = await res.json();

  const list = document.getElementById("resultsList");
  list.innerHTML = "";

  data.forEach((r, i) => {
    const li = document.createElement("li");
    li.textContent = `${i + 1}. ${r.name} — ${r.score} ball`;
    list.appendChild(li);
  });

  document.querySelector(".results").classList.remove("hidden");
}

  /* =====================
     INIT
  ===================== */
  startGame();

});
