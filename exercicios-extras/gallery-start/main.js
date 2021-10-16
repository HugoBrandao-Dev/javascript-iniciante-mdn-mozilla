const imagens = []
const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btnAdicionarImagem = document.querySelector('button#btn-adicionar-imagem')
const btnEscurecer = document.querySelector('button#btn-escurecer');
const overlay = document.querySelector('.overlay');

function isInputValido(input) {
	if (input.length === 0) {
		return false
	}
	return true
}

function gerarNovaTagImagem(nomeArquivo) {
	const newImage = document.createElement('img');
	newImage.setAttribute('src', `./images/${ nomeArquivo }`);
	newImage.onclick = function() {
		displayedImage.src = `./images/${ nomeArquivo }`
	}
	thumbBar.appendChild(newImage);
}

/* Looping through images */

/* Wiring up the Darken/Lighten button */
btnEscurecer.onclick = function() {
	const modo = btnEscurecer.textContent.toLowerCase()
	switch (modo) {
		case 'darken':
			btnEscurecer.textContent = 'lighten'
			btnEscurecer.style.backgroundColor = 'rgba(200,200,200,0.5)'
			overlay.style.backgroundColor = 'rgba(0,0,0,0.6)'
			break
		case 'lighten':
			btnEscurecer.textContent = 'darken'
			btnEscurecer.style.backgroundColor = 'rgba(150,150,150,0.6)'
			overlay.style.backgroundColor = 'rgba(0,0,0,0)'
			break
		default:
			console.warn('A opção do botão de escurecer é inválida.')
			break
	}
}

// Adicionar uma nova foto
function isRepetirImagem(nomeArquivo) {
	if (imagens.indexOf(nomeArquivo) >= 0) {
		return confirm('Já há uma imagem com este nome, elas podem ser as mesmas, deseja prosseguir?')
	}
	return false
}

btnAdicionarImagem.onclick = function() {
	const iptNovaImagem = document.getElementsByName('ipt-nova-imagem')[0]

	if (isInputValido(iptNovaImagem.value)){
		const caminhoImagemArray = iptNovaImagem.value.split('\\')
		const nomeArquivo = caminhoImagemArray[caminhoImagemArray.length - 1]
		if (imagens.indexOf(nomeArquivo) === -1 || isRepetirImagem(nomeArquivo)) {
			imagens.push(nomeArquivo)
			gerarNovaTagImagem(nomeArquivo)
		}
		iptNovaImagem.value = ''
	} else {
		alert('Informe um caminho válido (dentro da pasta images).')
	}
}