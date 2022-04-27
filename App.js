import React from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import MusicPlayer from './component/MusicPlayer';
import Activity from './ExpandableDrawer';


export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content"/>
      <MusicPlayer/>
      {/* <Activity/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  },
});
