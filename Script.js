const quizData = [
  {
    question: "Which language runs in a web browser?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
  },
  {
    question: "What does CSS stand for?",
    a: "Central Style Sheets",
    b: "Cascading Style Sheets",
    c: "Coded Style Sheets",
    d: "Colorful Style Sheets",
    correct: "b",
  },
  {
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Hyperloop Machine Language",
    c: "Hyperlink Machine Language",
    d: "Helicopters Terminals Motorboats Lamborghinis",
    correct: "a",
  }
];

let currentQuiz = 0;
let score = 0;

const welcomeEl = document.getElementById("welcome");
const questionEl = document.getElementById("question");
const answerEls = document.querySelectorAll(".answer");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

// Set welcome name
if (welcomeEl) {
  const username = localStorage.getItem("quizUsername") || "Guest";
  welcomeEl.innerText = `Welcome, ${username}!`;
}

function loadQuiz() {
  deselectAnswers();
  const currentQuizData = quizData[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function deselectAnswers() {
  answerEls.forEach(el => el.checked = false);
}

function getSelected() {
  let answer;
  answerEls.forEach(el => {
    if (el.checked) {
      answer = el.id;
    }
  });
  return answer;
}

if (submitBtn) {
  loadQuiz();

  submitBtn.addEventListener("click", () => {
    const answer = getSelected();
    if (answer) {
      if (answer === quizData[currentQuiz].correct) {
        score++;
      }
      currentQuiz++;
      if (currentQuiz < quizData.length) {
        loadQuiz();
      } else {
        document.getElementById("quiz-box").innerHTML = `
          <h2>Thank you, ${localStorage.getItem("quizUsername")}!</h2>
          <p>Your score: ${score} / ${quizData.length}</p>
          <button onclick="window.location.href='index.html'">Logout</button>
        `;
      }
    } else {
      alert("Please select an answer.");
    }
  });
}
