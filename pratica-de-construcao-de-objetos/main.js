// setup canvas

const canvas = document.querySelector('canvas');
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
		ctx.beginPath()
		ctx.fillStyle = this.cor
		ctx.arc(this.inicioEmX, this.inicioEmY, this.raio, 0, 2 * Math.PI)
		ctx.fill()
	}

	this.atualizar = function() {
		if ((this.inicioEmX + this.raio) >= width) {
			this.velocidadeEmX = -(this.velocidadeEmX)
		}
		if ((this.inicioEmX - this.raio) <= 0) {
			this.velocidadeEmX = -(this.velocidadeEmX)
		}
		if ((this.inicioEmY + this.raio) >= height) {
			this.velocidadeEmY = -(this.velocidadeEmY)
		}
		if ((this.inicioEmY - this.raio) <= 0) {
			this.velocidadeEmY = -(this.velocidadeEmY)
		}

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
	ctx.fullStyle = 'rgba(0,0,0,0.25)'
	ctx.fillRect(0,0,width,height)

	for (let i = 0; i < bolas.length; i++) {
		bolas[i].desenhar()
		bolas[i].atualizar()
	}

	requestAnimationFrame(repeticao)
}

repeticao()