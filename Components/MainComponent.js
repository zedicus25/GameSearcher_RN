import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox, Switch } from 'react-native-elements';
import SplashComponent from '../Components/SplashScreen';
import { useNavigation } from '@react-navigation/native';

const MainComponent = () => {
    const [showSplash, setShowSplash] = useState(true);
    const [isSwitchOn, setSwitchOn] = useState(false);
    const [categories, setCategories] = useState(['MMORPG', 'Shooter', 'Strategy', 'Moba', 
        'Racing', 'Sports', 'Social', 'Sandbox', 'Open-world', 'Survival', 'PVP', 'PVE', 'Pixel', 'Voxel',
        'Zombie', 'Turn-based', 'First-Person', 'Third-Person', 'Top-Down', 'Tank', 'Space', 'Saling',
        'Side-Scoller', 'Superhero', 'Permadeath', 'Card', 'Battle-Royale', 'MMO', 'MMOFPS', 'MMOTPS',
        '3D', '2D', 'Anime', 'Fantasy','Sci-Fi','Fighting','Action-RPG','Action','Military','Martial-Arts',
        'Flight','Low-Spec','Tower-Defense', 'Horror', 'MMORTS']);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [platform, setPlatform] = useState('Browser');
    const [searchResults, setSearchResults] = useState('Browser');
    const [searchText, setSeachText] = useState("");
    const navigation = useNavigation();

    const handleSplashComplete = () => {
        setShowSplash(false);
    };


    const openSearchComponent = () => {

        const searchParams = {
            categories: selectedCategories.map(str => str.toLowerCase()),
            platform: platform.toLowerCase(),
            searchTerm: searchText.toLowerCase(),
        };

        setSearchResults(searchParams); 
        navigation.navigate('Search', { searchParams: searchParams}); 
      };

    const toggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };


    const handleSwitchToggle = () => {
        setPlatform(isSwitchOn ? 'Browser' : 'PC');
        setSwitchOn(!isSwitchOn);
    };

    return (
        <View style={styles.container}>
                <View style={styles.container}>
                    {showSplash ? (
                        <SplashComponent onSplashComplete={handleSplashComplete} />
                    ) : (
                        <View style={styles.content}>
                            <ScrollView contentContainerStyle={styles.scrollView}>
                                {categories.map((category, index) => (
                                    <View key={index} style={styles.checkboxContainer}>
                                        <CheckBox
                                            title={category}
                                            checked={selectedCategories.includes(category)}
                                            onPress={() => toggleCategory(category)}
                                        />
                                    </View>
                                ))}
                            </ScrollView>
                            <View style={styles.platformContainer}>
                                <Text style={styles.platformText}>Browser</Text>
                                <Switch
                                    value={isSwitchOn}
                                    onValueChange={handleSwitchToggle}
                                    thumbColor={isSwitchOn ? '#3498db' : '#f39c12'}
                                    trackColor={{ false: '#bdc3c7', true: '#bdc3c7' }}
                                />
                                <Text style={styles.platformText}>PC</Text>
                            </View>
                            <TouchableOpacity style={styles.searchButton} onPress={openSearchComponent}>
                                <Text style={styles.searchButtonText}>Search</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
        marginBottom: 35,
        marginLeft: 10,
        marginRight: 10

    },
    content: {
        justifyContent: "center",
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 16,
        marginTop: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        width: '100%',
    },
    scrollView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    checkboxContainer: {

        marginVertical: 5,
        marginHorizontal: 10,
    },
    platformContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    platformText: {
        fontSize: 16,
        marginHorizontal: 10,
    },
    searchButton: {
        backgroundColor: '#3498db',
        padding: 10,
        marginTop: 20,
        borderRadius: 5,
    },
    searchButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default MainComponent;