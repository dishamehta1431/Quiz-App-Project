const quizQuestions = [
  {
    question: "What is the capital of India?",
    options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
    correctAnswerIndex: 1,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Venus", "Mars", "Jupiter"],
    correctAnswerIndex: 2,
  },
  // {
  //   question: "Who is known as the Father of the Nation in India?",
  //   options: [
  //     "Mahatma Gandhi",
  //     "Jawaharlal Nehru",
  //     "Sardar Patel",
  //     "Subhas Chandra Bose",
  //   ],
  //   correctAnswerIndex: 0,
  // },
  // {
  //   question: "Which is the largest ocean in the world?",
  //   options: [
  //     "Atlantic Ocean",
  //     "Indian Ocean",
  //     "Arctic Ocean",
  //     "Pacific Ocean",
  //   ],
  //   correctAnswerIndex: 3,
  // },
  // {
  //   question: "How many days are there in a leap year?",
  //   options: ["365", "366", "364", "360"],
  //   correctAnswerIndex: 1,
  // },
];

const quizCard = document.getElementById("quiz-card");
const qnsNum = document.getElementById("qnsNum");
const timeDisplay = document.getElementById("timeDisplay");
const questions = document.getElementById("questions");
const options = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;
let score = 0;
// timeDisplay = [];
let timeLeft = 30;
let timer = null;

let userAnswer = [];
let selectedAnswer = null;
let questionAnswered = false;

function showQuestion() {
  clearInterval(timer);
  selectedAnswer = null;
  questionAnswered = false;
  let currentQns = quizQuestions[currentIndex];
  qnsNum.innerText = `Qns ${currentIndex + 1}/${quizQuestions.length}`;
  questions.innerText = currentQns.question;

  options.innerHTML = "";

  currentQns.options.forEach((option, index) => {
    const col = document.createElement("div");

    col.classList.add("col-md-6");
    const btn = document.createElement("button");
    btn.classList.add("btn", "option-btn");

    btn.innerText = option;
    btn.type = "button";

    btn.onclick = function () {
      if (questionAnswered) return;

      selectedAnswer = index;

      nextQue();
    };

    col.appendChild(btn);
    options.appendChild(col);
  });
  startTimer();
}

showQuestion();

function startTimer() {
  clearInterval(timer);
  timeLeft = 30;
  timeDisplay.innerText = `Time Left: ${timeLeft}`;

  timer = setInterval(() => {
    timeLeft--;
    timeDisplay.innerText = `Time Left: ${timeLeft}`;
    if (timeLeft <= 0) {
      nextQue();
      clearInterval(timer);
      // showQuestion();
    }
  }, 1000);
}

function nextQue(answerIndex = selectedAnswer) {
  if (questionAnswered) return;

  questionAnswered = true;
  clearInterval(timer);

  const currentQns = quizQuestions[currentIndex];

  userAnswer.push({
    qns: currentQns.question,
    selectedAnswer: answerIndex,
    options: currentQns.options,
    correctAnswer: currentQns.correctAnswerIndex,
  });

  if (answerIndex === currentQns.correctAnswerIndex) {
    score++;
  }

  if (currentIndex < quizQuestions.length - 1) {
    currentIndex++;
    showQuestion();
  } else {
    quizResult();
  }
}

function quizResult() {
  clearInterval(timer);

  const quizCard = document.querySelector(".quiz-card");

  quizCard.innerHTML = `
    <div class="card-body summary-txt">
      <h4 class="text-center ">Quiz Result 🎉</h4>

      <h6 class="text-center mt-1">
        Score: ${score}/${quizQuestions.length}
      </h6>


      <ul class="list-group  mt-3">
        ${userAnswer.map((ans, index) => {
          return `
            <li class="list-group-item result-qns">
              <h5>
                Question ${index + 1}: ${ans.qns}
              </h5>

              <p class="mb-2">
                Your Answer:
                ${
                  ans.selectedAnswer !== null
                    ? ans.options[ans.selectedAnswer]
                    : "Not Selected"
                }
              </p>

              <p class="mb-0">
                Correct Answer:
                ${ans.options[ans.correctAnswer]}
              </p>
            </li>
          `;
        })}
      </ul>

    
    </div>
  `;
}
