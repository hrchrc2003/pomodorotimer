class PomodoroTimer {
    constructor() {
        this.isRunning = false;
        this.intervalId = null;
        this.currentMode = 'work';
        this.workTime = 25 * 60; // 25分
        this.breakTime = 5 * 60; // 5分
        this.remainingTime = this.workTime;
        
        this.initializeElements();
        this.initializeEventListeners();
    }

    initializeElements() {
        this.timerDisplay = document.getElementById('timer-display');
        this.startBtn = document.getElementById('start-btn');
        this.stopBtn = document.getElementById('stop-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.workTimeInput = document.getElementById('work-time');
        this.breakTimeInput = document.getElementById('break-time');
        this.workModeBtn = document.getElementById('work-mode-btn');
        this.breakModeBtn = document.getElementById('break-mode-btn');
        this.fontSelect = document.getElementById('font-select');
    }

    initializeEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.stopBtn.addEventListener('click', () => this.stop());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.workTimeInput.addEventListener('change', () => {
            this.workTime = parseInt(this.workTimeInput.value) * 60;
            this.reset();
        });
        this.breakTimeInput.addEventListener('change', () => {
            this.breakTime = parseInt(this.breakTimeInput.value) * 60;
            this.reset();
        });
        this.workModeBtn.addEventListener('click', () => this.selectMode('work'));
        this.breakModeBtn.addEventListener('click', () => this.selectMode('break'));
        this.fontSelect.addEventListener('change', () => this.changeFont());
    }

    changeFont() {
        const selectedFont = this.fontSelect.value;
        switch(selectedFont) {
            case 'meiryo':
                document.body.style.fontFamily = 'Meiryo, sans-serif';
                break;
            case 'mincho':
                document.body.style.fontFamily = 'MS Mincho, serif';
                break;
            case 'gothic':
                document.body.style.fontFamily = 'MS Gothic, sans-serif';
                break;
        }
        this.updateDisplay();
    }

    selectMode(mode) {
        this.currentMode = mode;
        this.workModeBtn.classList.toggle('active', mode === 'work');
        this.breakModeBtn.classList.toggle('active', mode === 'break');
        this.remainingTime = mode === 'work' ? this.workTime : this.breakTime;
        this.updateDisplay();
    }

    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.intervalId = setInterval(() => {
            if (this.remainingTime <= 0) {
                this.switchMode();
                this.remainingTime = this.currentMode === 'work' ? this.workTime : this.breakTime;
            }
            this.remainingTime--;
            this.updateDisplay();
        }, 1000);
    }

    stop() {
        if (!this.isRunning) return;
        
        this.isRunning = false;
        clearInterval(this.intervalId);
    }

    reset() {
        this.stop();
        this.remainingTime = this.workTime;
        this.currentMode = 'work';
        this.updateDisplay();
    }

    switchMode() {
        this.currentMode = this.currentMode === 'work' ? 'break' : 'work';
    }

    updateDisplay() {
        const minutes = Math.floor(this.remainingTime / 60);
        const seconds = this.remainingTime % 60;
        this.timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

// インスタンスの生成
const timer = new PomodoroTimer();
