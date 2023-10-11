import pages from "./index.js"
import cards from "./cards.js"
import { getLocalStorage, setLocalStorage, removeLocalStorage, getUrlParamValue, getProfiles } from './utility.js'

(function(){
const SETSIZE = 10
function CardSession(cardSet) {
	this.cardTextEl = document.querySelector('#card-text')
	this.userInputEl = document.querySelector('#user-input')
	this.submitCardEl = document.querySelector('#submit-card')
	this.setEventListeners = () => {

		document.addEventListener('keypress', (e) => {
			if (e.key === "Enter") {
				this.submitCardEl.click()
			}
		})
		this.submitCardEl.addEventListener('click', () => {
			const correct = this.isCorrect()
			if (correct)
				this.score++
			this.saveCard(correct)
			this.nextQuestion()
		})
	}
	this.boxDelay = {
		1: 1,
		2: 2,
		3: 4,
		4: 9,
		5: 16,
		6: 28,
		7: 63,
	}
	this.cardSet = cardSet
	this.cards = cards()
	this.i = 0
	this.score = 0
	this.user = getUrlParamValue('u')
	this.saveCard = (correct) => {
		const currentCardID = this.cardSet[this.i - 1]
		let profiles = getProfiles()
		if (profiles === false)
			profiles = {[this.user]: {}}
		if (currentCardID in profiles[this.user]) {
			const card = profiles[this.user][currentCardID]
			const currentBox = card.b
			if (correct) {
				const nextBox = currentBox >= 7 ? currentBox :currentBox + 1
				profiles[this.user][currentCardID] = {t: this.nextTime(currentBox + 1), b: currentBox + 1}
			} else {
				const nextBox = currentBox <= 1 ? currentBox : currentBox - 1
				profiles[this.user][currentCardID] = {t: this.nextTime(currentBox - 1), b: currentBox - 1}
			}
		} else {
			if (correct) {
				profiles[this.user][currentCardID] = {t: this.nextTime(2), b: 2}
			} else {
				profiles[this.user][currentCardID] = {t: this.nextTime(1), b: 1}
			}
		}[this.user]
		setLocalStorage('profiles', profiles)
	}
	this.nextTime = (box = 1) => {
		const currentTime = Date.now()
		return currentTime + (this.boxDelay[box] * 60 * 60 * 24 * 1000)
	}

	this.isCorrect = () => {
		return this.userInputEl.value === this.cards[this.cardSet[this.i - 1]].a
	}
	this.render = (card) => {
		if (card !== undefined) {
			this.cardTextEl.innerText = card.q
			this.userInputEl.value = ''
			this.userInputEl.focus()
		}
	}
	this.nextQuestion = () => {
		if (this.i < SETSIZE) {
			const card = this.cards[this.cardSet[this.i]]
			this.render(card)
			this.i++
		} else {
			window.alert(this.score)
		}
	}
}

function FlashCards(cards) {
	this.cards = cards
	this.user = getUrlParamValue('u')
	this.i = 0
	this.getStoredCards = () => {
		const profiles = getLocalStorage('profiles')
		return profiles ? profiles[this.user] : false
	}
	this.availableCards = () => {
		const cards = []
		const currentDay = Date.now()
		const storedCards = this.getStoredCards()
		for (const [key, value] of Object.entries(storedCards)) {
			if (currentDay >= value.t)
				cards.push(key)
		}
		return cards
	}
	this.notAvailableCards = () => {
		const cards = []
		const currentDay = Date.now()
		const storedCards = this.getStoredCards()
		console.log(storedCards)
		for (const [key, value] of Object.entries(storedCards)) {
			if (currentDay < value.t)
				cards.push(key)
		}
		return cards
	}
	this.getCardSet = () => {
		const notAvailable = this.notAvailableCards()
		const cardSet = this.availableCards()
		for (const [key, value] of Object.entries(this.cards)) {
			if (!notAvailable.includes(key))
				cardSet.push(key)
		}
		return cardSet
	}
	this.start = () => {
		const cardSession = new CardSession(this.getCardSet())
		cardSession.setEventListeners()
		cardSession.nextQuestion()
}
}

function Profiles() {
	this.userNameEl = document.querySelector('#user-name')
	this.submitUserNameEl = document.querySelector('#submit-user-name')
	this.setEventListeners = () => {

		document.addEventListener('keypress', (e) => {
			if (e.key === "Enter") {
				this.submitUserNameEl.click()
			}
		})
		this.submitUserNameEl.addEventListener('click', () => {
			this.createProfile(this.userNameEl.value)
			app.render()
		})
	}
	this.createProfile = (name) => {
		if (name === '') return false
		const profiles = getProfiles()//this.getProfiles()
		if (profiles === false) {
			setLocalStorage('profiles', {[name]: 1})
			return true
		}
		let isUnique = true
		for (const [key, value] of Object.entries(profiles)) {
			if (name === key)
				return false
		}
		profiles[name] = {}
		setLocalStorage('profiles', profiles)
		return true
	}
	this.main = () => {
		this.setEventListeners()
	}
}

function App() {
	this.render = () => {
		const bodyEl = document.querySelector('#body')
		const page = getUrlParamValue('p')
		const params = getLocalStorage(page)

		bodyEl.innerHTML = pages(page, params)
		if (page === 'cards') {
			const flashCards = new FlashCards(cards())
			flashCards.start()
		}
		if (page === 'profiles') {
			const profiles = new Profiles()
			profiles.main()
		}
	}
}
const app = new App()
app.render()
})()
