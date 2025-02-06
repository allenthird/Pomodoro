class PomodoroTimer {
    constructor() {
        this.timeLeft = 25 * 60; // 25 minutes in seconds
        this.timerId = null;
        this.isRunning = false;

        // Timer settings
        this.pomodoroTime = 25 * 60;
        this.shortBreakTime = 5 * 60;
        this.longBreakTime = 15 * 60;

        this.initializeElements();
        this.setupEventListeners();
    }

    initializeElements() {
        this.minutesDisplay = document.getElementById('minutes');
        this.secondsDisplay = document.getElementById('seconds');
        this.startButton = document.getElementById('startButton');
        this.pauseButton = document.getElementById('pauseButton');
        this.pomodoroButton = document.getElementById('pomodoro');
        this.shortBreakButton = document.getElementById('shortBreak');
        this.longBreakButton = document.getElementById('longBreak');
    }

    setupEventListeners() {
        this.startButton.addEventListener('click', () => this.start());
        this.pauseButton.addEventListener('click', () => this.handlePauseReset());
        this.pomodoroButton.addEventListener('click', () => this.setTimer(this.pomodoroTime));
        this.shortBreakButton.addEventListener('click', () => this.setTimer(this.shortBreakTime));
        this.longBreakButton.addEventListener('click', () => this.setTimer(this.longBreakTime));
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
            this.pauseButton.textContent = 'Pause';  // Ensure button shows 'Pause' when starting
            this.timerId = setInterval(() => {
                this.timeLeft--;
                this.updateDisplay();
                
                if (this.timeLeft === 0) {
                    this.pause();
                    this.pauseButton.textContent = 'Reset';
                    alert('Time is up!');
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
        this.timeLeft = this.pomodoroTime;
        this.updateDisplay();
        this.pauseButton.textContent = 'Pause';
    }

    setTimer(time) {
        this.pause();
        this.timeLeft = time;
        this.updateDisplay();
        
        // Update active button
        [this.pomodoroButton, this.shortBreakButton, this.longBreakButton].forEach(button => {
            button.classList.remove('active');
        });
        
        if (time === this.pomodoroTime) this.pomodoroButton.classList.add('active');
        else if (time === this.shortBreakTime) this.shortBreakButton.classList.add('active');
        else if (time === this.longBreakTime) this.longBreakButton.classList.add('active');
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const timer = new PomodoroTimer();
}); 