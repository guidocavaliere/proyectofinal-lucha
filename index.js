const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 579

c.fillRect(0, 0, canvas.width, canvas.height)

const gravedad = 0.7

class Sprite {
    constructor({ position, velocity, color, offset }) {
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: 
            {x: this.position.x,
            y:this.position.y}, 
            offset,
            width: 100,
            height: 50
        }
        this.color = color
        this.isAttacking
        this.salud = 100
    }   

    //draw es uno de mis metodos de mi clase sprite
    draw() {
        c.fillStyle = this.color //marco jugador segun color propiedad this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        //ataque
        if (this.isAttacking) {
        c.fillStyle = 'green'
        c.fillRect(
            this.attackBox.position.x, 
            this.attackBox.position.y,
            this.attackBox.width, 
            this.attackBox.height
            )
        }
    }
    
    update() {
        this.draw()
        //actualizacion de positiones de ataque
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y
        //this.position.y = this.position.y + 10 -- lo de abajo es mas simplificado
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y       
        if (this.position.y + this.height + this.velocity.y >= canvas.height)
           {this.velocity.y = 0}
           else 
           this.velocity.y += gravedad

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
    position: {x: 0, y: 0},
    velocity: {x: 0, y: 0},
    color: 'red',
    offset:
    {x: 0,
     y: 0}

})


//enemigo
const oponente = new Sprite ({
    position: {x: 500, y: 200},
    velocity: {x: 0, y: 0},
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

/*
function detectarColision({ rectangle1, rectangle2 }) {
    return
    (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )

}
*/



function animate () {
    window.requestAnimationFrame(animate)
    //llamo a un metodo de mi canvas
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

    // invoco metodo update que tiene a draw
    jugador.update()
    oponente.update()
    //console.log('go');

    jugador.velocity.x = 0
    oponente.velocity.x = 0

    //movimiento jugador
    if (keys.a.pressed && jugador.lastKey === 'a') {
        jugador.velocity.x = -5
    } else if (keys.d.pressed && jugador.lastKey === 'd') {
        jugador.velocity.x = 5
    }

    //movimiento oponente
    if (keys.ArrowLeft.pressed && oponente.lastKey === 'ArrowLeft') {
        oponente.velocity.x = -5
    } else if (keys.ArrowRight.pressed && oponente.lastKey === 'ArrowRight') {
        oponente.velocity.x = 5
    }


    // detectar colision  ataque -- jugador
    //if (detectarColision ({ rectangle1: jugador, rectangle2: oponente }) &&
    if ((jugador.attackBox.position.x + jugador.attackBox.width >= oponente.position.x &&
        jugador.attackBox.position.x <= oponente.position.x + oponente.width &&
        jugador.attackBox.position.y + jugador.attackBox.height >= oponente.position.y &&
        jugador.attackBox.position.y <= oponente.position.y + oponente.height) 
        &&
        jugador.isAttacking)
       {
            jugador.isAttacking = false
            oponente.salud -= 20
            document.querySelector("#hpOpo").style.width = oponente.salud + '%'
        
       }
    

    // detectar colision  ataque -- oponente
    //if (detectarColision ({ rectangle1: oponente, rectangle2: jugador }) &&
    if ((oponente.attackBox.position.x + oponente.attackBox.width >= jugador.position.x &&
        oponente.attackBox.position.x <= jugador.position.x + jugador.width &&
        oponente.attackBox.position.y + oponente.attackBox.height >= jugador.position.y &&
        oponente.attackBox.position.y <= jugador.position.y + jugador.height) 
        &&
        oponente.isAttacking)
        {
            oponente.isAttacking = false
            jugador.salud -= 20
            document.querySelector("#hpJg").style.width = jugador.salud + '%'
            
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
        case 'w': jugador.velocity.y = -20
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
        case 'ArrowUp': oponente.velocity.y = -20
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





