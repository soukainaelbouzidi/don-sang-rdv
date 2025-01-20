import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Importer Ionicons
import axios from 'axios';

const Compteuser = () => {
  const route = useRoute();
  const { userId } = route.params;
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`https://aa9f-105-66-133-87.ngrok-free.app/user/${userId}`);
        setUserInfo(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.userInfoContainer}>
          <Image source={require('./7.jpg')} style={styles.userImage} />
          {userInfo && (
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userInfo.prenom} {userInfo.nom}</Text>
              <View style={styles.userInfoRow}>
                <Ionicons name="mail-outline" size={20} color="#666" style={styles.icon} />
                <Text style={styles.userEmail}>{userInfo.email}</Text>
              </View>
              <View style={styles.userInfoRow}>
                <Ionicons name="call-outline" size={20} color="#666" style={styles.icon} />
                <Text style={styles.userTele}>{userInfo.telephone}</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDE9E9',

  },
  userInfoContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginLeft: 5,
  },
  userTele: {
    fontSize: 16,
    color: '#666',
    marginLeft: 5,
  },
  icon: {
    marginRight: 5,
  },
});

export default Compteuser;
