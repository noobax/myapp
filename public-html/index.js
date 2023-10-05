import { createHtmlList } from './utility.js'

export default function pages(page, params = {}) {
	if (page === 'hello')
		return '<h1>Hello World!</h1>'
	if (page === 'cards') {
		return `
		<div id="container" style="height:100vh;display:flex;align-items: center;justify-content: space-around;">
			<article>
				<h3 id="card-text" style="text-align:center">mot a trouver</h3>
				<input id="user-input" type="text"/>
				<button id="submit-card" class="">Valider</button>
			</article>
		</div>
		`
	}
	if (page === 'profiles' || page === null) {
		return `
			<article styple="">
				<ul>
					${ createHtmlList(params) }
				</ul>
				<input type="text" id ="user-name"></input>
				<button id="submit-user-name">Valider</button>
			</article
		`
	}
	return "<h3>404 Not found<h3>"
}
