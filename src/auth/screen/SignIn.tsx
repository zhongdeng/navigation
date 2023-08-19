import React from 'react';
import {Button, View, StyleSheet} from 'react-native';
import Navigation from '../../navigation/Navigation';

export type SignInRouteParams = undefined;

export default () => {
  return (
    <View style={styles.container}>
      <Button
        title="Sign Up"
        onPress={() => {
          Navigation.navigate('SignUp', {showSomething: true});
          // Navigation.navigateWithModal('SignUp', {showSomething: false});
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
