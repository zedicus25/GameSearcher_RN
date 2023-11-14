import React, { useState, useEffect } from 'react';
import { View, Image, Animated, Easing, TouchableOpacity, Text } from 'react-native';

const SplashComponent = ({ onSplashComplete }) => {
  const [logoScale] = useState(new Animated.Value(5));

  useEffect(() => {
    Animated.timing(logoScale, {
      toValue: 0,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      onSplashComplete();
    });
  }, [logoScale, onSplashComplete]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.Image
        source={require('../assets/logo.png')}
        style={{ width: 200, height: 200, transform: [{ scale: logoScale }] }}
      />
    </View>
  );
};

export default SplashComponent;