import React from 'react';
import {Button} from 'react-native';
import {useAuthStore} from '../store';

const SignInButton = () => {
  const signOut = useAuthStore(state => state.signOut);
  return (
    <Button
      title="SignOut"
      onPress={() => {
        // 保存授权信息
        signOut();
      }}
    />
  );
};

export default SignInButton;
