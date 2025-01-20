import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, Image } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons'; 

const Inscription = ({ navigation }) => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telephone, setTelephone] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSignUp = () => {
    // Vérifier si le mot de passe contient des symboles, des lettres minuscules et majuscules
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    
    if (!passwordRegex.test(password)) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 8 caractères, avec au moins une lettre majuscule, une lettre minuscule, un chiffre et un symbole.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Erreur', 'Veuillez saisir un e-mail valide.');
      return;
    }

    axios.post('https://aa9f-105-66-133-87.ngrok-free.app/user/register', {
      nom: nom,
      prenom: prenom,
      email: email,
      motdepasse: password,
      telephone: telephone
    })
    .then((response) => {
      console.log('Réponse de l\'API:', response.data);
      Alert.alert('Inscription réussie!');
      navigation.navigate('Login');
    })
    .catch((error) => {
      console.error('Erreur lors de l\'inscription:', error);
      Alert.alert('Erreur', 'Impossible de s\'inscrire. Veuillez réessayer.');
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./22.png')} 
          style={styles.headerImage}
        />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Inscription</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Nom"
            onChangeText={setNom}
            value={nom}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Prénom"
            onChangeText={setPrenom}
            value={prenom}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="call-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Téléphone"
            onChangeText={setTelephone}
            value={telephone}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDE9E9',
  },
  header: {
    height: 150,
    marginTop: 20,
  },
  headerImage: {
    width: '90%',
    height: '80%',
    resizeMode: 'cover',
    marginTop: 30,
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    width: '80%',
    backgroundColor: '#fff',
  },
  inputIcon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    padding: 12,
  },
  button: {
    backgroundColor: '#038583',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Inscription;
