import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {GlogalScreenRouteProps} from '../../navigation/types';

export type MessageDetailRouteParams = {
  messageId: string;
};

export default () => {
  const route = useRoute<GlogalScreenRouteProps<'MessageDetail'>>();
  return (
    <View style={styles.container}>
      <Text style={styles.param}>{`messageId: ${route.params.messageId}`}</Text>
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
