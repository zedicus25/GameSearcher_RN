import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainComponent from './Components/MainComponent';
import SearchResultsComponent from './Components/SearchComponent';
import GameDetails from './Components/GameDetails';
import GameCard from './Components/GameCard';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainComponent} />
        <Stack.Screen name="Search" component={SearchResultsComponent} />
        <Stack.Screen name="GameDetails" component={GameDetails}></Stack.Screen>
        <Stack.Screen name='GameCard' component={GameCard}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
