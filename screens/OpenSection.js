import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';

const OpenSection = () => {
  const openViewY = useSharedValue(0);

  const openViewStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: openViewY.value}],
    };
  });

  const handlePress = () => {
    if (openViewY.value === 0) {
      openViewY.value = withTiming(-Dimensions.get('screen').height + 200, {
        duration: 1000,
        easing: Easing.sin,
      });

      return;
    }

    openViewY.value = withTiming(0, {
      duration: 500,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eae</Text>

      <Animated.View style={[styles.openView, openViewStyle]}>
        <TouchableOpacity style={{marginTop: 20}} onPress={() => handlePress()}>
          <Text>Abrir</Text>
        </TouchableOpacity>

        <View style={{marginTop: 200, width: '100%'}}>
          <Text>Nome</Text>
          <Text>Guilherme</Text>
          <Text>Profissao</Text>
          <Text>Mobile Developer</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  title: {
    color: 'white',
  },

  openView: {
    position: 'absolute',
    bottom: -Dimensions.get('screen').height + 100,
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});

export default OpenSection;
