export function Question(id, question, answer) {
	this.id = id
	this.q = question
	this.a = answer

	this.isCorrect = (answer) => {
		return this.a === answer
	}
}
