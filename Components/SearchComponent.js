import axios from 'axios';
import { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import database from '../database.json';
import GameCard from './GameCard';

const SearchResultsComponent = ({ route }) => {
  const { searchParams } = route.params;
  const [searchData, setSearchData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "https://www.freetogame.com/api/"; //filter?tag=3d.mmorpg.fantasy.pvp
        if (searchParams.categories.length) {
          let search = searchParams.categories.join(".");
          url += `filter?tag=${search}`;

        }
        else {
          url += "games";
        }
        if (searchParams.platform) {
          url += `&platform=${searchParams.platform}`;
        }
        const response = await axios.get(url);
        //setSearchData(response.data);
        //setSearchData(JSON.parse(database));
        //console.log(database);
        if (response.status < 200) {
          console.log("Not");
          return;
        }
        setAllData(response.data);
        setSearchData(response.data);


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const handleSearch = () => {
    if (searchTerm === "" || searchTerm.length <= 3) {
      setSearchData(allData);
      return;
    }

    const filteredProducts = allData.filter(product => {
      return product.title.toLowerCase().startsWith(searchTerm.toLocaleLowerCase());
    });

    setSearchData(() => filteredProducts);
  };


  return (
    <View style={styles.cont}>
      {searchData.length > 0 ? (
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            {searchData.map((game) => (
              <GameCard key={game.id} gameData={game} navigation={navigation} />
            ))}
          </ScrollView>
        </View>
      ) : (
        <Text style={styles.noScreenshotsText}>No games available</Text>
      )}

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: 40,
    marginRight: 40,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,

  },
  searchButton: {
    backgroundColor: '#3498db',
    padding: 10,
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#3498db',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    width: '100%',
  },
  noScreenshotsText: {
    fontSize: 16,
    color: '#555',
    marginTop: 16,
  },
});

export default SearchResultsComponent;