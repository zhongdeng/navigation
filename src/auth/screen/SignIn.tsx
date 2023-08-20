import {useNavigation, useNavigationState} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Button, View, StyleSheet, TextInput} from 'react-native';
import Navigation from '../../navigation/Navigation';
import {generateToken, useAuthStore} from '../../store';

export type SignInRouteParams = undefined;

export default () => {
  const navigation = useNavigation();
  const routes = useNavigationState(state => state.routes);
  const [username, setUsername] = useState('');
  const signIn = useAuthStore(state => state.signIn);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={username}
        onChangeText={setUsername}
      />
      <Button
        title="Sign In"
        disabled={username.length === 0}
        onPress={() => {
          // 保存授权信息
          const token = generateToken(64);
          signIn(token, username);

          // 查找父级Navigator的栈顶路由名称，用于判断登录页在哪里，以进行不同的操作
          const parentState = Navigation.getParentState(navigation);
          const parentTopRouteName = parentState?.routeNames[parentState.index];
          // 如果当前页面在Modal的Navigator上，也分两种情况
          if (parentTopRouteName === 'Modal') {
            if (routes.length === 1) {
              // 在根部，直接返回，模态弹窗消失
              Navigation.goBack();
            } else {
              // 不在根部，返回操作的是在Modal的栈中返回，模态弹窗不会消失，需要让Root捕获这个goBack的Action
              Navigation.goBack({target: Navigation.getRootState().key});
            }
          } else if (parentTopRouteName !== 'MessageNavigator') {
            // 如果是MessageNavigator，则不需要返回，直接替换，替换操作在对应的Navigator中监听操作
            Navigation.goBack();
          }
        }}
      />
      <Button
        title="Sign Up"
        onPress={() => {
          Navigation.navigate('SignUp', {showSomething: true});
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
  textInput: {
    minWidth: 40,
    height: 40,
    fontSize: 18,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: 'lightgray',
  },
});
