import { Quiz } from './quiz.js'
import { Question } from './question.js'
import { LocalStorage } from './localStorage.js'
import { Cards } from './cards.js'
import { getCards } from './getCards.js'
(function(){
	//Get quiz html elements
	const quizAppEl = document.querySelector('#quiz-app')
	const quizTitleEl = document.querySelector('#quiz-title')
	const quizQuestionEl = document.querySelector('#quiz-question')
	const quizInputEl = document.querySelector('#quiz-input')
	const quizSubmitEl = document.querySelector('#quiz-submit')

	quizInputEl.addEventListener('keypress', (e) => {
		const answer = quizInputEl.value.toLowerCase()
		const curQuestion = quiz.getCurrentQuestion()
		if (e.keyCode === 13 && answer !== '') {
			if (quiz.hasQuestionLeft()) {
				quiz.checkAnswer(answer)
				quiz.increaseIndex()
				cards.saveCard(curQuestion.id, curQuestion.isCorrect(answer))
				displayQuestion()
			} else {
				quiz.checkAnswer(answer)
				cards.saveCard(curQuestion.id, curQuestion.isCorrect(answer))
				alert(`${quiz.rightAnswers} out of ${quiz.questions.length}`)

			}
		}
		
	})
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
