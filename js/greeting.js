
const name = document.querySelector('.name');



export function showGreeting() {
    function setLocalStorage() {
        localStorage.setItem('name', name.value);
    }
    window.addEventListener('beforeunload', setLocalStorage)
    function getLocalStorage() {
        if (localStorage.getItem('name')) {
            name.value = localStorage.getItem('name');
        }
    }
    window.addEventListener('load', getLocalStorage)

}

export function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    let greet;

    switch (true) {

        case (hours >= 5) && (hours < 11): greet = 'morning';

            break;

        case (hours >= 11) && (hours < 16): greet = 'evening';

            break;

        case (hours >= 16) && (hours <= 23): greet = 'afternoon';

            break;

        case (hours >= 0) && (hours < 5): greet = 'night';

            break;

    }
    return greet;

}