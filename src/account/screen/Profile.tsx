import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {GlogalScreenRouteProps} from '../../navigation/types';
import {useAuthStore} from '../../store';

export type ProfileRouteParams = {
  username: string;
};

export default () => {
  const route = useRoute<GlogalScreenRouteProps<'Profile'>>();
  const username = useAuthStore(state => state.username);
  return (
    <View style={styles.container}>
      {username ? (
        <Text>{`from auth: ${username}`}</Text>
      ) : (
        <Text>{`from route: ${route.params.username}`}</Text>
      )}
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
