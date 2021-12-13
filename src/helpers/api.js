export const getWeatherObject = async => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(require('../assets/data/weather.json'));
      }, 2000);
    } catch (err) {
      reject(err);
    }
  });
};
