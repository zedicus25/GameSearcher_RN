import { React } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const GameCard = ({ gameData, navigation }) => {
  const { title, thumbnail, short_description } = gameData;

  const openGameDetails = () => {
    navigation.navigate('GameDetails', { gameData });
  };

  return (
    <TouchableOpacity onPress={openGameDetails} style={styles.cardContainer}>
      <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{short_description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    margin: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  textContainer: {
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});

export default GameCard;