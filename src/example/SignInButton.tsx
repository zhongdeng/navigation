import React from 'react';
import {Button} from 'react-native';
import Navigation from '../navigation/Navigation';

const SignInButton = () => {
  return (
    <Button
      title="SignIn"
      onPress={() => {
        Navigation.presentModal('SignIn');
      }}
    />
  );
};

export default SignInButton;
