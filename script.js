document.addEventListener("DOMContentLoaded", () => {
    const timeDisplay = document.getElementById("time");
    const startButton = document.getElementById("start");
    const stopButton = document.getElementById("stop");
    const resetButton = document.getElementById("reset");
    const lapButton = document.getElementById("lap");
    const lapsContainer = document.getElementById("laps");

    let startTime = 0;
    let elapsedTime = 0;
    let timerInterval;
    let running = false;

    const formatTime = (time) => {
        const milliseconds = Math.floor((time % 1000) / 10);
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / (1000 * 60)) % 60);
        const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

        return (
            (hours < 10 ? "0" + hours : hours) + ":" +
            (minutes < 10 ? "0" + minutes : minutes) + ":" +
            (seconds < 10 ? "0" + seconds : seconds) + "." +
            (milliseconds < 10 ? "0" + milliseconds : milliseconds)
        );
    };

    const updateDisplay = () => {
        timeDisplay.textContent = formatTime(elapsedTime);
    };

    const startTimer = () => {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        startButton.classList.add("hidden");
        stopButton.classList.remove("hidden");
    };

    const stopTimer = () => {
        clearInterval(timerInterval);
        startButton.classList.remove("hidden");
        stopButton.classList.add("hidden");
    };

    startButton.addEventListener("click", () => {
        if (!running) {
            startTimer();
        }
        running = true;
    });

    stopButton.addEventListener("click", () => {
        if (running) {
            stopTimer();
        }
        running = false;
    });

    resetButton.addEventListener("click", () => {
        clearInterval(timerInterval);
        running = false;
        elapsedTime = 0;
        updateDisplay();
        startButton.classList.remove("hidden");
        stopButton.classList.add("hidden");
        lapsContainer.innerHTML = "";
    });

    lapButton.addEventListener("click", () => {
        if (running) {
            const lapTime = document.createElement("div");
            lapTime.textContent = formatTime(elapsedTime);
            lapsContainer.appendChild(lapTime);
        }
    });
});
