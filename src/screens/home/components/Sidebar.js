import React from 'react';
import {StyleSheet, ScrollView, Platform} from 'react-native';
import Modal from 'react-native-modal';
import HeaderBar from './HeaderBar';
import SidebarItem from './SidebarItem';

const Sidebar = ({show, onHide, weatherData, onItemSelect}) => {
  const handleItemSelect = selectedItem => {
    onItemSelect(selectedItem);
    onHide();
  };

  return (
    <Modal
      isVisible={show}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      style={styles.container}>
      <HeaderBar onToggleSidebar={() => onHide()} darkMode isOpen />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {weatherData.map((data, i) => (
          <SidebarItem
            key={i}
            item={data}
            itemIndex={i}
            onItemSelect={item => handleItemSelect(item)}
          />
        ))}
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    margin: 0,
    justifyContent: 'flex-start',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  scrollViewContainer: {flex: 1, paddingVertical: 20},
});

export default Sidebar;
