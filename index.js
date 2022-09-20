const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 579

c.fillRect(0, 0, canvas.width, canvas.height)

const gravedad = 0.7

class Sprite {
    constructor({ posicion, velocidad, color, offset }) {
        this.posicion = posicion
        this.velocidad = velocidad
        this.ancho = 50
        this.altura = 150
        this.lastKey
        this.attackBox = {
            posicion: 
            {x: this.posicion.x,
            y:this.posicion.y}, 
            offset,
            width: 100,
            height: 50
        }
        this.color = color
        this.isAttacking
    }

    //draw es uno de mis metodos de mi clase sprite
    draw() {
        c.fillStyle = this.color //marco jugador segun color propiedad this.color
        c.fillRect(this.posicion.x, this.posicion.y, this.ancho, this.altura)

        //ataque
        if (this.isAttacking) {
        c.fillStyle = 'green'
        c.fillRect(
            this.attackBox.posicion.x, 
            this.attackBox.posicion.y,
            this.attackBox.width, 
            this.attackBox.height
            )
        }
    }
    
    update() {
        this.draw()
        //actualizacion de posiciones de ataque
        this.attackBox.posicion.x = this.posicion.x + this.attackBox.offset.x
        this.attackBox.posicion.y = this.posicion.y
        //this.posicion.y = this.posicion.y + 10 -- lo de abajo es mas simplificado
        this.posicion.x += this.velocidad.x
        this.posicion.y += this.velocidad.y       
        if (this.posicion.y + this.altura + this.velocidad.y >= canvas.height)
           {this.velocidad.y = 0}
           else 
           this.velocidad.y += gravedad

    }

    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100);

    }

}

//jugador
const jugador = new Sprite ({
    posicion: {x: 0, y: 0},
    velocidad: {x: 0, y: 0},
    color: 'red',
    offset:
    {x: 0,
     y: 0}

})


//enemigo
const oponente = new Sprite ({
    posicion: {x: 500, y: 200},
    velocidad: {x: 0, y: 0},
    color: 'blue',
    offset:
    {x: -50,
     y: 0}
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

function detectarColision({rec1, rec2}) {
    return
    (
        rec1.attackBox.posicion.x + rec1.attackBox.width >= rec2.posicion.x && 
        rec1.attackBox.posicion.x <= rec2.posicion.x + rec2.width &&
        rec1.attackBox.posicion.y + rec1.attackBox.height >= rec2.posicion.y &&
        rec1.attackBox.posicion.y <= rec2.posicion.y + rec2.altura
    )    


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

    // detectar colicion pre ataque -- jugador

    if (detectarColision ({ rec1:jugador, rec2: oponente }) &&
    jugador.isAttacking) 
       {
        jugador.isAttacking = false
        console.log('player attack');
       }
    

    // detectar colicion pre ataque -- oponente
    if (detectarColision ({ rec1:oponente, rec2: jugador }) &&
        oponente.isAttacking) 
        {
            oponente.isAttacking = false
            console.log('enemy attack');
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
        case 'h': jugador.attack()
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
        case ' ': oponente.attack()
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





