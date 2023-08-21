import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Keyboard,
  useWindowDimensions,
  Animated,
  Easing,
} from 'react-native';

type Origin = {
  x: number;
  y: number;
};

export const useKeyboardTool = (toolHeight: number = 0) => {
  const {height: windowHeight} = useWindowDimensions();
  const isHideRef = useRef(false);
  const parentRef = useRef<View>(null);
  const [show, setShow] = useState(false);
  const animation = useRef(
    new Animated.ValueXY({x: 0, y: windowHeight}),
  ).current;

  const startAnimation = useCallback(
    (keyboardOrigin: Origin, parentOrigin: Origin, duration: number) => {
      let target = keyboardOrigin;
      const offset = isHideRef.current ? 0 : toolHeight;
      if (parentOrigin) {
        target = {
          x: keyboardOrigin.x - parentOrigin.x,
          y: keyboardOrigin.y - parentOrigin.y - offset,
        };
      }

      Animated.timing(animation, {
        // toValue: target,
        toValue: {x: keyboardOrigin.x, y: target.y},
        duration: duration,
        useNativeDriver: false,
        easing: Easing.bezier(0.1, 0.76, 0.55, 0.9),
      }).start();
    },
    [animation, toolHeight],
  );

  const measure = useCallback(
    (measureComplete: (parentOrigin: Origin) => void) => {
      parentRef.current?.measure((_1, _2, _3, _4, pageX, pageY) => {
        measureComplete({x: pageX, y: pageY});
      });
    },
    [],
  );

  useEffect(() => {
    const willShowSubscription = Keyboard.addListener(
      'keyboardWillShow',
      () => {
        setShow(true);
      },
    );
    const willHideSubscription = Keyboard.addListener(
      'keyboardWillHide',
      () => {
        isHideRef.current = true;
      },
    );
    const didHideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setShow(false);
      isHideRef.current = false;
    });
    const willChangeFrameSubscription = Keyboard.addListener(
      'keyboardWillChangeFrame',
      event => {
        measure(parentOrigin => {
          const keyboardOrigin = {
            x: event.endCoordinates.screenX,
            y: event.endCoordinates.screenY,
          };
          startAnimation(keyboardOrigin, parentOrigin, event.duration);
        });
      },
    );
    return () => {
      willShowSubscription.remove();
      willHideSubscription.remove();
      didHideSubscription.remove();
      willChangeFrameSubscription.remove();
    };
  }, [measure, startAnimation]);

  return useMemo(() => ({show, parentRef, animation}), [animation, show]);
};
