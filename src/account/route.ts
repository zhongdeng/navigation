import {RouteConfig, StackNavigationState} from '@react-navigation/native';
import {
  NativeStackNavigationEventMap,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import Profile, {ProfileRouteParams} from './screen/Profile';
import Setting, {SettingRouteParams} from './screen/Setting';

export type AccountParamList = {
  Profile: ProfileRouteParams;
  Setting: SettingRouteParams;
};

type AccountRouteConfig = RouteConfig<
  AccountParamList,
  keyof AccountParamList,
  StackNavigationState<AccountParamList>,
  NativeStackNavigationOptions,
  NativeStackNavigationEventMap
>;

export const AccountScreenConfigs: AccountRouteConfig[] = [
  {name: 'Profile', component: Profile},
  {name: 'Setting', component: Setting},
];
