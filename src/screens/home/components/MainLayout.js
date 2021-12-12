import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {WEATHER_ICON_MAP} from '../../../helpers/utils';

const deviceWidth = Dimensions.get('screen').width;

const MainLayout = ({item}) => {
  console.log(item);
  return (
    <View style={{width: deviceWidth}}>
      <View style={styles.mainContentWrapper}>
        <Ionicon name={WEATHER_ICON_MAP[item.mode]} size={35} color="#333" />
        <View style={styles.tempValueWrapper}>
          <Text style={styles.mainTempText}>{item.maxTemp}</Text>
          <Text style={styles.mainTempUnitText}>°F</Text>
        </View>
        <Text style={styles.weatherTypeText}>{item.mode}</Text>
        <Text style={styles.subTempText}>
          <Text style={styles.subMaxTempText}>{item.maxTemp}</Text>{' '}
          {item.minTemp}
        </Text>
      </View>
      <View style={styles.secontBoxContentWrapper}>
        <View style={styles.infoBoxContainer}>
          <Ionicon
            name="umbrella-outline"
            size={30}
            color="#333"
            style={styles.icon}
          />
          <Text>{item.rainProbability}</Text>
        </View>
        <View style={styles.infoBoxContainer}>
          <Ionicon
            name="water-outline"
            size={30}
            color="#333"
            style={styles.icon}
          />
          <Text>{item.humiditiy}</Text>
        </View>
        <View style={styles.infoBoxContainer}>
          <MaterialCommunityIcons
            name="weather-windy"
            size={30}
            color="#333"
            style={styles.icon}
          />
          <Text>{item.windSpeed}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContentWrapper: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tempValueWrapper: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginVertical: 10,
  },
  mainTempText: {fontSize: 65, lineHeight: 65},
  mainTempUnitText: {fontSize: 25, lineHeight: 25},
  weatherTypeText: {fontSize: 20},
  subTempText: {fontSize: 20},
  subMaxTempText: {fontWeight: 'bold'},
  secontBoxContentWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  infoBoxContainer: {alignItems: 'center', justifyContent: 'center'},
  icon: {marginBottom: 5},
});

export default MainLayout;
