import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import Navigation from '../../navigation/Navigation';

export type SettingRouteParams = undefined;

export default () => {
  return (
    <View style={styles.container}>
      <Button
        title="Sign In"
        onPress={() => {
          Navigation.presentModal('SignIn');
        }}
      />
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
