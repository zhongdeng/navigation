import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
  TextStyle,
} from 'react-native';
import Navigation, {
  HomeTabParamList,
  RootStackParamList,
} from '../navigation/Navigation';

type TabNavigatorRouteName = keyof HomeTabParamList;
type TotalRouteName = keyof RootStackParamList;

const DATA: TotalRouteName[] = [
  'Home',
  'SignIn',
  'SignUp',
  'Profile',
  'Setting',
  'FeedLine',
  'FeedDetail',
  'MessageList',
  'MessageDetail',
];

export default () => {
  const [isRoot, setRoot] = useState(true);
  const [isModal, setModal] = useState(false);
  const [tabName, setTabName] =
    useState<TabNavigatorRouteName>('FeedNavigator');

  const homeStyle: TextStyle = {
    color: !isModal ? 'black' : 'gray',
    fontWeight: !isModal ? 'bold' : 'normal',
  };
  const modalStyle: TextStyle = {
    color: isModal ? 'black' : 'gray',
    fontWeight: isModal ? 'bold' : 'normal',
  };
  const feedStyle: TextStyle = {
    color: tabName === 'FeedNavigator' ? 'black' : 'gray',
    fontWeight: tabName === 'FeedNavigator' ? 'bold' : 'normal',
  };
  const messageStyle: TextStyle = {
    color: tabName === 'MessageNavigator' ? 'black' : 'gray',
    fontWeight: tabName === 'MessageNavigator' ? 'bold' : 'normal',
  };

  const selectorOpacity = isRoot ? 0 : 1;
  const tabSelectorOpacity = isRoot || isModal ? 0 : 1;

  const Separator = useCallback(() => <View style={styles.separator} />, []);
  const navigate = (routeName: TotalRouteName) => {
    switch (routeName) {
      case 'Profile': {
        const params = {userId: '111111'};
        if (isRoot) {
          Navigation.pushOnRoot('Profile', params);
        } else if (isModal) {
          Navigation.presentModal('Profile', params);
        } else {
          Navigation.jumpAndNavigate(tabName, 'Profile', params);
        }
        break;
      }

      case 'Setting': {
        const params = undefined;
        if (isRoot) {
          Navigation.pushOnRoot('Setting', params);
        } else if (isModal) {
          Navigation.presentModal('Setting', params);
        } else {
          Navigation.jumpAndNavigate(tabName, 'Setting', params);
        }
        break;
      }

      case 'SignIn': {
        const params = undefined;
        if (isRoot) {
          Navigation.pushOnRoot('SignIn', params);
        } else if (isModal) {
          Navigation.presentModal('SignIn', params);
        } else {
          Navigation.jumpAndNavigate(tabName, 'SignIn', params);
        }
        break;
      }

      case 'SignUp': {
        const params = {showSomething: true};
        if (isRoot) {
          Navigation.pushOnRoot('SignUp', params);
        } else if (isModal) {
          Navigation.presentModal('SignUp', params);
        } else {
          Navigation.jumpAndNavigate(tabName, 'SignUp', params);
        }
        break;
      }

      case 'FeedLine': {
        const params = undefined;
        if (isRoot) {
          Navigation.pushOnRoot('FeedLine', params);
        } else if (isModal) {
          Navigation.presentModal('FeedLine', params);
        } else {
          Navigation.jumpAndNavigate(tabName, 'FeedLine', params);
        }
        break;
      }

      case 'FeedDetail': {
        const params = {feedId: '222222'};
        if (isRoot) {
          Navigation.pushOnRoot('FeedDetail', params);
        } else if (isModal) {
          Navigation.presentModal('FeedDetail', params);
        } else {
          Navigation.jumpAndNavigate(tabName, 'FeedDetail', params);
        }
        break;
      }

      case 'MessageList': {
        const params = undefined;
        if (isRoot) {
          Navigation.pushOnRoot('MessageList', params);
        } else if (isModal) {
          Navigation.presentModal('MessageList', params);
        } else {
          Navigation.jumpAndNavigate(tabName, 'MessageList', params);
        }
        break;
      }

      case 'MessageDetail': {
        const params = {messageId: '333333'};
        if (isRoot) {
          Navigation.pushOnRoot('MessageDetail', params);
        } else if (isModal) {
          Navigation.presentModal('MessageDetail', params);
        } else {
          Navigation.jumpAndNavigate(tabName, 'MessageDetail', params);
        }
        break;
      }

      default:
        Navigation.navigate('Home');
        break;
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.rootSwitchContainer}>
          <Text style={styles.rootSwitchTitle}>Root</Text>
          <Switch
            value={isRoot}
            onValueChange={value => {
              setRoot(value);
            }}
          />
        </View>
        <View style={[styles.selectorContainer, {opacity: selectorOpacity}]}>
          <TouchableOpacity
            style={[styles.selectorItem]}
            onPress={() => {
              setModal(false);
            }}>
            <Text style={[styles.tabSelectorTitle, homeStyle]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.selectorItem}
            onPress={() => {
              setModal(true);
              setRoot(false);
            }}>
            <Text style={[styles.tabSelectorTitle, modalStyle]}>Modal</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.selectorContainer, {opacity: tabSelectorOpacity}]}>
          <TouchableOpacity
            style={[styles.selectorItem]}
            onPress={() => {
              setRoot(false);
              setTabName('FeedNavigator');
            }}>
            <Text style={[styles.tabSelectorTitle, feedStyle]}>
              FeedNavigator
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.selectorItem}
            onPress={() => {
              setRoot(false);
              setTabName('MessageNavigator');
            }}>
            <Text style={[styles.tabSelectorTitle, messageStyle]}>
              MessageNavigator
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        style={styles.list}
        data={DATA}
        ItemSeparatorComponent={Separator}
        renderItem={({item}) => {
          return (
            <TouchableHighlight
              underlayColor="#bababa"
              onPress={() => navigate(item)}>
              <View style={styles.listItem}>
                <Text>{item}</Text>
              </View>
            </TouchableHighlight>
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  rootSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  rootSwitchTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 16,
  },
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  selectorItem: {
    paddingHorizontal: 8,
  },
  tabSelectorTitle: {
    fontSize: 18,
    color: 'gray',
  },
  list: {
    flex: 1,
  },
  listItem: {
    padding: 16,
  },
  separator: {
    flex: 1,
    marginHorizontal: 16,
    backgroundColor: '#bababa',
    height: StyleSheet.hairlineWidth,
  },
});
