import { showGreeting } from './greeting.js';
import { showDate } from './script.js'
import { langArr } from './lang.js'

export function showTime() {
    const time = document.querySelector('.time');
    const date = new Date();
    const currentTime = date.toLocaleTimeString();

    setTimeout(() => {
        showTime();
        showDate();
        showGreeting();
    }, 1000);

    time.textContent = currentTime;
}





