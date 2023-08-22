import { getRestaurants } from './modules/services/restaurantService.js';

init().then(r => console.log(r));

async function init() {
    await loadRestaurants();
    await loadTags();
}

async function loadTags() {
    
}

async function loadRestaurants() {
    const restaurants = await getRestaurants();
    const $target = document.querySelector('.restaurants');
    console.log(restaurants);

    for (const index in restaurants) {
        const restaurant = restaurants[index];

        const $template = document.querySelector('#restaurant-template');
        const $clone = $template.content.cloneNode(true);
        const $rating = getRating(restaurant.rating);
        const openingHoursToday = getOpeningHoursToday(restaurant.opening_hours);
        const $eatingOptions = getEatingOptions(restaurant.eating_options);

        $clone.querySelector('img').src = restaurant.images[0];
        $clone.querySelector('img').alt = restaurant.name;
        $clone.querySelector('h2').innerText = restaurant.name;
        $clone.querySelector('#rating').innerHTML = $rating;
        $clone.querySelector('#opening-hours').innerText = openingHoursToday;
        $clone.querySelector('#address').innerText = restaurant.address;
        $clone.querySelector('#eatingoptions').innerHTML = $eatingOptions;

        $target.appendChild($clone);
    }
}

function getEatingOptions(eatingOptions) {
    let $html = '';

    for (const index in eatingOptions) {
        const eatingOption = eatingOptions[index];
        $html += `<li><img src="images/${eatingOption.name}.png" alt="eatingoption"></li>`;
    }

    return $html;
}

function getRating(rating) {
    let $html = '';

    for (let i = 0; i < rating; i++) {
        $html += '<img src="images/chicken-full.png" alt="chicken">';
    }
    for (let i = 0; i < 5 - rating; i++) {
        $html += '<img src="images/chicken-empty.png" alt="chicken">';
    }

    return $html;
}

function getOpeningHoursToday(openingHours) {
    const today = new Date().getDay();

    for (const index in openingHours) {
        const openingHour = openingHours[index];
        if (openingHour.day === today) {
            let timeOpen = openingHour.open_time;
            let timeClosed = openingHour.close_time;

            if (!timeOpen) timeOpen = '...';
            if (!timeClosed) timeClosed = '...';
            if (timeOpen === timeClosed) return 'Open 24/7';
            if (!timeOpen && !timeClosed) return 'Vandaag gesloten';

            timeOpen = timeOpen.slice(0, 5);
            timeClosed = timeClosed.slice(0, 5);

            return `${timeOpen} - ${timeClosed}`;
        }
    }
    return 'Vandaag gesloten';
}
