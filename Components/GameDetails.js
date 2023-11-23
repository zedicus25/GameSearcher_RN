import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, Image, ScrollView, StyleSheet, FlatList, Modal, TouchableOpacity } from 'react-native';

const GameDetails = ({ route }) => {
  const { gameData } = route.params;
  const {
    id,
  } = gameData;
  const [searchData, setSearchData] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `https://www.freetogame.com/api/game?id=${id}`; 

        const response = await axios.get(url);

        setSearchData(response.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [])

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: searchData.thumbnail }} style={styles.thumbnail} />
      <Text style={styles.title}>{searchData.title}</Text>
      <Text style={styles.description}>{searchData.short_description}</Text>
      <Text style={styles.description}>{searchData.description}</Text>
      <Text style={styles.title}>Other information:</Text>
      <Text style={styles.info}>Genre: {searchData.genre}</Text>
      <Text style={styles.info}>Platform: {searchData.platform}</Text>
      <Text style={styles.info}>Publisher: {searchData.publisher}</Text>
      <Text style={styles.info}>Developer: {searchData.developer}</Text>
      <Text style={styles.info}>Release Date: {searchData.release_date}</Text>
      <Text style={styles.title}>Screenshots:</Text>
       <FlatList
        data={searchData.screenshots}
        renderItem={({ item }) => <Image source={{ uri: item.image }} style={styles.screenshot} />}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      /> 
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16
  },
  thumbnail: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  screenshot: {
    width: 300,
    height: 200,
    borderRadius: 8,
    marginRight: 8,
  },

  screenshotThumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 8,
  },

  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalScreenshot: {
    width: 300,
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GameDetails;