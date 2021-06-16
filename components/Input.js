/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';

const InputComponent = () => {
  const textY = useSharedValue(0);

  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: textY.value}],
    };
  });

  const handleAnimate = () => {
    console.log('eae');
    textY.value = withTiming(-22, {
      duration: 500,
    });
  };

  const handleAnimate2 = () => {
    console.log('eae');
    textY.value = withTiming(0, {
      duration: 500,
    });
  };

  useEffect(() => {
    if (inputValue === '' && !isFocused) {
      handleAnimate2();
    }
  }, [inputValue, handleAnimate2, isFocused]);

  return (
    <View style={styles.inputView}>
      <TextInput
        style={{
          width: '90%',
          height: 50,
          backgroundColor: 'white',
          borderColor: 'red',
          borderWidth: 2,
        }}
        onChangeText={(text) => setInputValue(text)}
        onFocus={() => {
          handleAnimate();
          setIsFocused(true);
        }}
        onBlur={() => setIsFocused(false)}
        value={inputValue}
      />

      <Animated.Text style={[textAnimatedStyle, styles.textStyle]}>
        eae
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    position: 'absolute',
    left: 10,
    top: 15,
    backgroundColor: 'white',
    marginHorizontal: 5,
    paddingHorizontal: 5,
  },

  inputView: {
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
});

export default InputComponent;
