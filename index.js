const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 579

c.fillRect(0, 0, canvas.width, canvas.height)


class Sprite {
    constructor({ posicion, velocidad }) {
        this.posicion = posicion
        this.velocidad = velocidad
    }

    draw() {
        c.fillStyle = 'red' //marco jugador como rojo
        c.fillRect(this.posicion.x, this.posicion.y, 50, 150)
    }
    //draw es uno de mis metodos de mi clase sprite
}

//jugador
const jugador = new Sprite ({
    posicion: {x: 0, y: 0},
    velocidad: {x: 0, y: 0}

})


//enemigo
const oponente = new Sprite ({
    posicion: {x: 500, y: 200},
    velocidad: {x: 0, y: 0}
})

// invoco metodo draw 
jugador.draw()  
oponente.draw()


console.log(jugador);

function animate () {
    window.requestAnimationFrame(animate)
    console.log('go');
}

animate()



