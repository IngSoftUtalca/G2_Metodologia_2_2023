const tablero = document.getElementById('round');
const botonesSimon = document.getElementsByClassName('square');
const botonInicio = document.getElementById('startButton');

class JuegoSimon {
    constructor(botonesSimon, botonInicio, tablero) {
        this.ronda = 0;
        this.posicionUsuario = 0;
        this.totalRondas = 1; // Acá podemos modificar la cantidad de niveles disponibles 
        this.secuencia = [];
        this.velocidad = 1000;
        this.botonesBloqueados = true;
        this.botones = Array.from(botonesSimon);
        this.interfaz = {
            botonInicio,
            tablero
        }
        this.sonidoError = new Audio('./sonidos/error.wav');
        this.sonidosBotones = [
            new Audio('./sonidos/1.mp3'),
            new Audio('./sonidos/2.mp3'),
            new Audio('./sonidos/3.mp3'),
            new Audio('./sonidos/4.mp3'),
        ]
    }

    // Inicia el juego de Simon
    iniciar() {
        this.interfaz.botonInicio.onclick = () => this.iniciarJuego();
    }

    /**
 * Inicia el juego, deshabilita el botón de inicio,
 * actualiza la ronda, inicializa variables y eventos,
 * y muestra la secuencia inicial.
 */
    iniciarJuego() {
        this.interfaz.botonInicio.disabled = true;
        this.actualizarRonda(0);
        this.posicionUsuario = 0;
        this.secuencia = this.crearSecuencia();
        this.botones.forEach((elemento, i) => {
            elemento.classList.remove('ganador');
            elemento.onclick = () => this.clickBoton(i);
        });
        this.mostrarSecuencia();
    }

    /**
     * Actualiza la ronda actual y el contenido visual del tablero.
     * @param {number} valor - El valor de la nueva ronda.
     */
    actualizarRonda(valor) {
        this.ronda = valor;
        this.interfaz.tablero.style.color = 'red';
        this.interfaz.tablero.style.zIndex = '9999';
        this.interfaz.tablero.textContent = `NIVEL:  ${this.ronda}`;
    }

    /**
     * Crea una secuencia aleatoria de botones basada en el número total de rondas.
     * @returns {number[]} - Array con la secuencia aleatoria.
     */
    crearSecuencia() {
        return Array.from({ length: this.totalRondas }, () => this.getColorAleatorio());
    }

    /**
     * Genera un número aleatorio entre 0 y 3.
     * @returns {number} - Número aleatorio entre 0 y 3.
     */
    getColorAleatorio() {
        return Math.floor(Math.random() * 4);
    }

    /**
     * Función llamada cuando se hace clic en un botón.
     * @param {number} valor - Valor del botón seleccionado.
     */
    clickBoton(valor) {
        !this.botonesBloqueados && this.validarColorElegido(valor);
    }

    /**
     * Valida si el botón seleccionado por el usuario coincide con el valor de la secuencia.
     * @param {number} valor - Valor del botón seleccionado por el usuario.
     */
    validarColorElegido(valor) {
        if (this.secuencia[this.posicionUsuario] === valor) {
            this.sonidosBotones[valor].play();
            if (this.ronda === this.posicionUsuario) {
                this.actualizarRonda(this.ronda + 1);
                this.velocidad /= 1.02;
                this.verificarFinJuego();
            } else {
                this.posicionUsuario++;
            }
        } else {
            this.juegoPerdido();
        }
    }

    /**
     * Verifica si se ha completado el juego.
     */
    verificarFinJuego() {
        if (this.ronda === this.totalRondas) {
            this.juegoGanado();
        } else {
            this.posicionUsuario = 0;
            this.mostrarSecuencia();
        }
    }

    /**
     * Muestra la secuencia de botones que el usuario debe tocar.
     */
    mostrarSecuencia() {
        this.botonesBloqueados = true;
        let indiceSecuencia = 0;
        let temporizador = setInterval(() => {
            const boton = this.botones[this.secuencia[indiceSecuencia]];
            this.sonidosBotones[this.secuencia[indiceSecuencia]].play();
            this.cambiarEstiloBoton(boton);
            setTimeout(() => this.cambiarEstiloBoton(boton), this.velocidad / 2);
            indiceSecuencia++;
            if (indiceSecuencia > this.ronda) {
                this.botonesBloqueados = false;
                clearInterval(temporizador);
            }
        }, this.velocidad);
    }


    cambiarEstiloBoton(boton) {
        // Cambia el estilo de los botones cuando se muestra la secuencia
        // ... (cambia el estilo del botón)
    }

    juegoPerdido() {
        // Actualiza el juego de Simon cuando el jugador pierde
        // ... (acciones cuando el jugador pierde)
    }

    juegoGanado() {
        // Muestra la animación de victoria y actualiza el juego cuando el jugador gana
        // ... (acciones cuando el jugador gana)
    }
}

const juegoSimon = new JuegoSimon(botonesSimon, botonInicio, tablero);
juegoSimon.iniciar();

