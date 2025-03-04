class PomodoroTimer {
    constructor() {
        this.timeLeft = 25 * 60; // 25 minutes in seconds
        this.timerId = null;
        this.isRunning = false;
        this.initializeElements();
        this.setupEventListeners();
    }

    initializeElements() {
        this.minutesDisplay = document.getElementById('minutes');
        this.secondsDisplay = document.getElementById('seconds');
        this.startButton = document.getElementById('startButton');
        this.pauseButton = document.getElementById('pauseButton');
    }

    setupEventListeners() {
        this.startButton.addEventListener('click', () => this.start());
        this.pauseButton.addEventListener('click', () => this.handlePauseReset());
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        const displayMinutes = minutes.toString().padStart(2, '0');
        const displaySeconds = seconds.toString().padStart(2, '0');
        
        // Update timer display
        this.minutesDisplay.textContent = displayMinutes;
        this.secondsDisplay.textContent = displaySeconds;
        
        // Update browser tab title
        document.title = `${displayMinutes}:${displaySeconds} - Pomodoro Timer`;
    }

    handlePauseReset() {
        if (this.isRunning) {
            this.pause();
            this.pauseButton.textContent = 'Reset';
        } else {
            this.reset();
            this.pauseButton.textContent = 'Pause';
        }
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.pauseButton.textContent = 'Pause';
            this.timerId = setInterval(() => {
                this.timeLeft--;
                this.updateDisplay();
                
                if (this.timeLeft === 0) {
                    this.pause();
                    this.pauseButton.textContent = 'Reset';
                    
                    // Flash the beach image
                    const modelImage = document.querySelector('.model-image');
                    const originalSrc = modelImage.src;
                    modelImage.src = 'images/beach.jpg';
                    
                    setTimeout(() => {
                        modelImage.src = originalSrc;
                        this.reset();
                    }, 200);
                }
            }, 1000);
        }
    }

    pause() {
        this.isRunning = false;
        clearInterval(this.timerId);
        this.pauseButton.textContent = 'Reset';
    }

    reset() {
        this.pause();
        this.timeLeft = 25 * 60; // Reset to 25 minutes
        this.updateDisplay();
        this.pauseButton.textContent = 'Pause';
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const timer = new PomodoroTimer();
});