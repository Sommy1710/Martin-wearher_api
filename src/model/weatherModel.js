import axios from 'axios';
import redis from 'redis';

/*const redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_HOST || '127.0.0.1'}:${process.env.REDIS_PORT || 6379}`, 
});

(async () => {
    try{
        await redisClient.connect();
        console.log('redis connected');
    } catch(error) {
        console.error('failed to connect to redis:', error);
        process.exit(1);
    }
})();*/

const fetchWeatherDataFromAPI = async (city) => {
    const apiKey = process.env.WEATHER_API_KEY;
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`;

    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data from API:", error);
        throw new Error("Failed to fetch weather data from API");
    }
};


//const getWeatherDataFromCache = async (city) => {
  //  try {
    //    const cachedData = await redisClient.get(city);
      //  return cachedData ? JSON.parse(cachedData) : null;
    //} catch (error) {
      //  console.error('error retrieving data from redis cache:', error);
       // throw new Error('failed to retrieve data from redis cache');
    //}

    /* We ask Redis (our super speedy memory friend) if it already has weather info saved for this city.
 We use await because we want to pause here until Redis replies.
If Redis did have data, great! It’s stored as a string, so we turn it back into real data using JSON.parse.
If Redis didn’t have anything for that city, we just return null, which means “no data found.” */
//};

/*const saveWeatherDataToCache = async (city, weatherData) => {
    try{
        await redisClient.set(city, JSON.stringify(weatherData), 'EX', 3600);
    } catch (error) {
        console.error('error retrieving data from redis cache:', error);
        throw new Error('failed to retrieve data from redis cache')
    }
};*/

const getWeatherModel = async(city) => {
    //try {
      //  const cachedData = await getWeatherDataFromCache(city);
        //if (cachedData) {
          //  console.log(`data for ${city} fetched from redis cache`);
            //return {source: 'cache', data: cachedData};
        //}

        const weatherData = await fetchWeatherDataFromAPI(city);
        //await saveWeatherDataToCache(city, weatherData);
        //console.log(`Data for ${city} fetched from API and saved to redis cache`);
        return {source: 'api', data: weatherData};
    //} catch (error) {
     //   console.log('unable to get weather data:', error);
       // throw new Error('failed to get weather data');
    //}
};

export default getWeatherModel;