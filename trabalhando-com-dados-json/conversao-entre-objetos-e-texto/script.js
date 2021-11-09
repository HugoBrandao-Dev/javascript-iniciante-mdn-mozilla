const header = document.querySelector('header');
const section = document.querySelector('section');

const URLRequisicao = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json'

const requisicao = new XMLHttpRequest()

requisicao.open('GET', URLRequisicao)
requisicao.responseType = 'text'
requisicao.send()

requisicao.onload = function() {
	const respostaTexto = requisicao.response
	const resposta = JSON.parse(respostaTexto)
	preencherCabecalho(resposta)
	mostrarHerois(resposta)
}

function criarTagHTML(tipo, conteudo) {
	let elemento = document.createElement(tipo)
	if (typeof conteudo === 'object') {
		for (let indice in conteudo) {
			elemento.innerHTML += `<li>${ conteudo[indice] }</li>`
		}
	} else {
		elemento.innerHTML = conteudo
	}
	return elemento
}

/*
Os elementos filhos já devem estar estruturalmente sequenciados de 
acordo com o layout que se deseja obter.
*/
function montarElementos(elementoPai, elementosFilhos) {
	for (let indice in elementosFilhos) {
		elementoPai.appendChild(elementosFilhos[indice])
	}
	return elementoPai
}

function preencherCabecalho(objetoJSON) {
	let h1NomeEsquadrao = criarTagHTML('h1', objetoJSON.squadName)
	let pDescricao = criarTagHTML('p', `Sede: ${ objetoJSON.homeTown } // Formado em: ${ objetoJSON.formed }.`)
	montarElementos(header, [h1NomeEsquadrao, pDescricao])
}

function montarMembro(membro) {
	let articleHeroi = document.createElement('article')
	let h2Nome = criarTagHTML('h2', membro.name)
	let pIdentidade = criarTagHTML('p', `Identidade Secreta: ${ membro.secretIdentity }.`)
	let pIdade = criarTagHTML('p', `Idade: ${ membro.age }.`)
	let pPoderes = criarTagHTML('p', 'Super poderes:')
	let ulPoderes = criarTagHTML('ul', membro.powers)
	return montarElementos(articleHeroi, [h2Nome, pIdentidade, pIdade, pPoderes, ulPoderes])
}

function mostrarHerois(objetoJSON) {
	let membros = objetoJSON.members
	for (let indice in membros) {
		let membro = montarMembro(membros[indice])
		section.appendChild(membro)
	}
}