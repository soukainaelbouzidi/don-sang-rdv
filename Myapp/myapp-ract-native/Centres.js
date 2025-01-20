import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Centres = ({ route }) => {
  const [centres, setCentres] = useState([]);
  const [selectedCentreId, setSelectedCentreId] = useState(null);
  const [searchRegion, setSearchRegion] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [citiesInRegion, setCitiesInRegion] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [showRegionOptions, setShowRegionOptions] = useState(false);
  const [showCityOptions, setShowCityOptions] = useState(false);

  const navigation = useNavigation();
  const { userId } = route.params;

  useEffect(() => {
    axios.get('https://aa9f-105-66-133-87.ngrok-free.app/centre')
      .then(response => {
        setCentres(response.data);
      })
      .catch(error => {
        console.error('Error fetching centers:', error);
      });
  }, []);

  const handleCenterSelection = (centreId) => {
    setSelectedCentreId(centreId);
    navigation.navigate('CalendarScreen', { centreId, userId });
  };

  const handleLogout = () => {
    navigation.navigate('login');
  };

  const handleRegionSelection = (region) => {
    setSearchRegion(region);
    setSelectedRegion(region); // Met à jour la région sélectionnée
    const cities = centres
      .filter((centre) => centre.region === region && centre.ville)
      .map((centre) => centre.ville);
    setCitiesInRegion(Array.from(new Set(cities)));
    setShowRegionOptions(false);
  };

  const handleCitySelection = (city) => {
    setSearchCity(city);
    setSelectedCity(city); // Met à jour la ville sélectionnée
    setShowCityOptions(false);
  };

  const uniqueRegions = Array.from(new Set(centres.map(centre => centre.region)));

  const filteredCentres = centres.filter((centre) => {
    return (
      (!searchRegion || (centre.region && centre.region.toLowerCase().includes(searchRegion.toLowerCase()))) &&
      (!searchCity || (centre.ville && centre.ville.toLowerCase().includes(searchCity.toLowerCase())))
    );
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="sign-out" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.title}>Liste des centres de santé :</Text>
      <View style={styles.searchContainer}>
        <TouchableOpacity 
          style={[styles.selectedOption, { height: 40 }]} // Hauteur fixe pour la sélection de région
          onPress={() => setShowRegionOptions(!showRegionOptions)}
        >
          <Text style={styles.selectedOptionText}>{selectedRegion || "Sélectionnez une région"}</Text>
        </TouchableOpacity>
        {showRegionOptions && (
          <ScrollView style={styles.optionsContainer}>
            {uniqueRegions.map(region => (
              <TouchableOpacity
                key={region}
                style={styles.option}
                onPress={() => handleRegionSelection(region)}
              >
                <Text style={styles.optionText}>{region}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        <TouchableOpacity 
          style={[styles.selectedOption, { height: 40 }]} // Hauteur fixe pour la sélection de ville
          onPress={() => setShowCityOptions(!showCityOptions)}
        >
          <Text style={styles.selectedOptionText}>{selectedCity || "Sélectionnez une ville"}</Text>
        </TouchableOpacity>
        {showCityOptions && (
          <ScrollView style={styles.optionsContainer}>
            {citiesInRegion.map(city => (
              <TouchableOpacity
                key={city} // Utilisez une clé unique pour chaque ville
                style={styles.option}
                onPress={() => handleCitySelection(city)}
              >
                <Text style={styles.optionText}>{city}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {filteredCentres.map((centre) => (
          <TouchableOpacity
            key={centre.id}
            style={[
              styles.centerItem,
              selectedCentreId === centre.id && styles.selectedCenterItem,
            ]}
            onPress={() => handleCenterSelection(centre.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.centerName}>{centre.nom}</Text>
            <View style={styles.centerInfoContainer}>
              <Icon name="map-marker" size={16} color="#333" style={styles.icon} />
              <Text style={styles.centerInfo}>{centre.adresse}</Text>
            </View>
            <View style={styles.centerInfoContainer}>
              <Icon name="phone" size={16} color="#333" style={styles.icon} />
              <Text style={styles.centerInfo}>{centre.telephone}</Text>
            </View>
            <View style={styles.centerInfoContainer}>
              <Icon name="location-arrow" size={16} color="#333" style={styles.icon} />
              <Text style={styles.centerInfo}>{centre.ville}</Text>
            </View>
            <View style={styles.centerInfoContainer}>
              <Icon name="map" size={16} color="#333" style={styles.icon} />
              <Text style={styles.centerInfo}>{centre.region}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDE9E9',
    paddingHorizontal: 40,
    paddingVertical: 70,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#be2c2c'
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 10,
  },
  centerItem: {
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
  },
  centerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#8C464E'
  },
  centerInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  centerInfo: {
    fontSize: 15,
    color: '#333',
  },
  selectedCenterItem: {
    backgroundColor: '#0000',
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    paddingTop:30,
    borderRadius: 10,
  },
  searchContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    width: 300,
  },
  selectedOption: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    width: '100%',
    textAlign: 'center',
    // height: 40, // Retirez ou commentez cette ligne pour que la hauteur soit définie dynamiquement
  },
  selectedOptionText: {
    fontSize: 18,
  },
  optionsContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    width: '100%',
    maxHeight: 150,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '',
  },
  optionText: {
    fontSize: 16,
  },
});

export default Centres;
