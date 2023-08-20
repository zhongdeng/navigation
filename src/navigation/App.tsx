import React, {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  RouteConfig,
  StackNavigationState,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationEventMap,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Navigation from './Navigation';

import {AuthScreenConfigs} from '../auth/route';
import {AccountScreenConfigs} from '../account/route';
import {FeedScreenConfigs} from '../feed/route';
import {MessageScreenConfigs} from '../message/route';

import {
  RootStackParamList,
  HomeTabParamList,
  CompositeParamList,
} from './types';
import {useAuthStore} from '../store';
import slice from 'lodash/slice';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const HomeTab = createBottomTabNavigator<HomeTabParamList>();
const ModalStack = createNativeStackNavigator<CompositeParamList>();
const FeedStack = createNativeStackNavigator<CompositeParamList>();
const MessageStack = createNativeStackNavigator<CompositeParamList>();

const CompositeScreen = (
  Screen: <RouteName extends keyof CompositeParamList>(
    _: RouteConfig<
      CompositeParamList,
      RouteName,
      StackNavigationState<CompositeParamList>,
      NativeStackNavigationOptions,
      NativeStackNavigationEventMap
    >,
  ) => null,
) => {
  return (
    <>
      {AuthScreenConfigs.map(config => (
        <Screen {...config} key={config.name} />
      ))}
      {AccountScreenConfigs.map(config => (
        <Screen {...config} key={config.name} />
      ))}
      {FeedScreenConfigs.map(config => (
        <Screen {...config} key={config.name} />
      ))}
      {MessageScreenConfigs.map(config => (
        <Screen {...config} key={config.name} />
      ))}
    </>
  );
};

const RootScreen = (
  Screen: <RouteName extends keyof RootStackParamList>(
    _: RouteConfig<
      RootStackParamList,
      RouteName,
      StackNavigationState<RootStackParamList>,
      NativeStackNavigationOptions,
      NativeStackNavigationEventMap
    >,
  ) => null,
) => {
  return (
    <>
      {AuthScreenConfigs.map(config => (
        <Screen {...config} key={config.name} />
      ))}
      {AccountScreenConfigs.map(config => (
        <Screen {...config} key={config.name} />
      ))}
      {FeedScreenConfigs.map(config => (
        <Screen {...config} key={config.name} />
      ))}
      {MessageScreenConfigs.map(config => (
        <Screen {...config} key={config.name} />
      ))}
    </>
  );
};

const FeedNavigator = () => {
  return (
    <FeedStack.Navigator id="FeedStack" initialRouteName="FeedLine">
      {CompositeScreen(FeedStack.Screen)}
    </FeedStack.Navigator>
  );
};

const MessageNavigator = () => {
  const token = useAuthStore(state => state.token);

  // 监听登录状态，替换此Navigator的RootRoute
  useEffect(() => {
    const messageState = Navigation.getMessageNavigationState();
    if (messageState) {
      if (token && messageState.routes[0].name !== 'MessageList') {
        Navigation.reset(
          {
            index: messageState.index as number,
            routes: [
              {name: 'MessageList'},
              ...slice<any>(messageState.routes, 1, messageState.routes.length),
            ],
          },
          {target: messageState.key},
        );
      }
      if (!token && messageState.routes[0].name !== 'SignIn') {
        Navigation.reset(
          {
            index: 0,
            routes: [{name: 'SignIn'}],
          },
          {target: messageState.key},
        );
      }
    }
  }, [token]);

  return (
    <MessageStack.Navigator
      id="MessageStack"
      initialRouteName={token ? 'MessageList' : 'SignIn'}>
      {CompositeScreen(MessageStack.Screen)}
    </MessageStack.Navigator>
  );
};

const HomeNavigator = () => {
  return (
    <HomeTab.Navigator id="HomeTab">
      <HomeTab.Screen
        name="FeedNavigator"
        component={FeedNavigator}
        options={{title: 'Feed', headerShown: false}}
      />
      <HomeTab.Screen
        name="MessageNavigator"
        component={MessageNavigator}
        options={{title: 'Message', headerShown: false}}
      />
    </HomeTab.Navigator>
  );
};

const ModalNavigator = () => {
  return (
    <ModalStack.Navigator id="ModalStack" initialRouteName="SignIn">
      {CompositeScreen(ModalStack.Screen)}
    </ModalStack.Navigator>
  );
};

const Main = () => {
  const scheme = useColorScheme();
  return (
    <>
      <StatusBar
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <NavigationContainer
        ref={Navigation.navigation}
        theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <RootStack.Navigator id="RootStack">
          <RootStack.Screen
            name="Home"
            component={HomeNavigator}
            options={{headerShown: false}}
          />
          <RootStack.Group screenOptions={{presentation: 'modal'}}>
            <RootStack.Screen
              name="Modal"
              component={ModalNavigator}
              options={{headerShown: false}}
            />
          </RootStack.Group>
          {RootScreen(RootStack.Screen)}
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Main;
