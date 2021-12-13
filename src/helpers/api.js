export const getWeatherObject = async => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(require('../assets/data/weather.json'));
      }, 100);
    } catch (err) {
      reject(err);
    }
  });
};
