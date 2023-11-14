import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

const GameDetails = ({ route }) => {
  const { gameData } = route.params;
  const {
    title,
    thumbnail,
    short_description,
    description,
    game_url,
    genre,
    platform,
    publisher,
    developer,
    release_date,
    screenshots,
    minimum_system_requirements,
  } = gameData;

  return (
    <ScrollView>
      <Image source={{ uri: thumbnail }} style={{ width: 200, height: 200 }} />
      <Text>{title}</Text>
      <Text>{short_description}</Text>
      <Text>{description}</Text>
      <Text>Genre: {genre}</Text>
      <Text>Platform: {platform}</Text>
      <Text>Publisher: {publisher}</Text>
      <Text>Developer: {developer}</Text>
      <Text>Release Date: {release_date}</Text>

      <Text>Minimum System Requirements:</Text>
      <Text>OS: {minimum_system_requirements.os}</Text>
      <Text>Processor: {minimum_system_requirements.processor}</Text>
      <Text>Memory: {minimum_system_requirements.memory}</Text>
      <Text>Graphics: {minimum_system_requirements.graphics}</Text>
      <Text>Storage: {minimum_system_requirements.storage}</Text>

      <Text>Screenshots:</Text>
      {screenshots.map((screen) => {
         <Image
         key={screen.id}
         source={{ uri: screen.image }}
         style={{ width: 300, height: 200 }}
       />
      })}
    </ScrollView>
  );
};

export default GameDetails;