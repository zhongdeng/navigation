import {NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import {AuthParamList} from '../auth/route';
import {AccountParamList} from '../account/route';
import {FeedParamList} from '../feed/route';
import {MessageParamList} from '../message/route';

export type CompositeParamList = AuthParamList &
  AccountParamList &
  FeedParamList &
  MessageParamList;

export type RootStackParamList = CompositeParamList & {
  Home: NavigatorScreenParams<HomeTabParamList> | undefined;
  Modal: NavigatorScreenParams<CompositeParamList> | undefined;
};

export type HomeTabParamList = {
  FeedNavigator: NavigatorScreenParams<CompositeParamList> | undefined;
  MessageNavigator: NavigatorScreenParams<CompositeParamList> | undefined;
};

export type GlogalScreenRouteProps<T extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, T>;
