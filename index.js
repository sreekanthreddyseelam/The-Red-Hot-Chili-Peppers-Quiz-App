// GLOBAL VARIABLE
let question = 0;
let score = 0;

// FUNCTIONS
function generateQuestion() {
  if (question < STORE.length) {
    return `
			<main role="main">
				<form class="question-form">
					<fieldset name="quiz-question">
						<legend class="form-question">${STORE[question].question}</legend>
						<div class="form-option">
							<input type="radio" name="answer" required id="${STORE[question].answers[0]}" value="${STORE[question].answers[0]}">
							<label for="${STORE[question].answers[0]}"> ${STORE[question].answers[0]}</label>
						</div>
						<div class="form-option">
							<input type="radio" name="answer" required id="${STORE[question].answers[1]}" value="${STORE[question].answers[1]}">
							<label for="${STORE[question].answers[1]}"> ${STORE[question].answers[1]}</label>
						</div>
						<div class="form-option">
							<input type="radio" name="answer" required id="${STORE[question].answers[2]}" value="${STORE[question].answers[2]}">
							<label for="${STORE[question].answers[2]}"> ${STORE[question].answers[2]}</label>	
						</div>
						<div class="form-option">
							<input type="radio" name="answer" required id="${STORE[question].answers[3]}" value="${STORE[question].answers[3]}">
							<label for="${STORE[question].answers[3]}"> ${STORE[question].answers[3]}</label>
						</div>
					<div class="submit-wrapper">
						<button type="submit" class="submit-btn">Submit</button>
					</div>
					</fieldset>		
				</form>
			</main>`;
  } else {
    renderResults();
    restartQuiz();
  }
}

function generateAnsFeedback(answer, question) {
  return `
		<main role="main">
			<div class="ans ans-msg">
				<h1>${answer}</h1>
			</div>			
			<div class="ans ans-history">
				${STORE[question].history}
			</div>		
			<div class="ans btn-wrapper">
				<button class="next">Next</button>
			</div>
		</main>`;
}

function generateResults(score, message) {
  return `
		<main role="main">
			<div class="ans-msg ans">
				<h1>You got ${score}/5!</h1>
			</div>
			<div class="ans-history ans">
				${message}
			</div>
			<div class="btn-wrapper ans">
				<button class="restart-quiz">Restart Quiz</button>
			</div>
		</main>`;
}

function renderQuestion() {
  $('.quiz').html(generateQuestion());
}

function incrementScore() {
  score++;
  $('.score').text(score);
}

function nextQuestion() {
  question++;
  if (question <= 4) {
    $('.question').text(question + 1);
  }
}

function startQuiz() {
  $('.start-quiz').on('click', '.start', function (e) {
    $('.start-quiz').remove();
    $('.score-panel').css({ display: 'flex' }).hide().fadeIn();
    $('.quiz').css('height', '100%');
    $('body').css('background-image', 'url(images/bgimage.jpg)');
    $('.quiz').css('display', 'block');
    renderQuestion();
    $('.question').text(1);
  });
}

function onUserSubmitAns() {
  $('.quiz').on('submit', '.question-form', function (e) {
    e.preventDefault();

    let selectedAns = $('input:checked').val();
    let correctAns = `${STORE[question].correct}`;

    if (selectedAns === correctAns) {
      correctAnsFeedback();
      incrementScore();
    } else {
      incorrectAnsFeedback();
    }
  });
}

function correctAnsFeedback() {
  let correctAns = `${STORE[question].correct}`;
  $('.quiz').html(generateAnsFeedback('Correct!', question));
}

function incorrectAnsFeedback() {
  let correctAns = `${STORE[question].correct}`;
  $('.quiz').html(generateAnsFeedback('Incorrect!', question));
}

function renderNextQuestion() {
  $('.quiz').on('click', '.next', function (e) {
    nextQuestion();
    renderQuestion();
  });
}

function renderResults() {
  let resultMsg;

  if (score >= 0 && score <= 3) {
    resultMsg =
      'Sorry but you should brush up on your RHCP trivia and try again!';
  } else {
    resultMsg = `Congrats!  You're a true RHCP fan!`;
  }

  $('.quiz').html(generateResults(score, resultMsg));
}

function restartQuiz() {
  $('.quiz').on('click', '.restart-quiz', function (e) {
    location.reload();
  });
}

function createQuiz() {
  startQuiz();
  onUserSubmitAns();
  renderNextQuestion();
}

// DOCUMENT-READY FUNCTION
$(createQuiz);
