import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; 
import { Ionicons } from '@expo/vector-icons'; 
import Icon from 'react-native-vector-icons/FontAwesome'; // Ajout de cette ligne

const ValidationRdv= () => {
  const [rendezvous, setRendezvous] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    retrieveClientId();
  }, []);

  const retrieveClientId = async () => {
    try {
      const value = await AsyncStorage.getItem('userId');
      if (value !== null) {
        setUserId(value);
        fetchRendezVous(value);
        console.log('Client ID récupéré avec succès :', value);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'ID du client:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchRendezVous(userId);
    }, [userId]) 
  );

  const fetchRendezVous = async (userId) => {
    try {
      const response = await axios.get(`https://aa9f-105-66-133-87.ngrok-free.app/rdv/${userId}`);
      setRendezvous(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des rendez-vous:', error);
    }
  };

  const handleDeleteRendezVous = async (id) => {
    try {
      await axios.delete(`https://eaa9-160-171-113-196.ngrok-free.app/rdv/${id}`);
      console.log('Rendez-vous supprimé avec succès');
      fetchRendezVous(userId); 
    } catch (error) {
      console.error('Erreur lors de la suppression du rendez-vous:', error);
    }
  };

  const handleModifyRendezVous = (id) => {
    navigation.navigate('ValidationRdv',  { userId: userId, rendezvousId: id } ); 
  };

  const handleDownloadRendezVous = (item) => {
    // Redirection vers la page de téléchargement en passant les données du rendez-vous en tant que paramètres de navigation
    navigation.navigate('DownloadPage', { rendezvousData: item });
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
      <Text style={styles.title}>Mes Rendez-vous</Text>
      <FlatList
        data={rendezvous}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.rendezvousCard}>
            <Text>Date: {item.date}</Text>
            <View style={styles.timeContainer}>
              <Ionicons name="time-outline" size={20} color="#555" />
              <Text style={styles.timeText}>{item.heure_debut}</Text>
            </View>
            <View style={styles.timeContainer}>
              <Ionicons name="time-outline" size={20} color="#555" />
              <Text style={styles.timeText}>{item.heure_fin}</Text>
            </View>
            <Text>Statut: {item.statut}</Text>
            <Text>User: {item.client_id}</Text>
            {item.statut === 'accepté' && (
              <View style={styles.buttonContainer}>
                <Button
                  title="Télécharger"
                  onPress={() => handleDownloadRendezVous(item)}
                  color="#038583"
                />
                <Ionicons
                  name="download-outline"
                  size={24}
                  color="#038583"
                  style={styles.buttonIcon} 
                  onPress={() => handleDownloadRendezVous(item)}
                />
              </View>
            )}
            <View style={styles.buttonContainer}>
              <Button
                title="Modifier"
                onPress={() => handleModifyRendezVous(item.id)}
                color="#038583" 
              />
              <Ionicons
                name="create-outline"
                size={24}
                color="#038583"
                style={styles.buttonIcon} 
                onPress={() => handleModifyRendezVous(item.id)} 
              />
              <Button
                title="Supprimer"
                onPress={() => handleDeleteRendezVous(item.id)}
                color="#038583" 
              />
              <Ionicons
                name="trash-outline"
                size={24}
                color="#038583"
                style={styles.buttonIcon} 
                onPress={() => handleDeleteRendezVous(item.id)}
              />
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="sign-out" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#f5f5f5',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      marginTop:25, 
      color: '#B31820',
    },
    rendezvousCard: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 10,
    },
    timeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    timeText: {
      marginLeft: 5,
    },
    buttonIcon: {
      marginLeft: 5,
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
export default ValidationRdv;
