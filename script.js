const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');
const questionText = document.getElementById('question');
const answersContainer = document.getElementById('anwers-container');
const scoreText = document.getElementById('score');
const currentQuestionText = document.querySelector('.current-question');
const totalQuestionsText = document.querySelector('.total-questions');
const scoreEndText = document.getElementById('score-end');
const totalQuestionsEndText = document.querySelector('.total-questions-end');
const resultMessage = document.getElementById('result-message');
const progressBar = document.getElementById('progress');

const questions = [
  {
    question: 'Qual jogo vendeu mais cópias na história?',
    answers: ['Minecraft', 'GTA V', 'Tetris', 'Fortnite'],
    correct: 0,
  },
  {
    question: 'Quem é o personagem principal de The Legend of Zelda?',
    answers: ['Zelda', 'Link', 'Ganon', 'Sheik'],
    correct: 1,
  },
  {
    question: 'Qual é o nome do famoso encanador da Nintendo?',
    answers: ['Luigi', 'Wario', 'Mario', 'Toad'],
    correct: 2,
  },
  {
    question: 'Em que ano foi lançado o primeiro jogo da série Call of Duty?',
    answers: ['2003', '2005', '2007', '2009'],
    correct: 0,
  },
  {
    question: 'Qual é o nome do protagonista de God of War?',
    answers: ['Kratos', 'Atreus', 'Zeus', 'Ares'],
    correct: 0,
  },
  {
    question: 'Qual jogo é conhecido por sua frase "It’s dangerous to go alone! Take this."?',
    answers: ['The Legend of Zelda', 'Final Fantasy VII', 'Dark Souls', 'Skyrim'],
    correct: 0,
  },
  {
    question: 'Qual é o nome do criador de Sonic the Hedgehog?',
    answers: ['Shigeru Miyamoto', 'Yuji Naka', 'Hideo Kojima', 'Satoshi Tajiri'],
    correct: 1,
  },
  {
    question: 'Qual é o nome do mundo aberto em The Elder Scrolls V: Skyrim?',
    answers: ['Tamriel', 'Hyrule', 'Azeroth', 'Midgard'],
    correct: 0,
  },
  {
    question: 'Qual é o nome do jogo onde você pode construir e explorar mundos feitos de blocos?',
    answers: ['Terraria', 'Minecraft', 'Roblox', 'Fortnite'],
    correct: 1,
  },
  {
    question: 'Quem é o vilão principal da série Final Fantasy VII?',
    answers: ['Sephiroth', 'Cloud Strife', 'Tifa Lockhart', 'Barret Wallace'],
    correct: 0,
  },
];

let currentQuestion = 0;
let score = 0;

function startQuiz() {
  startScreen.classList.remove('active');
  quizScreen.classList.add('active');
  endScreen.classList.remove('active');

  currentQuestion = 0;
  score = 0;
  scoreText.textContent = score;
  totalQuestionsText.textContent = questions.length;

  showQuestion();
  updateProgressBar();
}

function showQuestion() {
  const q = questions[currentQuestion];
  questionText.textContent = q.question;
  currentQuestionText.textContent = currentQuestion + 1;

  answersContainer.innerHTML = '';

  q.answers.forEach((answer, index) => {
    const btn = document.createElement('button');
    btn.textContent = answer;
    btn.style.textAlign = 'left';
    btn.addEventListener('click', () => selectAnswer(index));
    answersContainer.appendChild(btn);
  });

  updateProgressBar();
}

function selectAnswer(selectedIndex) {
  const q = questions[currentQuestion];

  const buttons = Array.from(answersContainer.children);

  // Desativa cliques adicionais
  buttons.forEach(btn => btn.disabled = true);

  // Marca os botões corretos e errados
  buttons.forEach((btn, index) => {
    if (index === q.correct) {
      btn.classList.add('correct');
    } else if (index === selectedIndex) {
      btn.classList.add('wrong');
    }
  });

  if (selectedIndex === q.correct) {
    score++;
    scoreText.textContent = score;
  }

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showEndScreen();
    }
  }, 1000);
}

function showEndScreen() {
  quizScreen.classList.remove('active');
  endScreen.classList.add('active');

  scoreEndText.textContent = score;
  totalQuestionsEndText.textContent = questions.length;

  if (score === questions.length) {
    resultMessage.textContent = 'Perfeito! Você é um verdadeiro gamer!';
  } else if (score >= questions.length / 2) {
    resultMessage.textContent = 'Nada mal! Mas dá pra melhorar.';
  } else {
    resultMessage.textContent = 'Melhor jogar mais um pouco!';
  }
}

function updateProgressBar() {
  const progress = ((currentQuestion) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', startQuiz);
