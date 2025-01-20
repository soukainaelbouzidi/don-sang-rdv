import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showImage, setShowImage] = useState(true);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showHeaderImage, setShowHeaderImage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('...');
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setShowImage(false);
      setShowLoginForm(true);
      setShowHeaderImage(true);
    }, 2000);

    const interval = setInterval(() => {
      setLoadingText((prevLoadingText) => {
        switch (prevLoadingText) {
          case '...':
            return '.. .';
          case '.. .':
            return '. ..';
          case '. ..':
            return '...';
          default:
            return '...';
        }
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const handleSignIn = async () => {
    try {
      const response = await axios.post('https://aa9f-105-66-133-87.ngrok-free.app/user/login', {
        email: email,
        motdepasse: password,
      });
      const { token, userId } = response.data;
      if (token && userId) {
        await storeToken(token);
        await storeUserId(userId.toString());
        console.log('Réponse de l\'API:', response.data);
        console.log('UserID stocké:', userId.toString());
        
        navigation.navigate('Bienvenu', { userId });
      } else {
        throw new Error('Données manquantes dans la réponse de l\'API');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Email ou mot de passe incorrect. Veuillez réessayer.');
    }
  };
  
  const storeUserId = async (userId) => {
    try {
      await AsyncStorage.setItem('userId', userId);
      console.log('UserID stocké avec succès:', userId);
    } catch (error) {
      console.error('Erreur lors du stockage de l\'ID de l\'utilisateur:', error);
    }
  };

  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('authToken', token);
      console.log('Token stocké avec succès:', token);
    } catch (error) {
      console.error('Erreur lors du stockage du jeton:', error);
    }
  };

  return (
    <View style={styles.container}>
      {showHeaderImage && (
        <Image source={require('./C.png')} style={styles.headerImage} />
      )}
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          {showImage && <Image source={require('./22.png')} style={styles.logo} />}
          {loading && <Text style={styles.loading}>{loadingText}</Text>}
        </View>
        {showLoginForm && (
          <>
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
            <TouchableOpacity onPress={handleSignIn}>
              <Button mode="contained" style={styles.button}>
                Se connecter
              </Button>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Inscription')}>
              <Text style={styles.link}>Vous n'avez pas de compte ? Créez-en un ici</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDE9E9',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
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
    marginTop: 10,
    width: 200,
    backgroundColor:'#038583'
  },
  link: {
    marginTop: 20,
    color: '#91B1CB',
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imageContainer: {
    width: 300,
    height: 300,
    marginBottom: 10,
    alignItems: 'center',
  },
  loading: {
    fontSize: 50,
    marginBottom: 20,
  },
  headerImage: {
    position: 'absolute',
    top: 1,
    left: 10,
    width: 400,
    height: 300,
    resizeMode: 'cover',
  },
});

export default Login;
