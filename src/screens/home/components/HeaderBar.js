import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';

const HeaderBar = ({onToggleSidebar, darkMode}) => {
  const textColor = darkMode ? '#333' : '#fff';

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.menuButtonContainer}>
        <TouchableOpacity onPress={() => onToggleSidebar()}>
          <AntIcon name="menu-fold" size={18} color={textColor} />
        </TouchableOpacity>
      </View>
      <View style={styles.appTitleContainer}>
        <Text style={[styles.appTitle, {color: textColor}]}>cliMate</Text>
      </View>
      <View style={styles.searchIconContainer}>
        <AntIcon name="search1" size={18} color={textColor} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {width: '100%', flexDirection: 'row'},
  menuButtonContainer: {flex: 1},
  appTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  appTitle: {fontSize: 18},
  searchIconContainer: {flex: 1, alignItems: 'flex-end'},
});

export default HeaderBar;
