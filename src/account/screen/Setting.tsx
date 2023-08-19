import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export type SettingRouteParams = undefined;

export default () => {
  return (
    <View style={styles.container}>
      <Text>Setting</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
});
