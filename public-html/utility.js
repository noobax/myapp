export function createHtmlList(items) {
	let htmlList = ''
	for (const [key, value] of Object.entries(items)) {
		htmlList += `<li><a href="?u=${key}&p=cards">${key}</a></li>`
	}
	return htmlList
}

export function getLocalStorage(itemName) {
	const data = localStorage.getItem(itemName)
	return data === null ? false : JSON.parse(data)
}

export function setLocalStorage(itemName, item) {
	localStorage.setItem(itemName, JSON.stringify(item))
}

export function removeLocalStorage(itemName) {
	localStorage.removeItem(this.itemName)
}
export function getUrlParamValue(param) {
	const url = new URL(document.location)
	return url.searchParams.get(param)
}
export function getProfiles() {
	return getLocalStorage('profiles')
}
/*
export function createProfile(name) {
	const profiles = this.getProfiles()
	if (profiles === false) {
		setLocalStorage('profiles', {name:{}})
		return true
	}
	let isUnique = true
	for (const [key, value] of Object.entries(profile)) {
		if (name === key)
			return false
	}
	setLocalStorage('profiles', profiles[name] = {})
	return true
}
*/
