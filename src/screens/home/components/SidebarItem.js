import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {WEATHER_ICON_MAP} from '../../../helpers/utils';
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
          <Ionicon
            name={WEATHER_ICON_MAP[todayWeatherInfomation.mode]}
            size={30}
            color="#333"
          />
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
  iconContainer: {flex: 1},
});

export default SidebarItem;
