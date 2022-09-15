const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 579

c.fillRect(0, 0, canvas.width, canvas.height)

const gravedad = 0.7

class Sprite {
    constructor({ posicion, velocidad }) {
        this.posicion = posicion
        this.velocidad = velocidad
        this.altura = 150
        this.lastKey
    }

    //draw es uno de mis metodos de mi clase sprite
    draw() {
        c.fillStyle = 'red' //marco jugador como rojo
        c.fillRect(this.posicion.x, this.posicion.y, 50, this.altura)
    }
    
    update() {
        this.draw()
        //this.posicion.y = this.posicion.y + 10 -- lo de abajo es mas simplificado
        this.posicion.x += this.velocidad.x
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

const keys = {
    //jugador
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    w:{
        pressed: false
    },
    //oponente
    ArrowLeft:{
        pressed: false
    },
    ArrowRight:{
        pressed: false
    },
    ArrowUp:{
        pressed: false
    }

}


function animate () {
    window.requestAnimationFrame(animate)
    //llamo a un metodo de mi canvas
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

    // invoco metodo update que tiene a draw
    jugador.update()
    oponente.update()
    //console.log('go');

    jugador.velocidad.x = 0
    oponente.velocidad.x = 0

    //movimiento jugador
    if (keys.a.pressed && jugador.lastKey === 'a') {
        jugador.velocidad.x = -5
    } else if (keys.d.pressed && jugador.lastKey === 'd') {
        jugador.velocidad.x = 5
    }

    //movimiento oponente
    if (keys.ArrowLeft.pressed && oponente.lastKey === 'ArrowLeft') {
        oponente.velocidad.x = -5
    } else if (keys.ArrowRight.pressed && oponente.lastKey === 'ArrowRight') {
        oponente.velocidad.x = 5
    }
     
}

animate()



// event listeners. esto me servira para mover a los pj

// keydown = apreto las teclas
// keyup = suelto las teclas
window.addEventListener('keydown', (event) => {
    console.log(event.key)
    switch(event.key) {
        //jugador
        case 'd': keys.d.pressed = true
        jugador.lastKey = 'd'
        break
        case 'a': keys.a.pressed = true
        jugador.lastKey = 'a'
        break
        case 'w': jugador.velocidad.y = -20
        break

        //oponente
        case 'ArrowRight': keys.ArrowRight.pressed = true
        oponente.lastKey = 'ArrowRight'
        break
        case 'ArrowLeft': keys.ArrowLeft.pressed = true
        oponente.lastKey = 'ArrowLeft'
        break
        case 'ArrowUp': oponente.velocidad.y = -20
        break
    }

    console.log(event.key);

})

window.addEventListener('keyup', (event) => {
    switch(event.key) {
        //jugador
        case 'd': keys.d.pressed = false
        break
        case 'a': keys.a.pressed = false
        break
        case 'w': keys.w.pressed = false
        break

        //oponente
        case 'ArrowRight': keys.ArrowRight.pressed = false
        break
        case 'ArrowLeft': keys.ArrowLeft.pressed = false
        break
        case 'ArrowUp': keys.w.pressed = false
        break
    }

    console.log(event.key);

})





