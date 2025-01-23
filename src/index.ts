import { promptUserForDifficulty } from "./helpers/promptUserForDifficulty.js";
import { promptUserForTemperature } from "./helpers/promptUserForTemperature.js";
import { getRandomCityName } from "./services/RestCountriesApi.js";
import { fetchCityWeather } from "./services/WeatherApi.js";

main();

async function main() {
  const city = await getRandomCityName();
  const cityWeather = await fetchCityWeather(city.name);

  const difficulty = await promptUserForDifficulty();
  let userTemperatureGuess;

  do {
    userTemperatureGuess = await promptUserForTemperature(city.name, difficulty, cityWeather);

    if (userTemperatureGuess < cityWeather.temperature) { console.log("C'est plus !"); }
    if (userTemperatureGuess > cityWeather.temperature) { console.log("C'est moins !"); }

  } while (userTemperatureGuess !== cityWeather.temperature);

  console.log(`Bien joué ! La température à ${city.name} est bien de ${cityWeather.temperature}°C.`);
}