import React from 'react';
import {View, StyleSheet} from 'react-native';
import Example from '../../example';

export type FeedLineRouteParams = undefined;

export default () => {
  return (
    <View style={styles.container}>
      <Example />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    alignItems: 'stretch',
  },
});
