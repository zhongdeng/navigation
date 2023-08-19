import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {GlogalScreenRouteProps} from '../../navigation/types';

export type FeedDetailRouteParams = {
  feedId: string;
};

export default () => {
  const route = useRoute<GlogalScreenRouteProps<'FeedDetail'>>();
  return (
    <View style={styles.container}>
      <Text style={styles.param}>{`feedId: ${route.params.feedId}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    alignItems: 'stretch',
  },
  param: {
    alignSelf: 'center',
  },
});
