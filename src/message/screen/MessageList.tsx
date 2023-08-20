import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Example from '../../example';
import {GlogalScreenNavigationProps} from '../../navigation/types';
import {useAuthStore} from '../../store';
import SignOutButton from '../../example/SignOutButton';

export type MessageListRouteParams = undefined;

export default () => {
  const navigation =
    useNavigation<GlogalScreenNavigationProps<'MessageList'>>();
  const token = useAuthStore(state => state.token);
  const headerLeft = useCallback(
    () => (token ? <SignOutButton /> : null),
    [token],
  );
  useEffect(() => {
    navigation.setOptions({headerLeft});
  }, [navigation, headerLeft]);
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
