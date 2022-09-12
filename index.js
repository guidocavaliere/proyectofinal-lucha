const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 579

c.fillRect(0, 0, canvas.width, canvas.height)

const gravedad = 0.2

class Sprite {
    constructor({ posicion, velocidad }) {
        this.posicion = posicion
        this.velocidad = velocidad
        this.altura = 150
    }

    //draw es uno de mis metodos de mi clase sprite
    draw() {
        c.fillStyle = 'red' //marco jugador como rojo
        c.fillRect(this.posicion.x, this.posicion.y, 50, this.altura)
    }
    
    update() {
        this.draw()
        //this.posicion.y = this.posicion.y + 10 -- lo de abajo es mas simplificado
        this.posicion.y += this.velocidad.y
        if (this.posicion.y + this.altura + this.velocidad.y >= canvas.height)
           {this.velocidad.y = 0}
           else 
           this.velocidad.y += gravedad

    }

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



console.log(jugador);

function animate () {
    window.requestAnimationFrame(animate)
    //llamo a un metodo de mi canvas
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

    // invoco metodo update que tiene a draw
    jugador.update()
    oponente.update()
    //console.log('go');
     
}

animate()



