let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    clearInterval(countdown); //limpia el contador
    const now = Date.now(); //el tiempo de ahora
    const then = now + seconds * 1000;
    //console.log(now, then);
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        //console.log(secondsLeft);
        // Revisar si necesitamos pararlo!
        if(secondsLeft < 0) {
        clearInterval(countdown);//limpiar el contador
        return;
        }
        // mostrarlo
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    //console.log(seconds);
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    //console.log({minutes, remainderSeconds});
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
    
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes();
    endTime.textContent = `Volvere a las ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`; //ajustando para mostrar cuando vuelve
}

function startTimer() {
    //console.log(this.dataset.time);
    const seconds = parseInt(this.dataset.time);
    //console.log(seconds);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins * 60);
    this.reset();
});
