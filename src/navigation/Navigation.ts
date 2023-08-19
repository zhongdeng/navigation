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
  public ref = createNavigationContainerRef();

  public navigate = <RouteName extends keyof RootStackParamList>(
    ...args: NavigateType<RouteName>
  ) => {
    if (this.ref.isReady()) {
      this.ref.dispatch(CommonActions.navigate(args[0], args[1]));
    }
  };

  public reset = (
    state: ResetState | undefined,
    {source, target}: {source?: string; target?: string} = {
      source: undefined,
      target: undefined,
    },
  ) => {
    if (this.ref.isReady()) {
      this.ref.dispatch({...CommonActions.reset(state), source, target});
    }
  };

  public jump = (name: keyof HomeTabParamList) => {
    if (this.ref.isReady()) {
      this.ref.dispatch(TabActions.jumpTo(name));
    }
  };

  public jumpAndNavigate = <
    TabRouteName extends keyof HomeTabParamList,
    StackRouteName extends keyof RootStackParamList,
  >(
    ...args: JumpAndNavigateType<TabRouteName, StackRouteName>
  ) => {
    if (this.ref.isReady()) {
      this.ref.dispatch({
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

  public pushOnRoot = <RouteName extends keyof RootStackParamList>(
    ...args: NavigateType<RouteName>
  ) => {
    if (this.ref.isReady()) {
      this.ref.dispatch({
        ...CommonActions.navigate(args[0], args[1]),
        source: undefined,
        target: this.ref.getRootState().key,
      });
    }
  };

  public presentModal = <RouteName extends keyof RootStackParamList>(
    ...args: NavigateType<RouteName>
  ) => {
    if (this.ref.isReady()) {
      this.ref.dispatch({
        ...CommonActions.navigate('Modal', {
          screen: args[0],
          params: args[1],
        }),
      });
    }
  };

  public goBack = (
    {source, target}: {source?: string; target?: string} = {
      source: undefined,
      target: undefined,
    },
  ) => {
    if (this.ref.canGoBack()) {
      this.ref.dispatch({...CommonActions.goBack(), source, target});
    }
  };

  public currentParentState = (
    navigation: NavigationProp<ReactNavigation.RootParamList>,
  ) => {
    return navigation.getParent()?.getState();
  };
}

export type {
  HomeTabParamList,
  RootStackParamList,
  CompositeParamList,
  GlogalScreenRouteProps,
} from './types';
export default new Navigation();
