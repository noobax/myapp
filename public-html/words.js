export default function words(n) {
	const data = [
		JSON.parse('{"1":{"q":"time","a":"temps"},"2":{"q":"times","a":"fois"},"3":{"q":"little","a":"peu"},"4":{"q":"eyes","a":"yeux"},"5":{"q":"head","a":"tête"},"6":{"q":"man","a":"homme"},"7":{"q":"life","a":"vie"},"8":{"q":"day","a":"jour"},"9":{"q":"hand","a":"main"},"10":{"q":"mother","a":"mère"}}')
	]
	if (n === '' || n >= data.length) return data[0]
	return data[n]
}
