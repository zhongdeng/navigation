import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {GlogalScreenRouteProps} from '../../navigation/types';

export type ProfileRouteParams = {
  userId: string;
};

export default () => {
  const route = useRoute<GlogalScreenRouteProps<'Profile'>>();
  return (
    <View style={styles.container}>
      <Text>{`userId: ${route.params.userId}`}</Text>
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
