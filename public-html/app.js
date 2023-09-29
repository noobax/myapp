import words from "./words.js"
(function(){
	const qEl = document.querySelector('#q')
	const aEl = document.querySelector('#a')
	const bEl = document.querySelector('#s')
	const boxDelay = {
		"1": 1,
		"2": 2,
		"3": 4,
		"4": 9,
		"5": 16,
		"6": 28,
		"7": 63,
	}

	document.addEventListener('keypress', (e) => {
		if (e.key === "Enter") {
			bEl.click()
		}
	})

	bEl.addEventListener('click', () => {

		if (quiz.qs.hasOwnProperty(quiz.i + 1)) {
			var isCorrect = quiz.qs[quiz.i].isCorrect(aEl.value)
			if (isCorrect) {
				quiz.correct()
			}
		}
		qs[quiz.i].save(isCorrect)
		quiz.nextQuestion()
	})

	function Q(id, question, answer) {
		this.id = id
		this.question = question.toLowerCase()
		this.answer = answer

		this.isCorrect = (userAnswer) => {
			return this.answer === userAnswer.toLowerCase()
		}
		this.getEntry = () => {
			const load = JSON.parse(localStorage.getItem(this.id))

			if (load === null) return null
			return load
		}
		this.save = (isCorrect) => {
			const load = this.getEntry()
			const millInDay = 86400000
			const currentTime = Date.now()
			if (load === null) {
				const nextBox = isCorrect ? 2 : 1
					localStorage.setItem(this.id, '{"box":"' + nextBox + '", "time":"' + (nextBox * millInDay + currentTime) + '"}')
			} else {
				const currentBox = parseInt(load["box"])
				const nextBox = isCorrect && currentBox < 7 ? (currentBox + 1) : !isCorrect && currentBox > 1 ? (currentBox - 1) : currentBox

				localStorage.setItem(this.id, '{"box":"' + nextBox + '", "time":"' + (boxDelay[nextBox] * millInDay + currentTime) + '"}')
			}
			let newLoad = this.getEntry()
			console.log(newLoad)
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
			if (qs.hasOwnProperty(this.i + 1)) {
		 		this.i++
				let q = qs[this.i]
				this.render(q)

			} else {
				window.alert('You got ' + this.score + ' correct out of ' + this.qs.length)
			}
		}
	}

	const qs = []
	const params = new URL(document.location).searchParams
	const stage = params.get('q')
	for (const [key, value] of Object.entries(words(stage))) {

		qs.push(new Q(key, value["q"], value["a"]))
	}
	const quiz = new Quiz(qs)

	quiz.render(quiz.qs[quiz.i])
}
)()
