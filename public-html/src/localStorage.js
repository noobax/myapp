export function LocalStorage(name) {
	this.name = name

	this.getData = () => {
		const data = localStorage.getItem(this.name)
		return data === null ? null : JSON.parse(data)
	}
	this.setData = (data) => {
		console.log(data)
		const dataString = JSON.stringify(data)
		localStorage.setItem(this.name, dataString)
	}
	this.removeData = () => {
		localStorage.romoveItem(this.name)
	}
}
