class Simon {
    constructor(simonButtons, startButton, round) {
        this.round = 0;
        this.userPosition = 0;
        this.totalRounds = 1;
        this.sequence = [];
        this.speed = 1000;
        this.blockedButtons = true;
        this.buttons = Array.from(simonButtons);
        this.display = { startButton, round };
        this.errorSound = new Audio('./sonidos/error.wav');
        this.buttonSounds = [
            new Audio('./sonidos/1.mp3'),
            new Audio('./sonidos/2.mp3'),
            new Audio('./sonidos/3.mp3'),
            new Audio('./sonidos/4.mp3'),
        ];
    }

    init() {
        this.display.startButton.onclick = () => this.startGame();
    }

    startGame() {
        this.display.startButton.disabled = true; 
        this.updateRound(0);
        this.userPosition = 0;
        this.sequence = this.createSequence();
        this.buttons.forEach((element, i) => {
            element.onclick = () => this.buttonClick(i);
        });
        this.showSequence();
    }

    updateRound(value) {
        this.round = value;
        // Código relacionado con la interfaz visual
    }

    createSequence() {
        return Array.from({ length: this.totalRounds }, () =>  this.getRandomColor());
    }

    getRandomColor() {
        return Math.floor(Math.random() * 4);
    }

    buttonClick(value) {
        !this.blockedButtons && this.validateChosenColor(value);
    }

    validateChosenColor(value) {
        // Lógica de validación del color elegido por el usuario
    }

    isGameOver() {
        // Lógica de fin de juego
    }

    showSequence() {
        // Lógica para mostrar la secuencia
    }

    toggleButtonStyle(button) {
        // Cambio de estilo de los botones durante la secuencia
    }

    gameLost() {
        // Acciones cuando el jugador pierde
    }

    gameWon() {
        // Acciones cuando el jugador gana
    }
}

const simon = new Simon(simonButtons, startButton, round);
simon.init();
