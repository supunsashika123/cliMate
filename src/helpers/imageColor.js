import ImageColors from 'react-native-image-colors';

export const getColorFromImage = async uri => {
  const result = await ImageColors.getColors(uri, {
    fallback: '#228B22',
    cache: true,
    key: 'unique_key',
  });

  return result.vibrant;
};
