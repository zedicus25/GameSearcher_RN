import axios from 'axios';
import { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SearchResultsComponent = ({ route }) => {
    const { searchParams } = route.params;
    const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "https://www.freetogame.com/api/"; //filter?tag=3d.mmorpg.fantasy.pvp
        if(searchParams.categories.length)
        {
            let search = searchParams.categories.join(".");
            url += `filter?tag=${search}`;

        }
        else
        {
            url += "games";
        }
        if(searchParams.platform)
        {
            url += `&platform=${searchParams.platform}`;
            
        }
        const response = await axios.post(url);
        setSearchData(JSON.parse(response.data));

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchData]);

  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();  
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
     
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
  });
// Решта стилів і експорт залишаються без змін

export default SearchResultsComponent;