import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const GameCard = ({ gameData, navigation }) => {
  const { title, thumbnail, short_description } = gameData;

  const openGameDetails = () => {
    navigation.navigate('GameDetails', { gameData });
  };

  return (
    <TouchableOpacity onPress={openGameDetails}>
      <View>
        <Image source={{ uri: thumbnail }} style={{ width: 100, height: 100 }} />
        <Text>{title}</Text>
        <Text>{short_description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default GameCard;