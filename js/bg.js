// import { getTimeOfDay } from './greeting'

export function getRandomNum() {
    const min = 1;
    const max = 20;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function setBg(timeOfDay, bgNum) {
    const body = document.querySelector('.body')
    const toDay = timeOfDay();
    const imgRandom = String(
        bgNum)
        .padStart(2, '0');
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${toDay}/${imgRandom}.jpg`;
    img.addEventListener('load', () => {
        body.style.backgroundImage = `url(${img.src})`
    })




}




