import {useNavigation, useNavigationState} from '@react-navigation/native';
import React, {useState} from 'react';
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
          const parentState = Navigation.currentParentState(navigation);
          const parentTopRouteName = parentState?.routeNames[parentState.index];
          // // 1.如果parentTopRouteName为空则表示当前页面在最顶层的Navigator上，直接返回
          // if (!parentTopRouteName) {
          //   Navigation.goBack();
          // }
          // // 2.如果当前页面在FeedNavigator上，也直接返回
          // if (parentTopRouteName === 'FeedNavigator') {
          //   Navigation.goBack();
          // }
          // // 3.如果当前页面在MessageNavigator上，分两种情况
          // if (parentTopRouteName === 'MessageNavigator') {
          //   if (routes.length === 1) {
          //     // 一种是当前页面在所在Navigator的根部，也就是第一个Tab页即显示登录页，这种情况下替换当前登录页
          //     Navigation.reset({
          //       index: 0,
          //       routes: [{name: 'MessageList'}],
          //     });
          //   } else {
          //     // 一种是不在根部，返回即可
          //     Navigation.goBack();
          //   }
          // }
          // 如果当前页面在Modal的Navigator上，也分两种情况
          if (parentTopRouteName === 'Modal') {
            if (routes.length === 1) {
              // 在根部，直接返回，模态弹窗消失
              Navigation.goBack();
            } else {
              // 不在根部，返回操作的是在Modal的栈中返回，模态弹窗不会消失，需要让Root捕获这个goBack的Action
              Navigation.goBack({target: Navigation.ref.getRootState().key});
            }
          }
          //  else {
          //   Navigation.goBack();
          // }
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
