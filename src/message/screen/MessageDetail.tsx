import React, {useEffect, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Animated,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {GlogalScreenRouteProps} from '../../navigation/types';
import {useKeyboardTool} from '../../example/KeyboardTool';

export type MessageDetailRouteParams = {
  messageId: string;
};

export default () => {
  const route = useRoute<GlogalScreenRouteProps<'MessageDetail'>>();
  const inputRef = useRef<TextInput>(null);
  const {show, parentRef, animation} = useKeyboardTool(44);

  return (
    <View style={styles.container} ref={parentRef}>
      <Text style={styles.param}>{`messageId: ${route.params.messageId}`}</Text>
      <TextInput ref={inputRef} style={styles.textInput} />
      <Button
        title="show/hide"
        onPress={() => {
          if (inputRef.current?.isFocused()) {
            inputRef.current?.blur();
          } else {
            inputRef.current?.focus();
          }
        }}
      />
      {show && (
        <Animated.View style={[styles.keyboardTool, animation.getLayout()]} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    alignItems: 'stretch',
  },
  param: {
    alignSelf: 'center',
  },
  textInput: {
    minWidth: 40,
    marginTop: 16,
    marginHorizontal: 16,
    height: 40,
    fontSize: 18,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: 'lightgray',
  },
  keyboardTool: {
    position: 'absolute',
    width: '100%',
    height: 44,
    backgroundColor: 'skyblue',
  },
});
