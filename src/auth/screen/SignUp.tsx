import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {GlogalScreenRouteProps} from '../../navigation/types';

export type SignUpRouteParams = {
  showSomething: boolean;
};

export default () => {
  const route = useRoute<GlogalScreenRouteProps<'SignUp'>>();
  return (
    <View style={styles.container}>
      <Text>{`showSomething: ${route.params.showSomething}`}</Text>
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
