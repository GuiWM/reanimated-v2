/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {
  usePanGestureHandler,
  withDecay,
  diffClamp,
} from 'react-native-redash/lib/module/v1';
import Animated, {
  add,
  Extrapolate,
  interpolateNode,
} from 'react-native-reanimated';

const CARD_HEIGHT = 200 + 20;
const cards = ['teste', 'gui', 'legal', 'bacana', 0, 0, 0, 0, 0, 0];

const AnimatedScroll = () => {
  const [containerHeight, setContainerHeight] = useState(0);
  const {gestureHandler, translation, velocity, state} = usePanGestureHandler();

  const visibleCards = Math.floor(containerHeight / CARD_HEIGHT);

  const y = diffClamp(
    withDecay({
      value: translation.y,
      velocity: velocity.y,
      state,
    }),
    -CARD_HEIGHT * cards.length + containerHeight - 100,
    0,
  );
  console.log('height: ', containerHeight);
  console.log(-cards.length * CARD_HEIGHT + containerHeight);
  console.log(visibleCards);
  return (
    <View
      style={{
        alignItems: 'center',
        paddingTop: 20,
        flex: 1,
        height: containerHeight,
      }}
      onLayout={({
        nativeEvent: {
          layout: {height: h},
        },
      }) => setContainerHeight(h)}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={{height: containerHeight}}>
          {cards.map((card, index) => {
            const translateY = interpolateNode(y, {
              inputRange: [-CARD_HEIGHT * index, 0],
              outputRange: [-CARD_HEIGHT * index, 0],
              extrapolate: Extrapolate.CLAMP,
            });
            const positionY = add(y, index * CARD_HEIGHT);
            const isDisappering = -CARD_HEIGHT;
            const isOnTop = 0;
            const isOnBottom = 3 * CARD_HEIGHT;
            const isAppering = 4 * CARD_HEIGHT;

            const scale = interpolateNode(positionY, {
              inputRange: [isDisappering, isOnTop, isOnBottom, isAppering],
              outputRange: [0.5, 1, 1, 0.5],
              extrapolate: Extrapolate.CLAMP,
            });

            return (
              <Animated.View
                key={index}
                style={[
                  {
                    height: 200,
                    width: 200,
                    marginTop: 20,
                    backgroundColor: index % 2 === 0 ? 'orange' : 'black',
                  },
                  {transform: [{translateY}, {scale}]},
                ]}
              />
            );
          })}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default AnimatedScroll;
