import moment from 'moment';
import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {WEATHER_ICON_MAP} from '../../../helpers/utils';

const deviceWidth = Dimensions.get('screen').width;

const TableLayout = ({items}) => {
  return (
    <View style={{width: deviceWidth}}>
      {items.data.map((item, index) => {
        return (
          <View key={index} style={styles.tableRowWrapper}>
            <View style={styles.iconCell}>
              <Ionicon
                name={WEATHER_ICON_MAP[item.mode]}
                size={30}
                color="#333"
              />
            </View>
            <View style={styles.dateCell}>
              <Text style={styles.dayText}>
                {moment(item.date).format('ddd')}
              </Text>
              <Text style={styles.dateText}>
                {moment(item.date).format('DD MMM')}
              </Text>
            </View>
            <View style={styles.tempCell}>
              <Text style={styles.maxTempText}>{item.maxTemp}</Text>
              <Text style={styles.minTempText}>{item.minTemp}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tableRowWrapper: {flexDirection: 'row', flex: 1},
  iconCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateCell: {
    flex: 2,
    justifyContent: 'center',
  },
  dayText: {fontSize: 18, fontWeight: 'bold'},
  dateText: {fontSize: 18},
  tempCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  maxTempText: {fontSize: 18},
  minTempText: {fontSize: 18},
});

export default TableLayout;
