import {getWeatherObject} from '../helpers/api';

export const fetchNewData = async () => {
  return await getWeatherObject();
};
