import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Example from '../../example';
import SignInButton from '../../example/SignInButton';
import SignOutButton from '../../example/SignOutButton';
import {GlogalScreenNavigationProps} from '../../navigation/types';
import {useAuthStore} from '../../store';

export type FeedLineRouteParams = undefined;

export default () => {
  const navigation = useNavigation<GlogalScreenNavigationProps<'FeedLine'>>();

  const token = useAuthStore(state => state.token);
  const headerRight = useCallback(
    () => (!token ? <SignInButton /> : null),
    [token],
  );
  const headerLeft = useCallback(
    () => (token ? <SignOutButton /> : null),
    [token],
  );
  useEffect(() => {
    navigation.setOptions({headerRight, headerLeft});
  }, [navigation, headerRight, headerLeft]);

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
