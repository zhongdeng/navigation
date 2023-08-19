import {RouteConfig, StackNavigationState} from '@react-navigation/native';
import {
  NativeStackNavigationEventMap,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import FeedLine, {FeedLineRouteParams} from './screen/FeedLine';
import FeedDetail, {FeedDetailRouteParams} from './screen/FeedDetail';

export type FeedParamList = {
  FeedLine: FeedLineRouteParams;
  FeedDetail: FeedDetailRouteParams;
};

type FeedRouteConfig = RouteConfig<
  FeedParamList,
  keyof FeedParamList,
  StackNavigationState<FeedParamList>,
  NativeStackNavigationOptions,
  NativeStackNavigationEventMap
>;

export const FeedScreenConfigs: FeedRouteConfig[] = [
  {name: 'FeedLine', component: FeedLine},
  {name: 'FeedDetail', component: FeedDetail},
];
