import axios from 'axios';
import locationFinder from "./WeatherFinder";

export const getLocation = async (searchString: string) => {
    return await (await axios.get(`https://api.weather.gov/points/${searchString}`));

}

export const getHourly = async (weatherData: any) => {
    return await (await axios.get(weatherData));
}
export const getOverview = async (weatherData: any) => {
    return await (await axios.get(weatherData));
}


// export const getOverview = async (searchString: string) => {
//     return await (await axios.get());
// }