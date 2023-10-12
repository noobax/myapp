export function Cards(cardPull, localStorage) {
	this.cardPull = cardPull
	this.localStorage = localStorage
	this.setSeize = 10
	this.boxDelay = {
		1: 1,
		2: 2,
		3: 4,
		4: 9,
		5: 16,
		6: 37,
		7: 64,
	}


	/*
		* cardPull data structure is:
		* {{1:{'q':question, 'a':answer}},...}
		* localStorage data structure is:
		* {{1:{'b':n,'t':timestamp}},...}
		*/
	//Select setSeize of cards from cardPull
	//Take card already known and out of cooldown first
	this.getCardSet = () => {
		const cardSet = []
		let data = localStorage.getData()
		const mixArray = () => { return Math.random() - 0.5 }
		if (data === null) data = {}
		const dataKeys = Object.keys(data).sort(mixArray)
		const currentTime = Date.now()
		for (let key of dataKeys) {
			if (cardSet.length >= this.setSeize)
				exit()
			if (data[key].t < currentTime)
				cardSet.push(key)
		}
		const cardPullKeys = Object.keys(this.cardPull).sort(mixArray)
		for (let key of cardPullKeys) {
			if (cardSet.length >= this.setSeize)
				exit()
			if (!dataKeys.includes(key))
				cardSet.push(key)
		}
		return cardSet
	}
	this.saveCard = (id, isCorrect) => {
		const currentDate = Date.now()
		const millInDay = 60*60*24*1000
		const data = this.localStorage.getData()
		let item;
		if (data === null || !!data[id]) {
			const nextBox = isCorrect ? 2 : 1
			item = {[id]:{'b':nextBox, 't':(currentDate + millInDay * this.boxDelay[nextBox])}}
		} else {
			const curBox = data[id]['b']
			const nextBox = isCorrect ? curBox < 7 ? curBox++ : 7 : curBox > 1 ? curBox-- : 1
			item = {'b':nextBox, 't':(currentDate + millInDay * thisboxDelay[nextBox])}
		}
		if (data === null)
			this.localStorage.setData(item)
		else {
			data = data[id] = item
			this.localStorage.setData(data)
		}
	}
}
