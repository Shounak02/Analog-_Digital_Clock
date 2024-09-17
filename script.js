let stopwatchInterval;
let stopwatchTime = 0; // Time in seconds
let alarmTime = null;

// Initialize clock
setInterval(getCurrentTime, 1000);

function getCurrentTime() {
    var currentTime = new Date();
    var hourRatio = currentTime.getHours();
    var minuteRatio = currentTime.getMinutes();
    var secondRatio = currentTime.getSeconds();
    let hourHand = (30 * hourRatio) + (minuteRatio / 2);
    let minuteHand = (6 * minuteRatio);
    let secondHand = (6 * secondRatio);

    document.getElementById('hour').style.transform = `rotate(${hourHand}deg)`;
    document.getElementById('minute').style.transform = `rotate(${minuteHand}deg)`;
    document.getElementById('second').style.transform = `rotate(${secondHand}deg)`;

    const digitalTime = `${hourRatio.toString().padStart(2, '0')}:${minuteRatio.toString().padStart(2, '0')}:${secondRatio.toString().padStart(2, '0')}`;
    document.getElementById("digital-time").innerText = digitalTime;

    if (alarmTime && alarmTime === digitalTime) {
        playAlarmSound(); // Play the alarm sound
        alarmTime = null; // Clear alarm after ringing
    }
}

// Toggle between analog and digital modes
document.getElementById("mode-switch").addEventListener("click", function () {
    const analogClock = document.getElementById("analog-clock");
    const digitalClock = document.getElementById("digital-clock");
    const modeSwitch = document.getElementById("mode-switch");

    if (analogClock.style.display !== "none") {
        analogClock.style.display = "none";
        digitalClock.style.display = "block";
        modeSwitch.innerText = "Switch to Analog Mode";
    } else {
        analogClock.style.display = "block";
        digitalClock.style.display = "none";
        modeSwitch.innerText = "Switch to Digital Mode";
    }
});

// Stopwatch functionality
document.getElementById("start-stopwatch").addEventListener("click", function () {
    if (!stopwatchInterval) {
        stopwatchInterval = setInterval(function () {
            stopwatchTime++;
            document.getElementById('stopwatch-time').innerText = formatTime(stopwatchTime);
        }, 1000);
    }
});

document.getElementById("stop-stopwatch").addEventListener("click", function () {
    if (stopwatchInterval) {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
    }
});

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Alarm functionality
document.getElementById("set-alarm").addEventListener("click", function () {
    const alarmTimeInput = prompt('Enter alarm time (HH:MM:SS):');
    if (alarmTimeInput) {
        alarmTime = alarmTimeInput;
    }
});

document.getElementById("delete-alarm").addEventListener("click", function () {
    alarmTime = null;
});

function playAlarmSound() {
    const alarmSound = document.getElementById("alarm-sound");
    alarmSound.play();
}
