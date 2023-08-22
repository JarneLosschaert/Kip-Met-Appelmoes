const BASE_URL = 'http://kipmetappelmoes/api/restaurants';

async function getRestaurants() {
    const url = BASE_URL + '/list';
    const data = await get(url);
    const restaurants = data.data;

    return restaurants;
}

async function getRestaurant(id) {
    const url = BASE_URL + `/${id}`;
    return get(url);
}

async function getEatingOptions() {
    const url = BASE_URL + '/tags/childfriendliness';
    return get(url);
}

async function get(url) {
    const res = await fetch(url)
        .then(response => response.json())
        .catch(error => console.log(error));
    return res.data;
}

export { getRestaurants, getRestaurant, getEatingOptions };
