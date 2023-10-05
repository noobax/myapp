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
	this.cardSet = cardSet
	this.cards = cards()
	this.i = 0
	this.score = 0
	this.user = getUrlParamValue('u')
	this.saveCard = (correct) => {
		const currentCardID = this.cardSet[this.i - 1]
		const profiles = getProfiles()
		
		//setLocalStorage('profiles', )
	}
	/*
	 * {'Paul': {'phase1': {'1': {'time': '22432424', 'box': '4', '2': {'time': '414214', 'box': '3'}}}, {'phase2'...}}}
	 */

	this.isCorrect = () => {
		return this.userInputEl.value === this.cards[this.cardSet[this.i - 1]].a
	}
	this.render = (card) => {
		this.cardTextEl.innerText = card.q
		this.userInputEl.value = ''
		this.userInputEl.focus()
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
	
	this.i = 0
	this.boxDelay = {
		"1": 1,
		"2": 2,
		"3": 4,
		"4": 9,
		"5": 16,
		"6": 28,
		"7": 63,
	}
	this.getStoredCards = () => {
		return getLocalStorage('cards')
	}
	this.availableCards = () => {
		const cards = []
		const currentDay = Date.now()
		const storedCards = this.getStoredCards()
		for (const [key, value] of Object.entries(storedCards)) {
			if (currentDay >= value.time)
				cards.push(key)
		}
		return cards
	}
	this.getCardSet = () => {
		let cardSet = []
		const storedCards = this.availableCards()
		if (storedCards !== false)
			cardSet = storedCards
		while (cardSet.length < SETSIZE) {
			for (const [key, value] of Object.entries(this.cards)) {
				if (!cardSet.includes(key))
					cardSet.push(key)
			}
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
		console.log(profiles)
		profiles[name] = {}
		setLocalStorage('profiles', profiles)
		console.log(profiles)
		return true
	}
		/*
	this.getProfiles = () => {
		const profiles = getLocalStorage('profiles')
		console.log(profiles)
		return profiles
	}
		*/
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
