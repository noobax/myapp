export default function cards(n = 0) {
	const data = [
		JSON.parse('{"1":{"q":"time","a":"temps"},"2":{"q":"times","a":"fois"},"3":{"q":"little","a":"peu"},"4":{"q":"eyes","a":"yeux"},"5":{"q":"head","a":"tête"},"6":{"q":"man","a":"homme"},"7":{"q":"life","a":"vie"},"8":{"q":"day","a":"jour"},"9":{"q":"hand","a":"main"},"10":{"q":"mother","a":"mère"},"11":{"q":"child","a":"enfant"}}')
	]
	if (n >= data.length) {
		return data[0]
	}
	return data[n]
}
/*
 * First page is a profile that list all available one and to create a new onw
 *	{"users":{"1":"jean"}}
 * Once a profile is selected the user can pick cards to practice
 * If cards has been saved the app will priotirize them if its time to
 * The rest will be choose randomly from the pack to get a total of 10
 * When the round is over the user will be able to leave or to go again
 */
