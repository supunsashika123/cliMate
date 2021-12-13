import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {WEATHER_ICON_MAP, WEATHER_ICON_COLOR_MAP} from '../../../helpers/utils';
import * as Animatable from 'react-native-animatable';
import moment from 'moment';

const SidebarItem = ({itemIndex, item, onItemSelect}) => {
  const todayWeatherInfomation = item.data.find(
    d => moment().format('YYYY-MM-DD') === d.date,
  );

  return (
    <Animatable.View
      key={itemIndex}
      delay={itemIndex * 300}
      animation="fadeInLeftBig"
      style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => onItemSelect(item)}
        style={styles.button}>
        <View style={styles.tempTextContainer}>
          <Text style={styles.tempText}>{todayWeatherInfomation.maxTemp}</Text>
        </View>
        <View style={styles.townInfoContainer}>
          <Text style={styles.townTitleText}>{item.town}</Text>
          <Text style={styles.townWeatherModeText}>
            {todayWeatherInfomation.mode}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <View
            style={[
              styles.icon,
              {
                shadowColor:
                  WEATHER_ICON_COLOR_MAP[todayWeatherInfomation.mode],
              },
            ]}>
            <Ionicon
              name={WEATHER_ICON_MAP[todayWeatherInfomation.mode]}
              size={28}
              color={WEATHER_ICON_COLOR_MAP[todayWeatherInfomation.mode]}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    marginBottom: 20,
  },
  button: {flexDirection: 'row', alignItems: 'center'},
  tempTextContainer: {flex: 2, alignItems: 'center'},
  tempText: {fontSize: 50, fontWeight: '200'},
  townInfoContainer: {flex: 3},
  townTitleText: {fontSize: 18, fontWeight: 'bold'},
  townWeatherModeText: {fontSize: 15},
  iconContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    backgroundColor: 'white',
    margin: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    elevation: 10,
  },
});

export default SidebarItem;
