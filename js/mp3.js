import { playList } from './playList.js';


export function playListSounds() {
    const list = document.querySelector('.play-list');
    playList.forEach(el => {
        let li = document.createElement('li');
        li.classList.add('play-item')
        li.textContent = el.title;
        list.append(li)
    })
}


const audio = new Audio();

const playBtn = document.querySelector('#play');
const srcSong = playList.map(song => {
    const { src: src } = song;
    return src;
})


let playNum = 0;
let currentTimeNew = 0;
let durationSingle = '0.39';

function focusList(playNum) {
    const focusList = [...document.getElementsByTagName('li')]
    focusList[playNum].classList.add('item-active');
}

const span = document.createElement('span');

function activeTitle() {
    const titleArray = playList.map(titleArt => {
        const { title: title } = titleArt;
        return title;
    })
    const player = document.querySelector('.player');
    span.classList.add('player-article')
    span.textContent = `${playNum + 1}. ` + titleArray[playNum] + ` | ${secondsToHms(currentTimeNew)} / ${durationSingle}`;

    player.prepend(span);
}


function secondsToHms(d) {
    d = Number(d);
    let m = Math.floor(d % 3600 / 60);
    let s = Math.floor(d % 3600 % 60);


    setTimeout(() => {
        activeTitle()
        durationSong();
    }, 1000)
    return `${m}.${s}`;
}

function durationSong() {
    const duration = Number(audio.duration);
    let m = Math.floor(duration % 3600 / 60);
    let s = Math.floor(duration % 3600 % 60);
    durationSingle = `${m}.${s}`;
}

const sound = document.querySelector('#sound');
sound.addEventListener('click', (e) => {
    const width = sound.clientWidth;
    const clickX = e.offsetX;
    let volumeNew = clickX / width;
    if (volumeNew > 1) {
        volumeNew = 1;
    } else if (volumeNew < 0) {
        volumeNew = 0
    }
    audio.volume = volumeNew;
})


function playAudio() {
    if (audio.paused) {
        audio.src = srcSong[`${playNum}`];
        playBtn.classList.remove("play");
        playBtn.classList.add("pause");
        audio.currentTime = currentTimeNew;
        audio.play();
        focusList(playNum);
        activeTitle()
    } else {
        playBtn.classList.remove("pause");
        playBtn.classList.add("play");
        audio.pause();
    }
}

function isPlayed() {
    if (audio.played) {
        playBtn.classList.remove("pause");
        playBtn.classList.add("play");
        audio.pause();
    }
}

playBtn.addEventListener('click', playAudio);


const next = document.querySelector('.play-next');
const prev = document.querySelector('.play-prev');


function playNext() {
    const focusList = [...document.getElementsByTagName('li')]
    currentTimeNew = 0;
    durationSingle = '0.0';

    focusList[playNum].classList.remove('item-active')
    isPlayed();
    (playNum === 3) ? playNum = 0 : playNum += 1;

    playAudio()
}


function playPrev() {
    const focusList = [...document.getElementsByTagName('li')];
    currentTimeNew = 0;
    durationSingle = '0.0';
    focusList[playNum].classList.remove('item-active');
    (playNum === 0) ? playNum = 3 : playNum -= 1;

    isPlayed();
    playAudio()
}


next.addEventListener('click', playNext)
prev.addEventListener('click', playPrev)


//Progress bar 
const progressContainer = document.querySelector('.progress__container');
const progress = document.querySelector('.progress');

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    currentTimeNew = currentTime;
}
audio.addEventListener('timeupdate', updateProgress);

//set progress
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration;

}
progressContainer.addEventListener('click', setProgress)

// Autoplay
audio.addEventListener('ended', playNext)





