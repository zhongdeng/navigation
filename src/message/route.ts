import {RouteConfig, StackNavigationState} from '@react-navigation/native';
import {
  NativeStackNavigationEventMap,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import MessageList, {MessageListRouteParams} from './screen/MessageList';
import MessageDetail, {MessageDetailRouteParams} from './screen/MessageDetail';

export type MessageParamList = {
  MessageList: MessageListRouteParams;
  MessageDetail: MessageDetailRouteParams;
};

type AuthRouteConfig = RouteConfig<
  MessageParamList,
  keyof MessageParamList,
  StackNavigationState<MessageParamList>,
  NativeStackNavigationOptions,
  NativeStackNavigationEventMap
>;

export const MessageScreenConfigs: AuthRouteConfig[] = [
  {name: 'MessageList', component: MessageList},
  {name: 'MessageDetail', component: MessageDetail},
];
