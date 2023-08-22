import { getRestaurants, getRestaurant, getEatingOptions } from './modules/services/restaurantService.js';

await init();

async function init() {
    const eatingOptions = await getEatingOptions();
    console.log(eatingOptions);
}
