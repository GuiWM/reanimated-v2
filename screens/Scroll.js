import React, {useState} from 'react';
import {View, StyleSheet, Image, Text, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import me from '../me.jpeg';

const Scroll = () => {
  const scrollY = useSharedValue(0);
  const imageSize = useSharedValue(140);
  const marginTop = useSharedValue(0);

  const [hideScrollView, setHideScrollView] = useState(false);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 180],
        [300, 120],
        Extrapolate.CLAMP,
      ),
    };
  });

  const textStyle = useAnimatedStyle(() => {
    console.log(scrollY.value);
    return {
      transform: [
        {
          translateX: interpolate(
            scrollY.value,
            [0, 180],
            [0, -70],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  const avatarStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [40, 180], [1, 0], Extrapolate.CLAMP),
      height: imageSize.value,
      width: imageSize.value,
      borderRadius: imageSize.value / 2,
      transform: [{translateY: marginTop.value}],
    };
  });

  const handleOpenProfile = () => {
    marginTop.value = withTiming(
      400,
      {
        duration: 1000,
      },
      () => {
        imageSize.value = withTiming(500, {
          duration: 1000,
        });
      },
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, headerStyle]}>
        <TouchableOpacity onPress={() => handleOpenProfile()}>
          <Animated.Image style={[styles.avatar, avatarStyle]} source={me} />
        </TouchableOpacity>

        <Animated.Text style={[styles.name, textStyle]}>
          Guilherme Magnabosco
        </Animated.Text>
      </Animated.View>

      {!hideScrollView && (
        <Animated.ScrollView
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          contentContainerStyle={{
            marginTop: 300,
            borderRadius: 20,
            backgroundColor: '#FFF',
          }}>
          <Text style={styles.listItem}>Gui maneiro gui maneiro</Text>
          <Text style={styles.listItem}>Gui maneiro gui maneiro</Text>
          <Text style={styles.listItem}>Gui maneiro gui maneiro</Text>
          <Text style={styles.listItem}>Gui maneiro gui maneiro</Text>
          <Text style={styles.listItem}>Gui maneiro gui maneiro</Text>
          <Text style={styles.listItem}>Gui maneiro gui maneiro</Text>
          <Text style={styles.listItem}>Gui maneiro gui maneiro</Text>
          <Text style={styles.listItem}>Gui maneiro gui maneiro</Text>
          <Text style={styles.listItem}>Gui maneiro gui maneiro</Text>
          <Text style={styles.listItem}>Gui maneiro gui maneiro</Text>
          <Text style={styles.listItem}>Gui maneiro gui maneiro</Text>
          <Text style={styles.listItem}>Gui maneiro gui maneiro</Text>
          <Text style={styles.listItem}>Gui maneiro gui maneiro</Text>
          <Text style={styles.listItem}>Gui maneiro gui maneiro</Text>
          <Text style={styles.listItem}>Gui maneiro gui maneiro</Text>
          <Text style={styles.listItem}>Gui maneiro gui maneiro</Text>
          <Text style={styles.listItem}>Gui maneiro gui maneiro</Text>
          <Text style={styles.listItem}>Gui maneiro gui maneiro</Text>
          <Text style={styles.listItem}>Gui maneiro gui maneiro</Text>
          <Text style={styles.listItem}>Gui maneiro gui maneiro</Text>
        </Animated.ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#6C63FF',
    position: 'relative',
  },

  header: {
    height: 300,
    backgroundColor: '#6C63FF',
    paddingVertical: 30,
    justifyContent: 'flex-end',
    alignItems: 'center',

    position: 'absolute',
    zIndex: 999,
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },

  avatar: {
    height: 140,
    width: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },

  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#FFF',
  },

  listItem: {
    padding: 20,
    fontSize: 18,
  },
});

export default Scroll;
