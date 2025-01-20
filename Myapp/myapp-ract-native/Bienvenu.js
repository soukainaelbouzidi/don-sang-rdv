import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, SafeAreaView, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const Bienvenu = ({ navigation }) => {
  const route = useRoute(); 

  const { userId } = route.params; 

  const handlePrendreRendezVous = () => {
    navigation.navigate('Centres', { userId }); 
  };

  const handleAfficherRendezVous = () => {
    navigation.navigate('MesRendezVousContaine', { userId }); 
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userId');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const handleNavigateToCompteUser = () => {
    navigation.navigate('Compteuser',{userId}); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="sign-out" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNavigateToCompteUser} style={styles.profileImageContainer}>
          <Image source={require('./22222-removebg-preview.png')} style={styles.userImage} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.titleBlue}>Don</Text>
          <Text style={styles.titleRed}>SON</Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePrendreRendezVous}>
            <Text style={styles.buttonText}>Prendre un rendez-vous</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleAfficherRendezVous}>
            <Text style={styles.buttonText}>Afficher les rendez-vous</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F0F0', 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2, 
    backgroundColor: '#DDE9E9',
  },
  titleContainer: {
    flexDirection: 'row',
  },
  titleBlue: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#A7D2DD',
  },
  titleRed: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#F3694F',
  },
  buttonContainer: {
    backgroundColor: '#FFFFFF', 
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#038583', 
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF', 
    fontSize: 18,
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
  userImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  profileImageContainer: {
    position: 'absolute',
    top: 35,
    left: 20,
  },
});

export default Bienvenu;
