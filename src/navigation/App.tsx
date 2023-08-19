import React from 'react';
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
  return (
    <MessageStack.Navigator id="MessageStack" initialRouteName="MessageList">
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
        ref={Navigation.ref}
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
