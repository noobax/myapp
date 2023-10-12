export function Question(id, question, answer) {
	this.id = id
	this.q = question
	this.a = answer

	this.isCorrect = (answer) => {
		console.log(this.a, answer, this.a === answer)
		return this.a === answer
	}
}
