import {RouteConfig, StackNavigationState} from '@react-navigation/native';
import {
  NativeStackNavigationEventMap,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import SignIn, {SignInRouteParams} from './screen/SignIn';
import SignUp, {SignUpRouteParams} from './screen/SignUp';

export type AuthParamList = {
  SignIn: SignInRouteParams;
  SignUp: SignUpRouteParams;
};

type AuthRouteConfig = RouteConfig<
  AuthParamList,
  keyof AuthParamList,
  StackNavigationState<AuthParamList>,
  NativeStackNavigationOptions,
  NativeStackNavigationEventMap
>;

export const AuthScreenConfigs: AuthRouteConfig[] = [
  {name: 'SignIn', component: SignIn},
  {name: 'SignUp', component: SignUp},
];
