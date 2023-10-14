import { Quiz } from './quiz.js'
import { Question } from './question.js'
import { LocalStorage } from './localStorage.js'
import { Cards } from './cards.js'
import { getCards } from './getCards.js'
(function(){
	//Get quiz html elements
	const bodyEl = document.querySelector('body')
	const quizAppEl = document.querySelector('#quiz-app')
	const quizTitleEl = document.querySelector('#quiz-title')
	const quizQuestionEl = document.querySelector('#quiz-question')
	const quizInputEl = document.querySelector('#quiz-input')
	const quizSubmitEl = document.querySelector('#quiz-submit')
	const quizFeedbackEl = document.querySelector('#quiz-feedback')
	const quizRefreshEl = document.querySelector('#quiz-refresh')
	let checkAnswer = true

	quizRefreshEl.addEventListener('click', () => location.reload())

	const quizEnterEvent = (e) => {
		const answer = quizInputEl.value.toLowerCase()
		const curQuestion = quiz.getCurrentQuestion()
		const hasAnsweredRight = curQuestion.isCorrect(answer)

		const userInputFeedback = (answer, hasAnsweredRight) => {
			if (hasAnsweredRight) {
				quizInputEl.setAttribute('aria-invalid', 'false')
				quizFeedbackEl.style.display = 'block'
				quizFeedbackEl.style.backgroundColor = 'green'
				quizFeedbackEl.innerText = answer
			}
			else {
				quizInputEl.setAttribute('aria-invalid', 'true')
				quizFeedbackEl.style.display = 'block'
				quizFeedbackEl.style.backgroundColor = 'red'
				quizFeedbackEl.innerText = answer
			}
		}
		if (e.keyCode === 13 && answer !== '') {
			// Check will just give the user feedback on his answer
			if (checkAnswer) {
				if (quiz.hasQuestionLeft()) {
					quizInputEl.readOnly = true
					quiz.checkAnswer(answer)
					cards.saveCard(curQuestion.id, hasAnsweredRight)
					userInputFeedback(curQuestion.a, hasAnsweredRight)
				} else {
					quiz.checkAnswer(answer)
					cards.saveCard(curQuestion.id, hasAnsweredRight)
					userInputFeedback(curQuestion.a, hasAnsweredRight)
					quizSubmitEl.style.display = 'none'
					quizRefreshEl.style.display = 'block'
					setTimeout(() => alert(`${quiz.rightAnswers} out of ${quiz.questions.length}`), 500)
				}
				checkAnswer = false
			}
			// Not will remove any feedback and go to the next q
			else {
				quizInputEl.readOnly = false
				quiz.increaseIndex()
				quizInputEl.removeAttribute('aria-invalid')
				quizFeedbackEl.style.display = 'none'
				displayQuestion()
				checkAnswer = true
			}
		}
	}

	const quizSubmitEvent = (e) => {
		const answer = quizInputEl.value.toLowerCase()
		const curQuestion = quiz.getCurrentQuestion()
		const hasAnsweredRight = curQuestion.isCorrect(answer)

		const userInputFeedback = (hasAnsweredRight) => {
			if (hasAnsweredRight)
				quizInputEl.setAttribute('aria-invalid', 'false')
			else
				quizInputEl.setAttribute('aria-invalid', 'true')
		}
		if (answer !== '') {
			// Check will just give the user feedback on his answer
			if (checkAnswer) {
				if (quiz.hasQuestionLeft()) {
					quiz.checkAnswer(answer)
					cards.saveCard(curQuestion.id, hasAnsweredRight)
					userInputFeedback(hasAnsweredRight)
				} else {
					quiz.checkAnswer(answer)
					cards.saveCard(curQuestion.id, hasAnsweredRight)
					alert(`${quiz.rightAnswers} out of ${quiz.questions.length}`)
				}
				checkAnswer = false
			}
			// Not will remove any feedback and go to the next q
			else {
				quiz.increaseIndex()
				quizInputEl.removeAttribute('aria-invalid')
				displayQuestion()
				checkAnswer = true
			}
		}
	}
	body.addEventListener('keydown', quizEnterEvent)
	quizSubmitEl.addEventListener('click', quizSubmitEvent)
	const displayQuestion = () => {
		quizQuestionEl.innerText = quiz.getCurrentQuestion().q
		quizInputEl.value = ''
		quizInputEl.focus()
	}
	//Select card set
	let cardSetNum = 0

	const localStorage = new LocalStorage('mycards')
	const cards = new Cards(getCards(cardSetNum), localStorage)
	const cardSet = cards.getCardSet()
	const questions = []
	for (let key of cardSet) {
		questions.push(new Question(key, cards.cardPull[key]['q'], cards.cardPull[key]['a']))
	}
	const quiz = new Quiz(questions)
	displayQuestion()


})()
