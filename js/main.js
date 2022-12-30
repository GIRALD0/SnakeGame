//--------------------------------------------------------------------------------------SNAKE GAME-----------------------------------------------------------------


// stage constants
const col = 80;
const row = 38;
const side = 20;
const canvasWidth = col * side;
const canvasHeight = row * side;
const span = document.getElementById("span")

// stage variables
let snake;
let comida;
var score = 0;
// control variables
let arriba;
let derecha;
let izquierda;
let abajo;

// html variables
let canvas;

function setup() {
    frameRate(10);
    canvas = createCanvas(canvasWidth, canvasHeight);
    windowResized();
    snake = new Snake()
    posicionarComida()
    arriba = createVector(0, -1)
    abajo = createVector(0, 1)
    derecha = createVector(1, 0)
    izquierda = createVector(-1, 0)
}

function windowResized() {
    let escala = windowWidth / width
    if (escala >= 1) {
        return
    }
    canvas.style("width", width * escala + "px")
    canvas.style("height", height * escala + "px")
}

function draw() {
    background(0, 0, 0);
    span.innerText = score;
    snake.dibujar()
    fill("crimson")
    rect(comida.x * side, comida.y * side, side, side)
    if (snake.posicion.dist(comida) == 0) {
        snake.tamaño++;
        score++;
        span.innerText = score;
        posicionarComida()
    }
}

function keyPressed() {
    if (!isLooping()) {
        juegoNuevo()
    }
    switch (keyCode) {
        case UP_ARROW:
            if (snake.cola.length && snake.aceleracion == abajo) {
                break
            }
            snake.aceleracion = arriba
            break;
        case RIGHT_ARROW:
            if (snake.cola.length && snake.aceleracion == izquierda) {
                break
            }
            snake.aceleracion = derecha
            break;
        case DOWN_ARROW:
            if (snake.cola.length && snake.aceleracion == arriba) {
                break
            }
            snake.aceleracion = abajo
            break;
        case LEFT_ARROW:
            if (snake.cola.length && snake.aceleracion == derecha) {
                break
            }
            snake.aceleracion = izquierda
            break;
        default:
            break;
    }
}

function posicionarComida() {
    comida = createVector(
        int(random(col)),
        int(random(row))
    )
}

function juegoNuevo() {
    snake = new Snake()
    loop()
    score = 0;
    span.innerText = 0
}

function juegoTerminado() {
    if (snake.sistemaDeChoques()) {
        textAlign(CENTER, CENTER)
        textSize(50)
        text("GAME OVER", width / 2, height / 2)
        noLoop()
    }
}

function Snake() {
    this.posicion = createVector(
        col / 2,
        row / 2
    )
    this.aceleracion = createVector()
    this.cola = []
    this.tamaño = 0
    this.sistemaDeChoques = function () {
        if (this.posicion.x < 0 || this.posicion.y < 0) {
            return true
        }
        if (this.posicion.x >= col || this.posicion.y >= row) {
            return true
        }
        for (const c of this.cola) {
            if (this.posicion.equals(c)) {
                return true
            }
        }
        return false
    }
    this.dibujar = function () {
        fill("withw")
        rect(
            constrain(this.posicion.x, 0, col - 1) * side,
            constrain(this.posicion.y, 0, row - 1) * side,
            side,
            side
        )
        for (const c of this.cola) {
            rect(
                constrain(c.x, 0, col - 1) * side,
                constrain(c.y, 0, row - 1) * side,
                side,
                side
            )
        }
        juegoTerminado()
        this.cola.push(this.posicion.copy())
        if (this.cola.length > this.tamaño) {
            this.cola.splice(0, 1)
        }
        this.posicion.add(this.aceleracion)
    }
}
