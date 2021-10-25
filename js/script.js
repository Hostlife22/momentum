import { showTime } from './time.js';
import { showGreeting, getTimeOfDay } from './greeting.js'
import { setBg, getRandomNum } from './bg.js';
import { playListSounds } from './mp3.js'
import { langArr } from './lang.js'


showTime(); // Time
showDate(); // Date
showGreeting(getTimeOfDay); // Greeting 


//weather
export const city = document.querySelector('.city');
document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', event => {
    if (event.code === 'Enter') {
        getWeather();
        city.blur();
    }
});


// slide 
let randomNum = getRandomNum();
setBg(getTimeOfDay, randomNum);



function getSlideNext() {
    if (randomNum === 20) {
        randomNum = 1;
        return setBg(getTimeOfDay, randomNum)
    }
    randomNum += 1;
    return setBg(getTimeOfDay, randomNum)
};



function getSlidePrev() {
    if (randomNum === 1) {
        randomNum = 20;
        return setBg(getTimeOfDay, randomNum)
    }
    randomNum -= 1;
    return setBg(getTimeOfDay, randomNum)
};



const slideNext = document.querySelector('.slide-next');
slideNext.addEventListener('click', getSlideNext)

const slidePrev = document.querySelector('.slide-prev');
slidePrev.addEventListener('click', getSlidePrev)



playListSounds();



const select = document.querySelector('.select');
const allLang = ['en', 'ru']



select.addEventListener('change', changeURLLanguage);

function changeURLLanguage() {
    let lang = select.value;
    location.href = window.location.pathname + '#' + lang;
    location.reload();
}

let hashN = 'en';




export function changeLanguage() {
    let hash = window.location.hash;

    hash = hash.substr(1);
    if (!allLang.includes(hash)) {
        location.href = window.location.pathname + '#en';
        location.reload();
    }
    select.value = hash;
    document.querySelector('title').innerHTML = langArr['unit'][hash];

    const timeOfDay = getTimeOfDay();
    document.querySelector('.greeting').innerHTML = langArr[timeOfDay][hash];
    hashN = hash;
}
changeLanguage();






export async function getQuotes() {
    const quote = document.querySelector('.quote');
    const author = document.querySelector('.author');
    const name = document.querySelector('.name');
    const quotes = 'data.json';
    const res = await fetch(quotes);
    const data = await res.json();
    let hash = window.location.hash;
    hash = hash.substr(1);
    const randomQuote = data[Math.trunc(Math.random() * (data.length - 2)) + 1];
    name.setAttribute('placeholder', langArr['name'][hash])
    quote.textContent = randomQuote[hashN].text;
    author.textContent = randomQuote[hashN].author;
}

getQuotes()
const changeQquote = document.querySelector('.change-quote');
changeQquote.addEventListener('click', () => {
    getQuotes();
})



export async function getWeather() {
    const weatherIcon = document.querySelector('.weather-icon');
    const temperature = document.querySelector('.temperature');
    const weatherDescription = document.querySelector('.weather-description');
    if (city.value === '') {
        city.value = 'Minsk'
    }



    function setLocalStorage() {
        localStorage.setItem('city', city.value);
    }
    window.addEventListener('beforeunload', setLocalStorage)
    function getLocalStorage() {
        if (localStorage.getItem('city')) {
            city.value = localStorage.getItem('city');
        }
    }
    window.addEventListener('load', getLocalStorage)




    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${hashN}&appid=4da89e5a427d224116d9aed86e58a34a&units=metric`;
    const res = await fetch(url);
    const data = await res.json();


    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.trunc(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;

    const wind = document.querySelector('.wind');
    const humidity = document.querySelector('.humidity');

    wind.textContent = `${langArr['speed'][hashN]} ${Math.trunc(data.wind.speed)} ${langArr['ms'][hashN]} `;
    humidity.textContent = `${langArr['humidity'][hashN]} ${data.main.humidity}%`
}

export function showDate() {
    const day = document.querySelector('.date');
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: '2-digit' };
    let hash = window.location.hash;
    hash = hash.substr(1);
    const currentDate = date.toLocaleDateString(langArr['greeting'][hash], options);

    day.textContent = currentDate;
}