// setup canvas

const canvas = document.querySelector('canvas');

// Indica que nosso ambiente é em duas dimensões.
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function Bola(inicioEmX, inicioEmY, velocidadeEmX, velocidadeEmY, cor, raio) {
	// Propriedades
	this.inicioEmX = inicioEmX
	this.inicioEmY = inicioEmY
	this.velocidadeEmX = velocidadeEmX
	this.velocidadeEmY = velocidadeEmY
	this.cor = cor
	this.raio = raio

	// Métodos
	this.desenhar = function() {

		// Indica que INICIAREMOS a configuração do elemento
		ctx.beginPath()

		// Define a cor do objeto
		ctx.fillStyle = this.cor

		/*
		Indica que o elemento será em arco
		PARÂMETRO 1 e PARÂMETRO 2: Posição base para o início do raio;
		PARÂMETRO 3: O Raio do arco;
		PARÂMETRO 4 E PARÂMETRO 5: Inicio e final do ângulo, deve-se 
		informar em RADIADOS.
		*/
		ctx.arc(this.inicioEmX, this.inicioEmY, this.raio, 0, 2 * Math.PI)

		// Indica que FINALIZAMOS a configuração do elemento
		ctx.fill()
	}

	this.atualizar = function() {

		/*
		Faz com que a velocidade assuma valores negativos em X, 
		caso atinga as bordas horizontais.
		*/
		if ((this.inicioEmX + this.raio) >= width) {
			this.velocidadeEmX = -(this.velocidadeEmX)
		}
		if ((this.inicioEmX - this.raio) <= 0) {
			this.velocidadeEmX = -(this.velocidadeEmX)
		}

		/*
		Faz com que a velocidade assuma valores negativos em Y, 
		caso atinga as bordas verticais.
		*/
		if ((this.inicioEmY + this.raio) >= height) {
			this.velocidadeEmY = -(this.velocidadeEmY)
		}
		if ((this.inicioEmY - this.raio) <= 0) {
			this.velocidadeEmY = -(this.velocidadeEmY)
		}

		// Depois de verificar se houve colisão, a bola é movimentada novamente
		this.inicioEmX += this.velocidadeEmX
		this.inicioEmY += this.velocidadeEmY
	}
}

let bolas = []

while (bolas.length < 10) {
	let raio = random(10,20)
	let inicioEmX = random(0 + raio, width - raio)
	let inicioEmY = random(0 + raio, height - raio)
	let velocidadeEmX = random(-7,7)
	let velocidadeEmY = random(-7,7)
	let rgb = `rgb(${ random(0,255) }, ${ random(0,255) }, ${ random(0,255) })`
	let bola = new Bola(inicioEmX, inicioEmY, velocidadeEmX, velocidadeEmY, rgb, raio)
	bolas.push(bola)
}

function repeticao() {
	/*
	Define a cor de fundo da área onde as bolas de movimentaram, além disso, o 
	ALPHA de tem impacto direto no tamanho do trasejado que as bolas apresentarão 
	quando se movimentam, -ALPHA = +GRANDE O TRASEJADO.
	*/
	ctx.fillStyle = 'rgba(0,0,0,0.25)'

	/*
	Define os limites da área onde as bolas se movimentarão, a largura máxima 
	e a altura máxima vão depender do tamanho que a janela do navegador estará
	quando a página for recarregada.
	*/
	ctx.fillRect(0,0,width,height)

	for (let i = 0; i < bolas.length; i++) {
		bolas[i].desenhar()
		bolas[i].atualizar()
	}

	/*
	Executará a função um número definidos de vezes por segundo, criando uma
	animação.
	*/
	requestAnimationFrame(repeticao)
}

repeticao()