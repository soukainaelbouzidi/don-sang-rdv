import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Inscription from './Inscription';
import Centres from './Centres';
import RendezVous from './RendezVous';
import CalendarScreen from './CalendarScreen';
import MesRendezVousContaine from './MesRendezVousContaine';
import Bienvenue from './Bienvenu';
import Compteuser from './Compteuser';
import ValidationRdv from './ValidationRdv';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Bienvenu" component={Bienvenue} />
        <Stack.Screen name="Inscription" component={Inscription} />
        <Stack.Screen name="Centres" component={Centres} />
        <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
        <Stack.Screen name="RendezVous" component={RendezVous} />
        <Stack.Screen name="MesRendezVousContaine" component={MesRendezVousContaine} />
        <Stack.Screen name="ValidationRdv" component={ValidationRdv} />
        <Stack.Screen name="Compteuser" component={ Compteuser} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
