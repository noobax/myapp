export function Quiz(questions) {
	this.currentIndex = 0
	this.rightAnswers = 0
	this.questions = questions

	this.increaseIndex = () => {
		this.currentIndex++
	}
	this.getCurrentQuestion = () => {
		return this.questions[this.currentIndex]
	}
	this.checkAnswer = (answer) => {
		if (this.questions[this.currentIndex].isCorrect(answer))
			this.rightAnswers++
	}
	this.hasQuestionLeft = () => {
		return this.currentIndex < this.questions.length - 1
	}
}
