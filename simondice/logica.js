const tablero = document.getElementById('round');
const botonesSimon = document.getElementsByClassName('square');
const botonInicio = document.getElementById('startButton');

class JuegoSimon {
    constructor(botonesSimon, botonInicio, tablero) {
        this.ronda = 0;
        this.posicionUsuario = 0;
        this.totalRondas = 5; // Acá podemos modificar la cantidad de niveles disponibles 
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
    


    /**
  * Cambia el estilo visual de un botón al alternar la clase 'active'.
  * @param {Element} boton - El botón al que se le cambiará el estilo.
  */
    cambiarEstiloBoton(boton) {
        boton.classList.toggle('active');
    }

    /**
     * Realiza acciones específicas cuando el jugador pierde en el juego de Simon.
     * - Reproduce un sonido de error.
     * - Habilita el botón de inicio del juego.
     * - Bloquea los botones para evitar interacciones adicionales.
     * - Inicia una animación de derrota.
     */
    juegoPerdido() {
        this.sonidoError.play();
        this.interfaz.botonInicio.disabled = false;
        this.botonesBloqueados = true;

        // Agregar la clase de animación de derrota a los elementos square
        Array.from(this.botones).forEach(elemento => {
            elemento.classList.add('derrota');
        });

        // Eliminar la clase después de un tiempo para permitir una nueva animación
        setTimeout(() => {
            Array.from(this.botones).forEach(elemento => {
                elemento.classList.remove('derrota');
            });
        }, 500); // Ajusta el tiempo según la duración de tu animación en CSS
    }

    /**
     * Realiza acciones específicas cuando el jugador gana en el juego de Simon.
     * - Habilita el botón de inicio del juego.
     * - Bloquea los botones para evitar interacciones adicionales.
     * - Agrega la clase 'ganador' a cada botón para una apariencia visual especial.
     * - Actualiza la ronda con un emoji de fuego 🔥.
     */
    juegoGanado() {
        this.interfaz.botonInicio.disabled = false;
        this.botonesBloqueados = true;
        this.botones.forEach(elemento => {
            elemento.classList.add('ganador');
        });
        this.actualizarRonda('🔥');
    }
}

const juegoSimon = new JuegoSimon(botonesSimon, botonInicio, tablero);
juegoSimon.iniciar();

