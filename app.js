import {words} from "./words.js"
(function(){
	const qEl = document.querySelector('#q')
	const aEl = document.querySelector('#a')
	const bEl = document.querySelector('#s')

	document.addEventListener('keypress', (e) => {
		if (e.key === "Enter") {
			bEl.click()
		}
	})

	bEl.addEventListener('click', () => {

		if (quiz.qs.hasOwnProperty(quiz.i + 1)) {
			if (quiz.qs[quiz.i].isCorrect(aEl.value)) {
				quiz.correct()
			}
		}
		quiz.nextQuestion()
	})

	function Q(question, answer) {
		this.question = question.toLowerCase()
		this.answer = answer

		this.isCorrect = (userAnswer) => {
			return this.answer === userAnswer.toLowerCase()
		}
	}


	function Quiz(qs) {
		this.qs = qs 
		this.i = 0
		this.score = 0

		this.correct = () => this.score++
		this.render = (q) => {
			qEl.innerText = q.question
			aEl.value = ''
			aEl.focus()
		}
		this.nextQuestion = () => {
			console.log(this.score)
			if (qs.hasOwnProperty(this.i + 1)) {
				this.i++
				let q = qs[this.i]
				this.render(q)

			} else {
				window.alert('You got ' + this.score + ' correct out of ' + this.qs.length)
			}
		}
	}

	//const quiz = new Quiz([new Q('hello', 'bonjour'), new Q('bye', 'aurevoir'), new Q('yes', 'oui')])
	//const quiz = new Quiz([new Q('hello', 'bonjour'), new Q('bye', 'aurevoir'), new Q('yes', 'oui')])
	const qs = []
	for (const [key, value] of Object.entries(words)) {
		qs.push(new Q(key, value))
	}
	const quiz = new Quiz(qs)

	quiz.render(quiz.qs[quiz.i])

}
)()
