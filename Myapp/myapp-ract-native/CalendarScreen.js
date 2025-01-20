import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons'; // Import des icônes Ionicons
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import de l'icône Icon

const CalendarScreen = ({ route, navigation }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const { centreId, ClientId } = route.params;

  const handleDayPress = (day) => {
    const selected = day.dateString;
    const currentDate = new Date().toISOString().split('T')[0];
    if (selected >= currentDate) {
      setSelectedDate(selected);
      navigation.navigate('RendezVous', { centreId, selectedDate: selected, ClientId });
    } else {
      Alert.alert('Date invalide', 'Veuillez sélectionner une date future.');
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userId');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="sign-out" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.title}>Sélectionnez une date :</Text>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: '#038583' }, 
          [new Date().toISOString().split('T')[0]]: { selected: true, selectedColor: '#038583' } 
        }}
        theme={{
          textDayFontFamily: 'Roboto', 
          textMonthFontFamily: 'Roboto', 
          textDayHeaderFontFamily: 'Roboto', 
        }}
        minDate={new Date().toISOString().split('T')[0]} // Pour désactiver les dates passées
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDE9E9',
  },
  title: {
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20,
    color: '#B31820', 
    textTransform: 'uppercase', 
    letterSpacing: 1, 
    textAlign: 'center', 
  },
  logoutButton: {
    position: 'absolute',
    top: 35,
    right: 10,
    padding: 5,
    borderRadius: 50,
    backgroundColor: '0000',
  },
});

export default CalendarScreen;
