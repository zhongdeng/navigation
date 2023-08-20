import {
  TabActions,
  CommonActions,
  createNavigationContainerRef,
  NavigationProp,
  PartialState,
  NavigationState,
  Route,
} from '@react-navigation/native';
import {HomeTabParamList, RootStackParamList} from './types';

type NavigateType<RouteName extends keyof RootStackParamList> =
  RouteName extends unknown
    ? // This condition checks if the params are optional,
      // which means it's either undefined or a union with undefined
      undefined extends RootStackParamList[RouteName]
      ?
          | [screen: RouteName] // if the params are optional, we don't have to provide it
          | [screen: RouteName, params: RootStackParamList[RouteName]]
      : [screen: RouteName, params: RootStackParamList[RouteName]]
    : never;
type JumpAndNavigateType<
  TabRouteName extends keyof HomeTabParamList,
  StackRouteName extends keyof RootStackParamList,
> = StackRouteName extends unknown
  ? // This condition checks if the params are optional,
    // which means it's either undefined or a union with undefined
    undefined extends RootStackParamList[StackRouteName]
    ?
        | [tab: TabRouteName, screen: StackRouteName] // if the params are optional, we don't have to provide it
        | [
            tab: TabRouteName,
            screen: StackRouteName,
            params: RootStackParamList[StackRouteName],
          ]
    : [
        tab: TabRouteName,
        screen: StackRouteName,
        params: RootStackParamList[StackRouteName],
      ]
  : never;

type ResetState =
  | PartialState<NavigationState>
  | NavigationState
  | (Omit<NavigationState, 'routes'> & {
      routes: Omit<
        Route<keyof RootStackParamList, RootStackParamList>,
        'key'
      >[];
    });

class Navigation {
  static navigation = createNavigationContainerRef<RootStackParamList>();

  static navigate = <RouteName extends keyof RootStackParamList>(
    ...args: NavigateType<RouteName>
  ) => {
    if (this.navigation.isReady()) {
      this.navigation.dispatch(CommonActions.navigate(args[0], args[1]));
    }
  };

  static reset = (
    state: ResetState | undefined,
    {source, target}: {source?: string; target?: string} = {
      source: undefined,
      target: undefined,
    },
  ) => {
    if (this.navigation.isReady()) {
      this.navigation.dispatch({...CommonActions.reset(state), source, target});
    }
  };

  static jump = (name: keyof HomeTabParamList) => {
    if (this.navigation.isReady()) {
      this.navigation.dispatch(TabActions.jumpTo(name));
    }
  };

  static jumpAndNavigate = <
    TabRouteName extends keyof HomeTabParamList,
    StackRouteName extends keyof RootStackParamList,
  >(
    ...args: JumpAndNavigateType<TabRouteName, StackRouteName>
  ) => {
    if (this.navigation.isReady()) {
      this.navigation.dispatch({
        ...CommonActions.navigate('Home', {
          screen: args[0],
          params: {
            screen: args[1],
            params: args[2],
            initial: false,
          },
        }),
      });
    }
  };

  static pushOnRoot = <RouteName extends keyof RootStackParamList>(
    ...args: NavigateType<RouteName>
  ) => {
    if (this.navigation.isReady()) {
      this.navigation.dispatch({
        ...CommonActions.navigate(args[0], args[1]),
        source: undefined,
        target: this.navigation.getRootState().key,
      });
    }
  };

  static presentModal = <RouteName extends keyof RootStackParamList>(
    ...args: NavigateType<RouteName>
  ) => {
    if (this.navigation.isReady()) {
      this.navigation.dispatch({
        ...CommonActions.navigate('Modal', {
          screen: args[0],
          params: args[1],
        }),
      });
    }
  };

  static goBack = (
    {source, target}: {source?: string; target?: string} = {
      source: undefined,
      target: undefined,
    },
  ) => {
    if (this.navigation.canGoBack()) {
      this.navigation.dispatch({...CommonActions.goBack(), source, target});
    }
  };

  static getParentState = (
    _navigation: NavigationProp<ReactNavigation.RootParamList>,
  ) => {
    return _navigation.getParent()?.getState();
  };
  static getRootState = () => {
    return this.navigation.getRootState();
  };
  static getHomeState = () => {
    const rootState = this.getRootState();
    return rootState.routes[0].state;
  };
  static getFeedNavigationState = () => {
    const homeState = this.getHomeState();
    return homeState?.routes[0].state;
  };
  static getMessageNavigationState = () => {
    const homeState = this.getHomeState();
    return homeState?.routes[1].state;
  };
}

export type {
  HomeTabParamList,
  RootStackParamList,
  CompositeParamList,
  GlogalScreenRouteProps,
} from './types';
export default Navigation;
