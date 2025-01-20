import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; 
import { Ionicons } from '@expo/vector-icons'; 
import Icon from 'react-native-vector-icons/FontAwesome'; // Ajout de cette ligne

const RendezVous = ({ route, navigation }) => {
  const [creneau, setCreneau] = useState([]);
  const [selectedCreneau, setSelectedCreneau] = useState(null);
  const [rendezvous, setRendezvous] = useState([]);
  const [userId, setUserId] = useState(null);

  const { centreId, selectedDate } = route.params;

  useEffect(() => {
    retrieveClientId();
    fetchCreneau(centreId, selectedDate);
  }, []);

  const retrieveClientId = async () => {
    try {
      const value = await AsyncStorage.getItem('userId');
      if (value !== null) {
        setUserId(value);
        console.log('Client ID récupéré avec succès :', value);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'ID du client:', error);
    }
  };

  const fetchCreneau = async (centreId, date) => {
    try {
      const response = await axios.get(`https://aa9f-105-66-133-87.ngrok-free.app/creneau/creneau/${centreId}`);
      setCreneau(response.data);
      console.log('Créneaux récupérés avec succès :', response.data);
    } catch (error) {
      setErrorMessage("Vous avez déjà un rendez-vous pour cette date");
    }
  };

  const handleSelectCreneau = (creneau) => {
    setSelectedCreneau(creneau);
  };

  const handleValiderRendezVous = async () => {
    if (selectedCreneau) {
      try {
        if (!userId) {
          console.error('ID utilisateur non trouvé.');
          return;
        }

        const response = await axios.post('https://aa9f-105-66-133-87.ngrok-free.app/rdv', {
          date: selectedDate,
          client_id: userId,
          centre_id: centreId,
          creneau_id: selectedCreneau.id,
          heure_debut: selectedCreneau.heure_debut,
          heure_fin: selectedCreneau.heure_fin,
        });

        console.log('Rendez-vous validé avec succès:', response.data);

        setRendezvous([...rendezvous, response.data]);
        navigation.navigate('MesRendezVousContaine', { userId });
      } catch (error) {
        console.error('Erreur lors de la validation du rendez-vous:', error);
      }
    } else {
      setErrorMessage("Vous avez déjà un rendez-vous pour cette date");
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
      <Image source={require('./bb-removebg-preview.png')} style={styles.headerImage} />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="sign-out" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.title}>Créneaux Disponibles</Text>
      <FlatList
        data={creneau}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.creneauCard, selectedCreneau === item && styles.selected]}
            onPress={() => handleSelectCreneau(item)}
          >
            <View style={styles.infoContainer}>
              <Ionicons name="time-outline" size={24} color="#555" style={styles.icon} />
              <Text style={styles.heure}>Heure de début: {item.heure_debut}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Ionicons name="time-outline" size={24} color="#555" style={styles.icon} />
              <Text style={styles.heure}>Heure de fin: {item.heure_fin}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      {selectedCreneau && (
        <Button title="Valider le Rendez-vous" onPress={handleValiderRendezVous} color="#038583" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#DDE9E9',
  },
  headerImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 25, 
    color: '#B31820',
    fontStyle: 'italic',
  },
  creneauCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selected: {
    backgroundColor: '#D7EBED',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 10,
  },
  heure: {
    fontSize: 16,
    color: '#555',
  },
  logoutButton: {
    position: 'absolute',
    top:35,
    right: 10,
    padding: 5,
    borderRadius: 50,
  },
});

export default RendezVous;
